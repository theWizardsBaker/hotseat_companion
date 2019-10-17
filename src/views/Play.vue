<template>
  <div>
    <titlebar :name="name" :score="score">
    </titlebar>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Titlebar from '@/components/Titlebar'

export default {

  name: 'Play',

  components: {
  	Titlebar
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
