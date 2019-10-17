<template>
  <div class="hero is-dark is-medium">
  	<div class="hero-body">
  		<h4 class="title is-1 has-text-centered">
  			Hot Seat
  		</h4>
  		<h4 class="subtitle has-text-centered">
  			Select from the choices below
  		</h4>
  		<loading v-if="gameSelected" />
	  	<div class="columns is-mobile is-3 is-centered is-multiline" v-else>
	  		<div class="column is-narrow-mobile is-narrow-tablet" :key="option" v-for="option in gameOptions">
			  	<card>
			  		<template #title>
			  			{{option.name}}
			  		</template>
			  		<template #content>
			  			{{option.text}}
			  		</template>
			  		<template #footer>
			  			<div class="field" v-if="option.action == 'join'">
			  				<label class="label">Game Key</label>
							  <div class="control">
					  			<input type="text"
					  						 name="room"
					  						 v-model="gameRoom"
					  						 class="input"
					  						 :disabled="gameSelected"
					  						 :class="{ 'is-danger': option.error }"
					  						 />
					  			<p class="help is-danger" v-show="option.error">Enter a Game Key to join</p>
	  						</div>
	  					</div>
	  					<div v-else>
	  						<p class="spacer">
									&nbsp;
								</p>
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

  data () {
    return {
    	gameRoom: "",
    	gameSelected: false,
      gameOptions: [
        {
          name: 'Create Game',
          linkTo: 'create',
          action: 'create',
          text: 'Host a new game.',
          selected: false,
          error: false
        },
        {
          name: 'Join Game',
          linkTo: 'join',
          action: 'join',
          text: 'Play in another user\'s game',
          gameKey: '',
          selected: false,
          error: false
        },
        {
          name: 'Spectate Game',
          linkTo: 'spectate',
          action: 'join',
          text: 'Watch another user\'s game',
          gameKey: '',
          selected: false,
          error: false
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
	  		option.selected = true
	  		this.gameSelected = true
  		}
  	}
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
