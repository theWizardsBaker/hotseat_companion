<template>
  <div class="box">
    <div class="playing-card-outline">
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
</template>

<script>
export default {
  name: 'playing-Card',
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
  .box {
      .playing-card-outline {
        border: 2px solid grey;
        border-radius: 5px;
        position: relative;
        min-height: 340px;
        width: 250px;

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
</style>