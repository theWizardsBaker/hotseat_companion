<template>
  <nav class="navbar is-info is-fixed-bottom" role="navigation" aria-label="main navigation">
    <div class="navbar-start">
      <!-- navbar items -->
      <div class="navbar-item">
        <h3 class="title is-marginless is-paddingless is-4 has-text-light">Vote!</h3>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'titlebar',

  props: [
    'action',
  ],

  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
  @media screen and (min-width: 100px){

    .navbar {
      justify-content: space-between;
      .navbar-end {
          float:right
      }

      .navbar-start, .navbar-item {
        display: inline-flex;
        .title {
          line-height: inherit;
        }
      }
    }

  }

</style>