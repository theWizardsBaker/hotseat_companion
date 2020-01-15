import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

   	game: {
  	 	key: null,
      connected: false,
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


    player: ({players, user}) => players.find(player => player.userId === user.id),

    gameKey: ({game}) => game.key,

    activePlayers: ({players}) => {
      let activePlayers = players.filter(player => player.active)
      return activePlayers.sort((a, b) => b.order - a.order)
    },

    allPlayers: ({players}) => {
      return (players.filter((player) => !player.spectator )).sort((a, b) => a.order - b.order)
    },

    inGame: ({game}) => game.key && game.connected,

    hotSeatPlayer: ({game, players}, ) => players.find((player) => player.order === game.hotseat),

    inHotSeat: ({user}, {hotSeatPlayer}) => {
      return hotSeatPlayer ? user.id === hotSeatPlayer.userId : false
    },

    currentQuestion: ({questions}) => questions[questions.length - 1],

    answers: (state, {currentQuestion}) => {
      if(currentQuestion && currentQuestion.answers){
        return currentQuestion.answers
      } else {
        return []
      }
    },

    // answersRemaining: (state, {currentQuestion, activePlayers}) => {
    answersRemaining: (state, {answers, activePlayers}) => {
      if(answers.length > 0 && activePlayers){
        return activePlayers.length - answers.length
      } else {
        return 100
      }
    },

    // answerPicksRemaining: (state, {currentQuestion, activePlayers}) => {
    answerPicksRemaining: (state, {answers, activePlayers}) => {
      let picks = 0
      if(answers.length > 0 && activePlayers){
        answers.forEach((answer) => {
          picks += answer.picks.length
        })
      }
      // ignore the hot seat player
      let remaining = (activePlayers.length - 1) - picks
      return remaining < 0 ? 100 : remaining
    },

    gameWinner: (state, {player, activePlayers}) => {
      let highScore = activePlayers.sort((a, b) => b.score - a.score)
      return highScore.length > 0 ? highScore[0].userId === player.userId : null
    }
  },

  mutations: {

    START_GAME(store, data) {
      // reset game
      store.game = {
        key: data.player.gameKey,
        score: 0,
        hotseat: 0,
        connected: data.connected,
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


    // the user has quit the game. reset everything
    QUIT_GAME(store, notify) {
      // reset all
      store.game = {
        key: null,
        connected: false,
        hotseat: 0,
      }

      store.user = {
        id: '',
        spectator: false,
      }

      store.players = []

      store.questions = []
    },

    END_GAME(){

    },

    COMPUTE_SCORES(store, hotSeatPlayer){
      let correctGuess = []
      let playerScores = {}
      // add 'em up
      store.questions[store.questions.length - 1].answers.forEach((answer) => {
        // if the player guessed the hotseat's answer,
        // then they are awarded 4 points
        if(!!answer.correct){
          // don't need to add because the round only awards points
          // to those users who guessed correctly
          playerScores[answer.player.userId] = 4
          correctGuess.push(answer.player.userId)
        } else {
          // if not,
          // 1 point for every guess
          // and 2 points for guessing the hotseat's answer 
          if(hotSeatPlayer.userId === answer.player.userId){
            // we're looking at the hotseat's player
            // give 2 points to whoever guessed this correctly
            answer.picks.forEach((pick) => {
              if(playerScores.hasOwnProperty(pick.userId)){
                playerScores[pick.userId] += 2

              } else {
                playerScores[pick.userId] = 2
              }
            })
          }

          // otherwise we're on a player's answer
          // give that player 1 point for every pick
          if(playerScores.hasOwnProperty(answer.player.userId)){
            playerScores[answer.player.userId] += answer.picks.length
          } else {
            playerScores[answer.player.userId] = answer.picks.length
          }
          // award extra points
          if(!!answer.extraPoints){
            playerScores[answer.player.userId] += 2
          }
        }
      })

      // set the player's scores
      store.players.forEach((player) => {
        let score = 0
        if(correctGuess.length > 0){
          score = correctGuess.includes(player.userId) ? playerScores[player.userId] : 0
        } else {
          score = playerScores[player.userId] || 0
        }
        Vue.set(player, 'score', player.score + score)
        Vue.set(player, 'scoreChange', score)

      })
    },

    UPDATE_SCORES(store, players){
      store.players.forEach((player) => {
        let playerScore = players.find(p => p.userId === player.userId)
        if(playerScore){
          Vue.set(player, 'score', playerScore.score)
          Vue.set(player, 'scoreChange', playerScore.scoreChange)
        }
      })
    },


    //
    // SOCKETS
    //

    SOCKET_PLAYER_ACTIVATE(store){
      store.players.forEach((player) => {
        if(!player.spectator){
          player.active = true
        }
      })
    },

    SOCKET_REORDER_PLAYERS(store, data){
      store.players.forEach((player) => {
        player.order = data.playerOrder[player.userId]
      })
    },

    // a new question has been added
    SOCKET_QUESTION_ADDED(store, data){
      data.question.answers = []
      store.questions.push(data.question)
    },

    SOCKET_ANSWERS_ADJUDICATED(store, data){
      // shuffle arrays
      let answers = store.questions[store.questions.length - 1].answers
      // shuffle answers
      for (let i = answers.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = answers[i]
        // check the correct / duplicate status
        if(data.correct.includes(temp.player.userId)){
          Vue.set(temp, 'correct', true)
        }
        if(data.duplicates.includes(temp.player.userId)){
          Vue.set(temp, 'duplicate', true)
        }
        if(data.extraPoints === temp.player.userId){
          Vue.set(temp, 'extraPoints', true)
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
    SOCKET_ANSWER_ADDED(store, data){
      data.answer.picks = []
      store.questions[store.questions.length - 1].answers.push(data.answer)
    },

    PLAYER_JOINED(store, player) {
      store.players.push(player)
    },

    SOCKET_GAME_STATE(store, data){
      console.log(data)
      Vue.set(store.game, 'hotseat', data.hotseat)
      Vue.set(store, 'players', data.players)
      Vue.set(store, 'questions', data.questions)
    },

    SOCKET_NEW_ROUND(store, data) {
      store.game.hotseat = data.hotseat
    },

    // remove quitter
    SOCKET_PLAYER_QUIT(store, data) {
      let index = 0
      let indexFound = false
      store.players.forEach( (player, ind) => {
        // reorder the players after the one that left
        if(indexFound){
          player.order = player.order -1
        }
        if(player.userId === data.user){
          index = ind
          indexFound = true
        }
      })
      // remove player
      Vue.delete(store.players, index)
      // change hotseat to be the length of the players (if we removed the last player _and_ they were in the hotseat)
      // possible we need to filter out the spectators. not sure
      let players = store.players.filter(player => !player.spectator)
      if(players.length >= store.game.hotseat){
        store.game.hotseat = store.players.length - 1
      }

    },

  },

  actions: {

    newGame({commit}, data){
      commit('START_GAME', { player: data, connected: true })
      commit('PLAYER_JOINED', data)
    },

    joinGame({commit}, data){
      commit('START_GAME', { player: data, connected: true })
    },

    activatePlayers({commit}){
      commit('ACTIVATE_PLAYERS')
    },

    quitGame({commit}){
      commit('QUIT_GAME', true)
    },

    endGame({commit}){
      commit('END_GAME', false)
      commit('QUIT_GAME', true)
    },

    computeScores({commit, getters}){
      return new Promise((resolve, reject) => {
      //   setTimeout(() => {
          commit('COMPUTE_SCORES', getters.hotSeatPlayer)
          resolve()
        // }, 1000)
      })
    },

    socket_scoreResults({commit, getters}, data){
      if(!getters.player.active){
        commit('UPDATE_SCORES', data.players)
      }
    },

    socket_playerJoined({commit}, data){
      commit('PLAYER_JOINED', data)
      // commit('ACTIVATE_PLAYERS')
    },

    socket_playerSpectate({commit}, data){
      commit('PLAYER_JOINED', data)
    }

  },
})
