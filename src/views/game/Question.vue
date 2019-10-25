<template>
  <div class="hero is-medium">
    <div class="card-display">
      <div class="questions columns is-mobile is-centered">
        <div class="column is-narrow ">
          <card :display="reveal">
            <template #title>
              <slot name="title">{{question.user}}</slot>
            </template>
            <template #content>
              <div v-if="answer">
                <textarea class="textarea" placeholder="Type question here" v-model="question.text">
                </textarea>
                <p class="help has-text-grey-light">{{characterCount}}/{{question.length}}</p>
                <br/>
              </div>
              <div v-else>
                {{question.text}}
              </div>
            </template>
            <template #footer>
              <button class="button is-success is-fullwidth" 
                      v-if="answer"
                      @click="answerQuestion">
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
    'answer',
  ],

  data () {
    return {
      question: {
        user: "",
        text: "",
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
  	answerQuestion(){
      console.log('in question', this.question)
      this.$emit('answered', this.question)
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
