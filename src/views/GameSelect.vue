<template>
  <div class="hero is-dark is-medium">
  	<div class="hero-body">
  		<h4 class="title is-1 has-text-centered">
  			Hot Seat
  		</h4>
  		<h4 class="subtitle has-text-centered">
  			Start a new game or enter a game key to join another player's
  		</h4>
	  	<div class="columns is-mobile is-3 is-centered is-multiline">
	  		<div class="column is-narrow-mobile is-narrow-tablet"
	  				 :key="option.name"
	  				 v-for="option in gameOptions"
	  				 >
			  	<card :display="option.display">

			  		<template #title>
			  			{{option.name}}
			  		</template>

			  		<template #content>
			  			{{option.text}}
			  		</template>

			  		<template #footer>
			  			<div class="field" v-if="option.hasOwnProperty('userName')">
			  				<label class="label help">Name</label>
							  <div class="control">
					  			<input type="text"
					  						 name="room"
					  						 v-model="option.userName"
					  						 class="input"
					  						 length="25"
					  						 :disabled="gameSelected"
					  						 :class="{ 'is-danger': option.error }"
					  						 />
	  						</div>
	  					</div>
	  					<div class="field" v-if="!!option.hasOwnProperty('gameKey')">
			  				<label class="label help">Game Key</label>
							  <div class="control">
					  			<input type="text"
					  						 name="room"
					  						 v-model="option.gameKey"
					  						 class="input"
					  						 :disabled="gameSelected"
					  						 :class="{ 'is-danger': option.error }"
					  						 length="10"
					  						 hint="game key"
					  						 />
	  						</div>
	  					</div>


	  					<div class="field">
	  						<div class="control">
					  			<button class="button is-fullwidth"
					  							:disabled="gameSelected"
					  							@click="handleSelection(option)">
					  				{{option.action | capitalize}} Game
					  			</button>
					  		</div>
					  	</div>

			  		</template>

			  	</card>
		  	</div>
	  	</div>
	  	<div class="">
	  		<h3 class="title is-4 has-text-danger has-text-centered">
	  			{{errorMessage}}
	  		</h3>
	  	</div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {

  name: 'GameSelect',

  components: {
  	Card,
  },

  mounted() {

  	for(let i = 0; i < this.gameOptions.length; i++){
	  	this.delay(800 + (i * 300)).then(() => {
		  	this.$set(this.gameOptions[i], 'display', true)
	  	})
  	}

  },

  data () {
    return {
    	gameSelected: false,
    	errorMessage: '',
      gameOptions: [
        {
          name: 'Create Game',
          action: 'create',
          text: 'Create a new game.',
          error: false,
          display: false,
		    	userName: '',
		    	selected: false,
		    	spectate: false
        },
        {
          name: 'Join Game',
          action: 'join',
          text: 'Join another user\'s game.',
          error: false,
          display: false,
        	gameKey: '',
		    	userName: '',
		    	selected: false,
		    	spectate: false
        },
        {
          name: 'Spectate Game',
          action: 'spectate',
          text: 'Watch another user\'s game.',
          error: false,
          display: false,
        	gameKey: '',
        	selected: false,
        	spectate: true
        }
      ]
    }
  },

  computed: {

  	selectedOption(){
  		return this.gameOptions.find((opt) => opt.selected)
  	}

  },

  sockets: {

  	game_refused(){
  		this.gameSelected = false
  		this.selectedOption.error = true
  		this.selectedOption.selected = false
  		this.errorMessage = "Game does not exist"
  	},

  	game_created(data){
			this.$router.push({
  			name: 'play',
  			params: {
  				gameKey: data.gameKey
  			},
  		})
  	}

  },

  methods: {

  	handleSelection(option){

  		this.errorMessage = ''
			option.error = false

  		if( option.hasOwnProperty('userName') ) {
  			option.error = option.userName == "" || option.userName.length == 0
  		}

  		if( option.hasOwnProperty('gameKey') ) {
  			option.error = option.error || (option.gameKey == "" || option.gameKey.length == 0)
  		}

  		if(!option.error){
  			// triger the game has been selected
	  		this.gameSelected = true
	  		// select this option as the one selected
	  		option.selected = true
  			// this[option.action + 'Game']()
  			// get our options
  			let data = { userName: option.userName, gameKey: option.gameKey, spectate: option.spectate }
  			// what action we'll send to the socket
  			let action = option.action === 'create' ? 'create_game' : 'join_game'
  			// emit to socket
		  	this.$socket.client.emit(action, data)
  		}
  	},

  }
}
</script>

<style scoped lang="scss">
	.title {
		font-family: "Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans",Tahoma,sans-serif;
	}
	.spacer {
		height: 80px;
	}
	.hero {
		min-height: 100vh;
	}
</style>
