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
  	},

  	user: {
      id: '',
      spectator: false,
  	},

	  players: [],
        // hotseat: false,
        // active: false,

    questions: [
      //   {
      //     hotsetPlayer: {
      //       name: "Justin",
      //       id: 2,
      //     },
      //     text: "Who are you? Who who, who who?",
      //     answers: [
      //       {
      //         player: {
      //           name: "Justin",
      //           id: 2,
      //         },
      //         text: "Me. I am.",
      //         picks: [
      //           2, 3, 4, 5
      //         ]
      //       },
      //     ]
      //   }
      // ]
    ],
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

    hotSeatPlayer: ({players}) => players.find(player => player.hotseat),

    inHotSeat: ({user}, {hotSeatPlayer}) => {
      try {
        return user.id === hotSeatPlayer.userId
      } catch(e) {
        return false
      }
    },

    currentQuestion: ({questions}) => questions[questions.length - 1],

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

    INCREMENT_ROUND({game}, data){
      game.round++
      game.stage = 0
    },
    
    INCREMENT_STAGE({game}, data){
      game.stage++
    },

    START_GAME(store, data) {
      // reset game
      store.game = {
        host: data.host,
        key: data.player.gameKey,
        score: 0,
        round: 0,
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
      }

      store.user = {
        id: '',
        spectator: false,
      }

      store.players = []

      store.questions = []
    },



    SOCKET_ANSWER_SELECTED({questions}, data){
      questions[questions.length - 1].answers.forEach((answer) => {
        // remove any other selections
        for(let i = 0; i > answer.picks.length; i++){
          if(answer.picks[i].userId === answer.hotSeatPlayer.userId){
            // remove it
            Vue.delete(answer.picks, i)
            // stop the loop
            i = answer.picks.length
            break;
          }
        }
        // add the pick
        if(answer.hotSeatPlayer.userId === data.answer.hotSeatPlayer.userId){
          answer.picks.push(data.answer.hotSeatPlayer)
        }
      })
    },

    // a new question has been added
    SOCKET_ANSWER_ADDED({questions}, answer){
      Vue.set(answer, 'picks', [])
      questions[questions.length - 1].answers.push(answer)
    },

    // a new question has been added
    SOCKET_QUESTION_ADDED({questions}, question){
      Vue.set(question, 'answers', [])
      questions.push(question)
    },

    SOCKET_PLAYER_JOINED({players}, player) {
      // set player defaults
      Vue.set(player, 'order', players.length)
      Vue.set(player, 'score', 0)
      Vue.set(player, 'hotseat', players.length == 0)
      Vue.set(player, 'active', false)
      // add new player
      players.push(player)
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
    SOCKET_PLAYER_ACTIVATE({players}, user) {
      let player = players.find( player => player.id === user.id )
      player.active = true
    },

    // remove quitter
    SOCKET_PLAYER_QUIT({players}, user) {
      players = players.filter( player => player.id === user.id )
    },

  },

  actions: {

    newGame({commit}, data){
        commit('START_GAME', { player: data, host: true, connected: true, synced: true })
        commit('SOCKET_PLAYER_JOINED', data)
      //  return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //   resolve()
      // }, 4000)
      // })
    },

    joinGame({commit}, data){
      commit('START_GAME', { player: data, host: false, connected: true, synced: false })
    },

    activatePlayers({commit}){
      commit('ACTIVATE_PLAYERS')
    },

    incrementRound({commit}){
      commit('INCREMENT_ROUND')
    },

    incrementStage({commit}){
      commit('INCREMENT_STAGE')
    },

    quitGame({commit}){
      commit('QUIT_GAME')
    },

    // activate({commit}){
    //   commit('setActive')
    // },

    // joinGame({commit, state}, data) {
    //   // the host
    //   Vue.set(data, 'host', true)
    //   //join the game
    //   commit('joinGame', data)
    //   // add the player
    //   commit('SOCKET_PLAYER_JOINED', state.user)
    // },

  },
})
