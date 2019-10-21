<template>
  <article class="panel is-primary">
    <p class="panel-heading">
      Player Order
    </p>
    <a class="panel-block" v-for="player, index in players" @click="setOrder(player)">
      <span class="tag is-primary is-rounded">
        <template v-if="player.newOrder !== null">
          <b>{{player.newOrder + 1}}</b>
        </template>
        <template v-else>
          -
        </template>
      </span>
      <span class="name">{{player.name}}</span>
    </a>
    <div class="panel-block">
      <button class="button" 
              :class="{ 'is-disabled': !complete, 'is-success': complete }" 
              :disabled="!complete">
        Save Order
      </button>
    </div>
  </article>
</template>

<script>

export default {
  
  name: 'player-order',

  props: [
    'players'
  ],

  created(){
    this.players.forEach( player => {
      this.$set(player, 'newOrder', null)
    })
  },

  data () {
    return {
      currentOrder: 0
    }
  },

  computed: {
    complete(){
      return false
    }
  },

  methods: {
    setOrder(player){
      if(player.newOrder === null){
        this.$set(player, 'newOrder', this.currentOrder)
        this.currentOrder++
      } else {
        this.$set(player, 'newOrder', null)
        this.players.forEach(player => {
          if(player.newOrder){
            player.newOrder --
          }
        })
        this.currentOrder--
      }
    }
  }
}
</script>

<style scoped lang="scss">
.panel-block {
  background-color: white;
  .tag {
    margin-right: 30px;
  }
}

</style>
