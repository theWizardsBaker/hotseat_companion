<template>
  <nav class="navbar is-dark is-fixed-bottom" role="navigation" aria-label="main navigation">

      <div class="navbar-start">
        <!-- navbar items -->
        <div class="navbar-item">
          <h3 class="title is-marginless is-paddingless is-4 has-text-light">{{name}}</h3>
        </div>
        <div class="navbar-item">
          <span class="tag is-info is-medium is-rounded">
            {{score}}
          </span>
        </div>
      </div>
      <div class="navbar-end">
        <!-- navbar items -->
        <div class="navbar-item">
          <a class="button is-dark">
            <span class="icon is-large">
              <i class="fa fa-times fa-lg"></i>
            </span>
          </a>
        </div>
      </div>
  </nav>
</template>

<script>
export default {
  name: 'titlebar',

  props: [
    'name',
    'score'
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