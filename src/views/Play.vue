<template>
  <div>
    <titlebar :name="name" :score="score">
    </titlebar>
    
    <score-board />
    <div class="columns is-mobile">
      <div class="column is-4-tablet">
        <guess />
      </div>
    </div>
    
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Titlebar from '@/components/Titlebar'
import ScoreBoard from '@/components/ScoreBoard'
import Guess from '@/components/Guess'

export default {

  name: 'Play',

  components: {
  	Titlebar,
    ScoreBoard,
    Guess
  },

  data () {
    return {
      name: "Justin",
      score: 23
    }
  },

  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
