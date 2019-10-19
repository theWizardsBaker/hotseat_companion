<template>
  <div class="hero is-dark is-medium">
  	<div class="hero-body">
  		<h4 class="title is-1 has-text-centered">
  			Hot Seat
  		</h4>
  		<h4 class="subtitle has-text-centered">
  			Start a new game or enter a game key to join another player's
  		</h4>
  		<loading v-if="gameSelected" />
	  	<div class="columns is-mobile is-3 is-centered is-multiline" v-else>
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

			  			<div class="field" :style="{visibility: option.action == 'join' ? 'visible' : 'hidden'}">
			  				<label class="label help">Name</label>
							  <div class="control">
					  			<input type="text"
					  						 name="room"
					  						 v-model="userName"
					  						 class="input"
					  						 :disabled="gameSelected"
					  						 :class="{ 'is-danger': option.error }"
					  						 />
	  						</div>
	  					</div>
	  					<div class="field" :style="{visibility: option.action != 'create' ? 'visible' : 'hidden'}">
			  				<label class="label help">Game Key</label>
							  <div class="control">
					  			<input type="text"
					  						 name="room"
					  						 v-model="gameRoom"
					  						 class="input"
					  						 :disabled="gameSelected"
					  						 :class="{ 'is-danger': option.error }"
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
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Loading from '@/components/Loading.vue'

export default {

  name: 'GameSelect',

  components: {
  	Card,
  	Loading
  },

  onCreate() {

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
    	gameRoom: "",
    	userName: "",
    	gameSelected: false,
      gameOptions: [
        {
          name: 'Create Game',
          action: 'create',
          text: 'Host a new game.',
          error: false,
          display: false
        },
        {
          name: 'Join Game',
          action: 'join',
          text: 'Play in another user\'s game',
          gameKey: '',
          error: false,
          display: false
        },
        {
          name: 'Spectate Game',
          action: 'spectate',
          text: 'Watch another user\'s game',
          gameKey: '',
          error: false,
          display: false
        }
      ]
    }
  },

  methods: {

  	handleSelection(option){
  		if(option.action == 'join' && (option.gameKey == "" || option.gameKey.length == 0 )){
  			option.error = true
  		} else {
  			option.error = false
	  		this.gameSelected = true
	  		this.$router.push({ name: 'play' })
  		}
  	},

    delay(time, v) {
       return new Promise((resolve) => {
           setTimeout(resolve.bind(null, v), time)
       });
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
		height: 100vh;
	}
</style>
