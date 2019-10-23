import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

   	game: {
   		host: false,
  	 	key: null,
  	 	score: 0,
      connected: false
  	},

  	user: {
        id: '',
        name: '',
        inHotseat: false,
        observer: false,
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

    isHost: ({game}) => game.host,

    inGame: ({game}) => game.key && game.connected,

    currentQuestion: ({questions}) => questions[questions.length - 1]

  },

  mutations: {

  	// addQuestion(state, question){
  	// 	state.questions.push(question)
  	// },

    updateUsername({user}, userName){
      user.name = userName
    },

    SOCKET_GAME_CREATED({game, user}, data) {
      console.log("waka waka waka")
      // set userid
      user.id = data.userId
      // set game options
      game.id = data.userId
      game.key = data.gameKey
      game.host = true
  		state.game.score = 0
      game.connected = true
    },

    SOCKET_GAME_JOINED({game}, data) {
      console.log("HELELEOEOEOEELELELE")
      // set userid
      user.id = data.userId
      // set game options
      game.id = data.userId
      game.key = data.gameKey
      game.host = false
      state.game.score = 0
      game.connected = true
    },

    SOCKET_GAME_QUIT({game}) {
      console.log("WLLFLWLWLWLWLWLWLW")
      game = {
        host: false,
        key: null,
        score: 0,
        connected: false
      }
    },
  },

  actions: {
    setUserName({commit}, userName){
      commit('updateUsername', userName)
    }
  },
})
