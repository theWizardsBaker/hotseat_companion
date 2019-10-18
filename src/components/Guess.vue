<template>
  <div class="box">
    <div class="answer-outline">
      <div class="content">
        <strong v-if="revealed">{{name}}</strong>
        <strong v-else>?</strong>
        <slot name="text">
          <p>
           {{text}}
          </p>
        </slot>
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

  props: [
    'name',
    'text',
    'revealed',
  ],

  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
  .box {
    padding: 8px;
    min-width: 400px;
    .answer-outline {
      padding: 10px;
      border: 2px solid grey;
      border-radius: 5px;
      position: relative;
      min-height: 130px;
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