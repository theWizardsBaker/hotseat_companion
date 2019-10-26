<template>
  <div class="hero is-medium">
    <div class="card-display">
      <div class="questions columns is-mobile is-centered">
        <div class="column is-narrow ">
          <card :display="reveal">
            <template #title>
              <slot name="title">{{cardQuestion.user}}</slot>
            </template>
            <template #content>
              <div v-if="answer">
                <textarea class="textarea" placeholder="Type Hot Seat question here" v-model="cardQuestion.text">
                </textarea>
                <p class="help has-text-grey-light">{{characterCount}}/{{maxLength}}</p>
                <br/>
              </div>
              <div v-else>
                {{cardQuestion.text}}
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
    'question'
  ],

  data () {
    return {
      maxLength: 255,
      cardQuestion: {
        user: "",
        text: "",
      },
    }
  },

  watch: {
    question: {
      immediate: true,
      handler(val) {
        if(val){
          this.question = val
        }
      }
    }
  },

  computed: {
    characterCount(){
      return this.maxLength
    }
  },

  watch: {
    characterCount(value){
      if(value > this.maxLength){
        this.$set(this.cardQuestion, 'text', this.cardQuestion.text.substring(0, this.cardQuestion.length))
      }
    }
  },

  methods: {
  	answerQuestion(){
      this.$emit('answered', this.cardQuestion)
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
