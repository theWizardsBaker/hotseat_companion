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
              {{question.text}}
            </template>
            <template #footer>
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
    'reveal'
  ],

  data () {
    return {
      question: {
        user: "Justin",
        text: "Who is your worst nighmare",
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
  }
}
</style>
