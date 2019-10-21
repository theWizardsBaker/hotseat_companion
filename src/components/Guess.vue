<template>
  <div class="box" :class="{ 'selectable': selectable }" @click="select">
    <div class="selection" v-show="isSelected">
      <span class="icon">
        <i class="fa fa-check-circle fa-3x"></i>
      </span>
    </div>
    <div class="answer-outline">
      <div class="content">
        <h3 class="title is-5 has-text-dark" v-show="revealed">{{name}}</h3>
        <h3 class="title is-6 has-text-dark" v-show="!revealed">
          <span class="tag has-text-dark">
            <i class="fa fa-question-circle fa-2x" aria-hidden="true"></i>
          </span>
        </h3>
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
    'selectable',
    'isSelected'
  ],

  data () {
    return {
    }
  },

  methods: {
    select(){
      if(this.selectable){
        this.$emit('selected')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .box {
    position: relative;
    padding: 8px;
    width: 100%;

    &.selectable:hover {
      cursor: pointer;
    }

    .selection {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 3;

      background-color: #008000b0;
      color: white;

      text-align: center;

      border-radius: 5px;
      padding: 3em;
    }

    .answer-outline {

      .title {
        margin-bottom: 10px;
      }

      padding: 10px;
      border: 2px solid #B8ADAA;
      border-radius: 5px;
      position: relative;
      min-height: 130px;
    }

    .answer-brand {
      color: #B8ADAA;
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