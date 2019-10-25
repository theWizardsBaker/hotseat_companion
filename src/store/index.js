import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

   	game: {
   		host: false,
  	 	key: null,
  	 	score: 0,
      connected: false,
  	},

  	user: {
        id: '',
        name: '',
        observer: false,
        hotseat: false,
        active: false,
  	},

	  players: [],

    questions: [],
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
  },

  getters: {

    players: ({players}) => {
      return players.filter(player => player.active)
    },

    isHost: ({game}) => game.host,

    inGame: ({game}) => game.key && game.connected,

    inHotSeat: ({user}) => user.hotseat,

    currentQuestion: ({questions}) => questions[questions.length - 1]

  },

  mutations: {

  	// addQuestion(state, question){
  	// 	state.questions.push(question)
  	// },

    setActive({user}){
      user.active = true
    },

    updateUsername({user}, userName){
      user.name = userName
    },

    joinGame({game, user}, data) {
      // set userid
      user.id = data.userId
      user.name = data.name
      // set game options
      game.id = data.userId
      game.key = data.gameKey
      game.host = data.host
      game.score = 0
      game.connected = true
    },

    addQuestion({questions}, question){
      questions.push(question)
    },

    SOCKET_GAME_QUIT({game, user, players, questions}) {
      // reset game
      game = {
        host: false,
        key: null,
        score: 0,
        connected: false
      }
      // reset user
      user = {
          id: '',
          name: '',
          observer: false,
          hotseat: false,
          active: false
      }
      // cler players
      players = []
      // lear everything
      questions = []
    },

    SOCKET_PLAYER_JOINED({players}, user) {
      Vue.set(user, 'order', players.length)
      Vue.set(user, 'score', 0)
      Vue.set(user, 'hotseat', players.length == 0)
      players.push(user)
    },

    SOCKET_PLAYER_ACTIVATE({players}, user) {
      let player = players.find( player => player.id === user.id )
      player.active = true
    },

  },

  actions: {
    setUserName({commit}, userName){
      commit('updateUsername', userName)
    },

    quitGame({commit}){
      commit('SOCKET_GAME_QUIT')
    },

    socket_gameCreated({commit, state}, data) {
      // the host
      Vue.set(data, 'host', true)
      //join the game
      commit('joinGame', data)
      // add the player
      commit('SOCKET_PLAYER_JOINED', state.user)
    },

    socket_gameJoined({commit, game, user}, data) {
      Vue.set(data, 'host', false)
      commit('joinGame', data)
    },

    activate({commit}){
      commit('setActive')
    },

    addQuestion({commit}, question){
      console.log(question)
      commit('addQuestion', question)
    }

  },
})
