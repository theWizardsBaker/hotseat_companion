<template>
  <div class="hero is-medium">

    <div class="questions columns is-mobile">
<!--       <div class="column is-narrow current-question">
        <card :display="false" />
      </div> -->
      <div class="column is-narrow old-questions" v-for="question in questions">
        <card :display="question.display">
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
</template>

<script>
import Card from '@/components/Card'

export default {
  
  name: 'questions',
  
  components: {
  	Card,
  },

  data () {
    return {
      questions: [
        {
          user: "Justin",
          text: "Who is your worst nighmare",
          display: true,
        },
        {
          user: "Justin",
          text: "Who is your worst nighmare",
          display: true,
        },


      ]
    }
  },
  
  methods: {
  	handleSelection(option){

  	}
  }
}
</script>

<style scoped lang="scss">
.hero {

  padding: 0 4vw;
  .questions {
    overflow-x: auto;
    overflow-y: hidden;
    flex-direction: row-reverse;
    /*justify-content: center;*/
  }
}
</style>
