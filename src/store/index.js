import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

   	game: {
  	 	key: null,
   		host: false,
      connected: false,
      synced: false,
      stage: 0,
      round: 0,
      hotseat: 0,
  	},

  	user: {
      id: '',
      spectator: false,
  	},

	  players: [],

    questions: [],
  },

  getters: {

    synced: ({game}) => game.synced,

    player: ({players, user}) => players.find(player => player.userId === user.id),

    gameKey: ({game}) => game.key,

    activePlayers: ({players}) => {
      let activePlayers = players.filter(player => player.active)
      return activePlayers.sort((a, b) => a.order - b.order)
    },

    allPlayers: ({players}) => players.sort((a, b) => a.order - b.order),

    isHost: ({game}) => game.host,

    inGame: ({game}) => game.key && game.connected,

    // hotSeatPlayer: ({players}) => players.find(player => player.hotseat),
    hotSeatPlayer: ({game}, {activePlayers}) => activePlayers[game.hotseat],

    inHotSeat: ({user}, {hotSeatPlayer}) => {
      try {
        return user.id === hotSeatPlayer.userId
      } catch(e) {
        return false
      }
    },

    currentQuestion: ({questions}) => questions[questions.length - 1],

    answers: (state, {currentQuestion}) => {
      if(currentQuestion){
        return currentQuestion.answers
      } else {
        return []
      }
    },

    answersRemaining: (state, {currentQuestion, activePlayers}) => {
      if(currentQuestion && activePlayers){
        return activePlayers.length - currentQuestion.answers.length
      } else {
        return 0
      }
    },

    answerPicksRemaining: (state, {currentQuestion, activePlayers}) => {
      let picks = 0
      if(currentQuestion && activePlayers){
        currentQuestion.answers.forEach((answer) => {
          picks += answer.picks.length
        })
      }
      // ignore the hot seat player
      return (activePlayers.length - 1) - picks
    }


  },

  mutations: {
    
    INCREMENT_STAGE(store, data){
      store.game.stage += data
    },

    START_GAME(store, data) {
      // reset game
      store.game = {
        host: data.host,
        key: data.player.gameKey,
        score: 0,
        round: 0,
        hotseat: 0,
        connected: data.connected,
        synced: data.synced,
      }
      // reset user
      store.user = {
          id: data.player.userId,
          spectator: false,
      }
      // clear players
      store.players = []
      // clear questions
      store.questions = []
    },

    ACTIVATE_PLAYERS(store){
      store.players.forEach((player) => {
        player.active = true
      })
    },

    // the user has quit the game. reset everything
    QUIT_GAME(store) {
      // notify server
      this._vm.$socket.client.emit('quit_game', store.user)

      // reset all
      store.game = {
        key: null,
        host: false,
        connected: false,
        synced: false,
        stage: 0,
        round: 0,
        hotseat: 0,
      }

      store.user = {
        id: '',
        spectator: false,
      }

      store.players = []

      store.questions = []
    },


    //
    // SOCKETS
    //



    SOCKET_ANSWERS_ADJUDICATED(store, data){
      // store.questions[store.questions.length - 1].answers.forEach((answer) => {
      //   if(data.correct.includes(answer.hotSeatPlayer.userId)){
      //     Vue.set(answer, 'correct', true)
      //   }
      //   if(data.duplicate.includes(answer.hotSeatPlayer.userId)){
      //     Vue.set(answer, 'duplicate', true)
      //   }
      // })
      // shuffle arrays
      let answers = store.questions[store.questions.length - 1].answers
      // shuffle answers
      for (let i = answers.length - 1; i > 0; i -= 1) {
        let j = Math.floor(Math.random() * (i + 1))
        const temp = answers[i]
        // check the correct / duplicate status
        if(data.correct.includes(temp.player.userId)){
          Vue.set(temp, 'correct', true)
        }
        if(data.duplicates.includes(temp.player.userId)){
          Vue.set(temp, 'duplicate', true)
        }
        answers[i] = answers[j]
        answers[j] = temp
      }
    },

    SOCKET_ANSWER_SELECTED(store, data){
      store.questions[store.questions.length - 1].answers.forEach((answer) => {
        // remove any other selections
        for(let i = 0; i > answer.picks.length; i++){
          if(answer.picks[i].userId === answer.player.userId){
            // remove it
            Vue.delete(answer.picks, i)
            // stop the loop
            i = answer.picks.length
            break;
          }
        }
        // add the pick
        if(answer.player.userId === data.answer.player.userId){
          // add the player as the pick
          answer.picks.push(data.player)
        }
      })
    },

    // a new question has been added
    SOCKET_ANSWER_ADDED(store, answer){
      answer.picks = []
      store.questions[store.questions.length - 1].answers.push(answer)
    },

    // a new question has been added
    SOCKET_QUESTION_ADDED(store, question){
      question.answers = []
      store.questions.push(question)
    },

    PLAYER_JOINED(store, player) {
      // set player defaults
      Vue.set(player, 'order', store.players.length)
      Vue.set(player, 'score', 0)
      Vue.set(player, 'hotseat', false)
      Vue.set(player, 'active', false)
      // add new player
      store.players.push(player)

    },

    SOCKET_SEND_GAME_STATE({game, questions, players}, data){
      if(game.host){
        this._vm.$socket.client.emit('game_state', {
          questions: questions,
          players: players,
          stage: game.stage,
          round: game.round,
          gameKey: game.key,
        });
      }
    },

    SOCKET_GAME_STATE(store, data){
      if(!store.game.host){
        store.players = data.players
        store.questions = data.questions
        store.game.stage = data.stage
        store.game.round = data.round
        store.game.synced = true
      }
    },

    // another player is active this round
    SOCKET_PLAYER_ACTIVATE({players, game}, user) {
      let player = players.find( player => player.id === user.id )
      player.active = true
    },

    SOCKET_NEW_ROUND(store) {
      store.game.round++
      store.game.stage = 0
      store.game.hotseat++
      // roll the hotseat around
      if(store.game.hotseat >= store.players.length){
        store.game.hotseat = 0
      }
    },

    // remove quitter
    SOCKET_PLAYER_QUIT({players}, user) {
      players = players.filter( player => player.id === user.id )
    },

  },

  actions: {

    newGame({commit}, data){
      commit('START_GAME', { player: data, host: true, connected: true, synced: true })
      commit('PLAYER_JOINED', data)
    },

    joinGame({commit}, data){
      commit('START_GAME', { player: data, host: false, connected: true, synced: false })
    },

    activatePlayers({commit}){
      commit('ACTIVATE_PLAYERS')
    },

    incrementStage({commit}, data){
      commit('INCREMENT_STAGE', data)
    },

    quitGame({commit}){
      commit('QUIT_GAME')
    },

    socket_playerJoined({commit}, data){
      commit('PLAYER_JOINED', data)
      commit('ACTIVATE_PLAYERS')
    }

  },
})
