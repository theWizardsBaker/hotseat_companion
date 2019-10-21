<template>
  <div class="hero is-medium">
    <div class="card-display">
      <div class="questions columns is-mobile is-centered">
        <div class="column is-narrow ">
          <card :display="reveal">
            <template #title>
              {{question.user}}
            </template>
            <template #content>
              <div v-if="answer">
                <textarea class="textarea" v-model="question.text">
                </textarea>
                <p class="help has-text-grey-light">{{characterCount}}/{{question.length}}</p>
                <br/>
              </div>
              <div v-else>
                {{question.text}}
              </div>
            </template>
            <template #footer>
              <button class="button is-success is-fullwidth" v-if="answer">
                Reveal
              </button>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {

  name: 'question',

  components: {
  	Card,
  },

  props: [
    'reveal',
    'answer'
  ],

  data () {
    return {
      question: {
        user: "Justin",
        text: "Who is your worst nighmare",
        length: 255,
      },
    }
  },

  computed: {
    characterCount(){
      return this.question.text.length
    }
  },

  watch: {
    characterCount(value){
      if(value > this.question.length){
        this.$set(this.question, 'text', this.question.text.substring(0, this.question.length))
      }
    }
  },

  methods: {
  	handleSelection(option){

  	}
  }
}
</script>

<style scoped lang="scss">

.card-display{
  padding-bottom: 25px;
  .questions {
    /*overflow: auto;*/
    overflow-x: auto;
    overflow-y: hidden;
    flex-direction: row-reverse;
    flex-wrap: nowrap;

    .help {
      text-align: right;
    }
  }
}
</style>
