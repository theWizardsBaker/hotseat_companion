<template>
  <div class="box">
    <div class="answer-outline">
      <div class="content">
        <strong>?</strong>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
        </p>
      </div>
      <div class="answer-brand">
        answer
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'player-guess',
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
  .box {
    padding: 8px;

    .answer-outline {
      padding: 10px;
      border: 2px solid grey;
      border-radius: 5px;
      position: relative;
      min-height: 100px;
    }

    .answer-brand {
      position: absolute;
      bottom: -5px;
      right: -5px;
      background-color: white;
      padding-right: 5px;
      padding-left: 5px;
      font-weight: bold;
      font-variant: small-caps;
    }
  }
</style>