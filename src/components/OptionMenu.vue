<template>
  <article class="panel is-primary">
    <p class="panel-heading">
      <slot name="title"></slot>
    </p>
    <a class="panel-block" v-for="option in options" @click="handleClick(option.action)">
      <span class="panel-icon">
        <i class="fa" :class="option.icon" aria-hidden="true"></i>
      </span>
      {{option.text}}
    </a>
  </article>
</template>

<script>

export default {
  
  name: 'option-menu',
  
  props: [
    'options'
  ],

  data () {
    return {

    }
  },
  
  methods: {
    handleClick(action){
      this.$emit('optionClick', action)
    }
  }
}
</script>

<style scoped lang="scss">
.panel {
  margin: 0 4em;
  .panel-heading {
    text-weight: bold;
    text-align:center;
  }
  .panel-block {
    background-color: white;
    &:hover {
      background-color: lightgrey;
    }
  }
}
</style>
