// npm install lowdb ???
// db if needed
// express app
const express = require('express');
const app = express();
// http
const http = require('http').Server(app);
// require path
const path = require('path');
// cross origin requests
const cors = require('cors');
app.use(cors({credentials: true, origin: true}))
const Datastore = require('nedb');
// socket io
const io = require('socket.io')(http, {
  allowUpgrades: true,
  httpCompression: true,
  origins: '*:*',
  pingTimeout: 900000,
  transports: ['websocket', 'polling'],
});
// api fallback for SPA
const history = require('connect-history-api-fallback');
// adding for ability to parse json
const bodyParser = require('body-parser');
app.use(bodyParser.json());
if(process.env.NODE_ENV === 'production'){
  // create the static app
  const staticApp = express.static(path.join(__dirname, 'dist'));
  // serve the app
  // app.use(staticApp)
  app.use(staticApp);
  app.use(history());
  app.use(staticApp);
}


generateId = () => {
  let number = Math.random()
  // replace commonly mis-read characters
  return (number.toString(36).substr(2, 5)).replace("o", "G").replace("i", "1").replace("l", "2").toUpperCase()
}

generateUserId = (name) => {
  return name.replace(' ', '_') + '_' + Math.floor( Math.random() * 9000 ) + 1000;
}

db = new Datastore({ inMemoryOnly: true });

db.ensureIndex({ fieldName: 'gameKey', unique: true }, (err) => { console.log(err); });

io.on('connect', (socket) => {
  console.log(" DEVICE CONNECTED ")
});

