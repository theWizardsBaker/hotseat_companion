<template>
  <div class="hero is-dark is-medium">
  	<div class="hero-body">
  		<h4 class="title is-1 has-text-centered">
  			Hot Seat
  		</h4>
  		<h4 class="subtitle has-text-centered">
  			Select from the choices below
  		</h4>
	  	<div class="columns is-mobile is-3 is-centered is-multiline">
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
					  						 />
	  						</div>
	  					</div>
	  					<div class="field">
	  						<div class="control">
					  			<button class="button is-fullwidth">{{option.action | capitalize}} Game</button>
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

export default {
  name: 'GameSelect',
  components: {
  	Card
  },
  data () {
    return {
    	gameRoom: "",
      gameOptions: [
        {
          name: 'Create Game',
          linkTo: 'create',
          action: 'create',
          text: 'Host a new game.'
        },
        {
          name: 'Join Game',
          linkTo: 'join',
          action: 'join',
          text: 'Play in another user\'s game'
        },
        {
          name: 'Spectate Game',
          linkTo: 'spectate',
          action: 'join',
          text: 'Watch another user\'s game'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
	.title {
		font-family: "Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans",Tahoma,sans-serif;
	}
	.button {
	}
</style>
