import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

   	game: {
  	 	key: null,
   		host: false,
      connected: false,
  	},

  	user: {
      id: '',
      observer: false,
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

    player: ({players, user}) => players.find(player => player.userId === user.id),

    gameKey: ({game}) => game.key,

    activePlayers: ({players}) => players.filter(player => player.active),

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

    currentQuestion: ({questions}) => questions[questions.length - 1]

  },

  mutations: {

    // setActive({user}){
    //   user.active = true
    // },

    // ADD_PLAYER(state, player){
    //   // Vue.set(player, 'order', players.length)
    //   // Vue.set(player, 'score', 0)
    //   // Vue.set(player, 'hotseat', players.length == 0)
    //   // players.push(player)
    //   console.log(state)
    // },
    // set everything for a new game

    NEW_GAME({game, user}, data) {
      // set userid
      user.id = data.userId
      // set game options
      game.key = data.gameKey
      game.host = true
      game.connected = true
    },

    // 
    // Socket Listeners
    // 

    // a new question has been added
    SOCKET_QUESTION_ADDED({questions}, question){
      questions.push(question)
    },
    // the user has quit the game. reset everything
    SOCKET_GAME_QUIT({game, user, players, questions}) {

    },
    // another player has joined, add them to the game
    SOCKET_PLAYER_JOINED(store, player) {
      // reset game
      store.game = {
        host: false,
        key: null,
        score: 0,
        connected: false
      }
      // reset user
      store.user = {
          id: '',
          observer: false,
      }
      // clear players
      store.players = []
      // lear everything
      store.questions = []
      // set player defaults
      Vue.set(player, 'order', store.players.length)
      Vue.set(player, 'score', 0)
      Vue.set(player, 'hotseat', store.players.length == 0)
      Vue.set(player, 'active', false)
      store.players.push(player)
    },
    // another player is active this round
    SOCKET_PLAYER_ACTIVATE({players}, user) {
      let player = players.find( player => player.id === user.id )
      player.active = true
    },

  },

  actions: {

    newGame({commit}, data){
        commit('SOCKET_PLAYER_JOINED', data)
        commit('NEW_GAME', data)
      //  return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //   resolve()
      // }, 4000)
      // })
    }

    // quitGame({commit}){
    //   commit('SOCKET_GAME_QUIT')
    // },

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
