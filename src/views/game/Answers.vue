<template>
  <div class="hero is-medium">
    <div class="columns is-multiline is-3 is-centered">
      <div class="column is-narrow is-4-fullscreen" v-for="answer in answers">
        <guess :name="answer.name" :text="answer.text" :reveal="show" />
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
    'select'
  ],

  data () {
    return {
      show: false,
      answers: [
        {
          user: "Justin",
          text: "Me"
        },
        {
          user: "Beka",
          text: "What do you mean"
        },
        {
          user: "Carl",
          text: "Get buck get stuck"
        }
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

</style>
