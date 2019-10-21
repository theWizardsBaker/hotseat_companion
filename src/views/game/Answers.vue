<template>
  <div class="hero is-medium">
    <div class="columns is-multiline is-2">
      <div class="column answers is-6-tablet "
           :class="[ shrink ? 'is-6-desktop' : 'is-4-desktop' ]"
           v-for="answer, index in answers">
        <!-- index == answers.length - 1 -->
        <div class="section">
          <guess :name="answer.name"
                 :text="answer.text"
                 :reveal="revealAuthor"
                 :selectable="select"
                 :isSelected="selected === index"
                 @selected="selected = index"
                 />
          <div class="tags" v-show="revealVotes">
            <span class="tag is-success" v-for="vote in answer.votes">
              <span class="icon">
                <i class="fa fa-check"></i>
              </span>
              <span>{{vote}}</span>
            </span>
          </div>
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
    'revealVotes'
  ],

  data () {
    return {
      show: false,
      selected: null,
      answers: [
        {
          user: "Justin",
          text: "Me",
          votes: [
            "Beka",
            "Carl"
          ]
        },
        {
          user: "Beka",
          text: "What do you mean",
        },
        {
          user: "Carl",
          text: "Get buck get stuck"
        },
        {
          user: "Carl",
          text: "Get buck get stuck"
        }
      ]
    }
  },

  computed: {
    oddAnswers(){
      return (this.answers.length % 2)
    }
  },
  
  methods: {
  	handleSelection(option){

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
  }
}
</style>
