<template>
  <div id="app">
  	<div class="hero is-dark" v-show="loading">
	  	<loading />
    </div>
    <router-view v-show="!loading"/>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue'

export default {

  name: 'App',

  components: {
  	Loading,
  },

  data: {
  	loading: false
  }
}
</script

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  .hero {

  }
}
</style>
