<template>
  <div class="playing-card">
    <div class="box card-front" v-show="display">
      <div class="playing-card-outline" >
        <h4 class="title is-5 has-text-dark" >
          <slot name="title"></slot>
        </h4>
        <div class="playing-card-content">
          <slot name="content"></slot>
        </div>
        <div class="playing-card-footer">
          <slot name="footer">
          </slot>
        </div>
        <h6 class="playing-card-brand">
          hot seat
        </h6>
      </div>
    </div>
    <div class="box card-backing" v-show="!display">
      <h4 class="title is-5">hot seat</h4>
      <div class="logo">&#128293;</div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'playing-card',

  props: {
    display:{
      type: Boolean,
      default: false
    }
  },

  data () {
    return {

    }
  }

}
</script>

<style scoped lang="scss">
  .playing-card {

    .card-front, .card-backing {
      display: inline-flex;
      align-items: stretch;

      padding: 15px;

      min-height: 350px;
      width: 250px;

      margin-bottom: 20px;

      .playing-card-outline {
        border: 2px solid grey;
        border-radius: 5px;
        position: relative;
        width: 100%;

        .title {
          padding-top: 30px;
          text-align: center;
        }

        .playing-card-brand {
          position: absolute;
          bottom: -10px;
          right: -3px;
          background-color: white;
          padding-left: 10px;
          font-weight: bold;
          font-variant: small-caps;
        }

        .playing-card-content {
          padding: 10px;
        }

        .playing-card-footer{
          padding: 10px;
          margin-top: 25px;
        }
      }
    }

    .card-backing {
      background-color: black;
      font-variant: small-caps;
      position: relative;
      .logo {
        position: absolute;
        bottom: 20px;
        right: 20px;
        font-size: 4em;
      }
    }
  }
</style>