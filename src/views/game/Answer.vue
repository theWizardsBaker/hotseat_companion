<template>
  <div class="hero is-medium">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <guess :name="name" :revealed="true">
          <template #text>
            <textarea class="textarea" v-model="answer">
            </textarea>
            <p class="help has-text-grey-light">{{characterCount}}/{{length}}</p>
            <br/>
          </template>
        </guess>
        <div class="actions">
          <div class="field is-grouped is-grouped-centered">
            <div class="control" v-if="lockedIn" @click="unlockAnswer">
              <button class="button is-light">Cancel</button>
            </div>
            <div class="control" v-else @click="lockAnswer">
              <button class="button is-success">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Guess from '@/components/Guess'

export default {
  
  name: 'answer',
  
  components: {
  	Guess,
  },

  props: [
    'name',
  ],

  data () {
    return {
      answer: '',
      length: 100,
      lockedIn: false
    }
  },
  
  computed: {
    characterCount(){
      return this.answer.length
    }
  },

  watch: {
    characterCount(value){
      if(value > this.length){
        this.$set(this, 'answer', this.answer.substring(0,this.length))
      }
    }
  },

  methods: {
    lockAnswer(){
      this.$emit('answer', this.answer)
    },
    unlockAnswer(){

    }
  }
}
</script>

<style scoped lang="scss">
.hero {
  padding: 1.5vw;
  .help {
    text-align: right;
  }
  .actions {
    padding-bottom: 30px;
  }
}
</style>