io.on('connection', (socket) => {

  //
  // GAME FUNCTIONS
  //
  //
  //

  socket.on('create_game', (data, callback) => {
    // create unique room key
    let gameKey = generateId();
    // create unique user id
    let userId = generateUserId(data.name);
    db.insert({
      inGame: false,
      gameKey: gameKey.toUpperCase(),
      maxPlayers: data.maxPlayers,
      round: 0,
      hotseat: 0,
      players: [
        {
          userId: userId,
          name: data.name,
          spectator: false,
          order: 0,
          active: true,
          host: true,
          score: 0,
          scoreChange: 0,
        }
      ],
      questions: [],
      gameEvents: []
    }, (err, newDoc) => {
      // join / create room
      socket.join(gameKey.toUpperCase());
      // tell user the game's created
      callback({
        error: false,
        data: {
          userId: userId,
          gameKey: gameKey.toUpperCase(),
          name: data.name,
          spectator: false
        }
      });
    });
  });

  // join the game
  socket.on('join_game', (data, callback) => {
    // make sure the room exists
    let rooms = io.sockets.adapter.rooms;
    // upper case er'thing
    data.gameKey = data.gameKey.toUpperCase();

    db.findOne({
      gameKey: data.gameKey
    }, (err, doc) => {
      // if the game exists
      if(doc){
        // join / create room
        socket.join(data.gameKey);
        // data
        let userData = {}
        // if spectator
        if(data.spectate){
          let room = rooms[data.gameKey];
           userData= {
            userId: 'spectator_' + room.length,
            name: 'spectator_' + room.length,
            spectator: true,
            order: doc.players.length,
            active: false,
            host: false,
            score: 0,
            scoreChange: 0
          }
        } else {
          // notify room of new player
          userData = {
            userId: generateUserId(data.name),
            name: data.name,
            spectator: false,
            order: doc.players.length,
            active: false,
            host: false,
            score: 0,
            scoreChange: 0
          }
        }

        // insert user
        db.update({
          _id: doc._id
        }, {
          $push: {
            players: userData
          }
        }, (err, newDoc) => {
          // player_joined
          // notify game room
          socket.to(data.gameKey).emit(data.spectate ? 'player_spectate' : 'player_joined', userData);
          // send the gamekey back too
          userData.gameKey = data.gameKey
          // notify user
          callback({
            error: false,
            data: userData
          });
        });

      } else {
        // throw the error in the callback
        callback({
          error: true,
          data: {
            message: 'Game does not exist'
          }
        });
      }
    });
  });

  // coordinate game state
  socket.on('request_game_state', (data, callback) => {
    db.findOne({
      gameKey: data.gameKey
    }, (err, doc) => {
      // if we found it
      if(doc){
        // if we've missed messages
        if(data.sync < doc.gameEvents.length){
          console.log("SYNC")
          // go through each one and send them
          (function looper(i){
            setTimeout(() => {
              console.log(doc.gameEvents[i].message)
              socket.emit(doc.gameEvents[i].message, doc.gameEvents[i].data);
              if (--i) {
                looper(i);
              }
            }, 400);
          })(doc.gameEvents.length -  data.sync);
        }

        callback({
          success: true,
        });
      }
    });
  })

  // properties of the game
  socket.on('send_scores', (data, callback) => {
    db.update({
      gameKey: data.gameKey
    },{
      $set: {
        players: data.players
      }
    }, (err, result) => {
      // get the current value of the game state
      io.in(data.gameKey).emit('score_results', { players: data.players })
      callback({
        success: true
      })
    });
  })

  // properties of the game
  socket.on('game_state', (data) => {
    db.findOne({
      gameKey: data.gameKey
    }, (err, doc) => {
      if(doc){
        // get the current value of the game state
        socket.emit('game_state', {
          sync: doc.gameEvents.length,
          hotseat: doc.hotseat,
          round: doc.round,
          players: doc.players,
          questions: doc.questions
        })
      }
    });
  })

  socket.on('activate_players', (data) => {
    // insert user
    db.findOne({
      gameKey: data.gameKey
    }, (err, doc) => {
      if(doc){
        doc.players.forEach(player => {
          if(!player.spectator){
            player.active = true
          }
        })
        db.update({
          gameKey: data.gameKey.toUpperCase()
        },{
          $set: {
            players: doc.players
          }
        }, (err, result) => {
          io.in(data.gameKey).emit('player_activate', data);
        });
      }
    });
  });

  socket.on('reorder_players', (data) => {
    io.in(data.gameKey).emit('reorder_players', data);
  });

  // quit the game
  socket.on('quit_game', (data) => {
    db.update({
      gameKey: data.gameKey.toUpperCase()
    },{
      $pull: {
        players: {
          userId: data.user
        }
      }
    },
    (err, result) => {
      socket.to(data.gameKey).emit('player_quit', data);
    });
  });


  //
  // GAME PLAY
  //

  response = (message, data = {}) => {
    db.update({
      gameKey: data.gameKey.toUpperCase()
    },{
      $push: {
        gameEvents: {
          message: message,
          data: data
        }
      }
    },
    (err, doc) => {
      io.in(data.gameKey).emit(message, data)
    });
  }

  socket.on('add_question', (data) => {
    db.update({
      gameKey: data.gameKey.toUpperCase()
    },{
      $push: {
        questions: data.question
      }
    }, (err, result) => {
      response('question_added', data);
    });
  });

  socket.on('add_answer', (data) => {
    //  db.findOne({
    //   gameKey: data.gameKey
    // }, (err, doc) => {
    //   if(doc){
    //     console.log(doc)
    //     // update the question
    //     doc.qustions[doc.round].answers.push(data.answer)
    //     // update all questions
    //     db.update({
    //       gameKey: data.gameKey
    //     },{
    //       $set: {
    //         questions: doc.questions
    //       }
    //     }, (err, result) => {
          response('answer_added', data);
    //     });
    //   }
    // });
  });

  socket.on('adjudicate_answers', (data) => {
    response('answers_adjudicated', data)
  })

  socket.on('reveal_authors', (data) => {
    response('authors_revealed', data)
  })

  socket.on('score_answers', (data) => {
    response('answers_scored', data)
  })

  socket.on('advance_round', (data) => {
    db.findOne({
      gameKey: data.gameKey
    }, (err, doc) => {
      // if we found it
      if(doc){
        // find all non-spectating players
        // we dont' have to find active because they will bcome active the next round
        let players = doc.players.filter(player => !player.spectator)
        let newHotseat = doc.hotseat + 1 >= players.length ? 0 : (doc.hotseat + 1)
        // update
        db.update({
          gameKey: data.gameKey.toUpperCase()
        },{
          $set: {
            hotseat: newHotseat
          }
        },
        (err, update) => {
          io.in(data.gameKey).emit('new_round', {
            hotseat: newHotseat
          })
        });
      }
    });
  })

  socket.on('select_answer', (data) => {
    response('answer_selected', data);
  });

});


// http.listen(8088, '127.0.0.1', () => {
http.listen(8088, '0.0.0.0', () => {
    console.log('Listening on port *: 8088');
});