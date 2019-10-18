<template>
  <div class="hero is-medium">
      <guess :name="answer.name" :text="answer.text" :reveal="show">
        <template #text>
          HELLO FOOL
        </template>
      </guess>
  </div>
</template>

<script>
import Guess from '@/components/Guess'

export default {
  
  name: 'answer',
  
  components: {
  	Guess,
  },

  data () {
    return {
      show: false,
      answers: {
        user: "Justin",
        text: "Me"
      },
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
