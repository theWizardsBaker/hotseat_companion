<template>
  <div class="hero is-medium">
    <div class="columns is-multiline is-2">
      <div class="column answers is-6-tablet "
           :class="[ shrink ? 'is-6-desktop' : 'is-4-desktop' ]"
           v-for="gamePlayer in players"
           >

           <!-- v-for="answer, index in answers" -->
        <!-- index == answers.length - 1 -->

        <div class="section" v-if="gamePlayer.userId !== player.userId">
          <div class="placeholder">
            {{gamePlayer.name}}
          </div>
<!--           <guess :name="answer.hotSeatPlayer.name"
                 :text="answer.answer"
                 :reveal="revealAuthor"
                 :selectable="select"
                 :isSelected="selected === index"
                 @selected="handleSelection(index, answer)"
                 />
          <div class="tags" v-show="revealVotes">
            <span class="tag is-success" v-for="vote in answer.votes">
              <span class="icon">
                <i class="fa fa-check"></i>
              </span>
              <span>{{vote}}</span>
            </span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Guess from '@/components/Guess'

export default {
  
  name: 'answers',
  
  components: {
  	Guess,
  },

  props: [
    'shrink',
    'select',
    'revealAuthor',
    'revealVotes',
    'answers',
    'answersRemaining',
    'players',
    'player'
  ],

  data () {
    return {
      show: false,
      selected: null,
    }
  },

  computed: {
    oddAnswers(){
      return (this.answers.length % 2)
    }
  },
  
  methods: {
  	handleSelection(index, answer){
      if(this.selected !== index){
        selected = index; 
        this.$emit('selected', answer)
      }
  	}
  }
}
</script>

<style scoped lang="scss">
.column {
  /*flex-grow: 0;*/
  .section {
    padding: 1.5vw;
    width: 100%;

    .placeholder {
      border: 3px dashed lightgrey;
      border-radius: 8px;
      padding: 8px;
      min-height: 130px;
    }
  }
}
</style>
