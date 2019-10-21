<template>
  <nav class="navbar is-info is-fixed-bottom" role="navigation" aria-label="main navigation">
    <div class="navbar-start">
      <!-- navbar items -->
      <div class="navbar-item is-active">
        <h3 class="title is-marginless is-paddingless is-4 has-text-light">{{title}}</h3>
      </div>
      <div class="navbar-item">
        <h3 class="subtitle is-marginless is-paddingless is-5 has-text-light">{{text}}</h3>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'titlebar',

  props: [
    'title',
    'text'
  ],

  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
  .is-active {
    background-color: hsl(217, 71%, 53%);
    padding-right: 20px;
  }
</style>