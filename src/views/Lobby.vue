<template>
  <div class="gameboard hero is-dark">
    <!-- main navigation and options menu -->
    <h3>Select Player Order</h3>
    <player-order :players="game.players" @complete="isCompleted = true"/>
    <button class="button">Start Game</button>

  </div>
</template>

<script>

import PlayerOrder from '@/views/game/PlayerOrder'

export default {

  name: 'Lobby',

  components: {
    PlayerOrder,
  },


  data () {
    return {
      isCompleted: false
    }
  },

  computed: {

  },

}
</script>

<style scoped lang="scss">

</style>
