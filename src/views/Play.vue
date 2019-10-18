<template>
  <div class="gameboard hero is-dark">
    <!-- main navigation and options menu -->
    <navbar :game="game.key" 
            :name="user.name" 
            :score="user.score" 
            >
      <template #bar-end>
        <div class="buttons">
          <button class="button is-dark is-medium" @click="showMenu = true">
            <span class="icon">
              <i class="fa fa-gear" aria-hidden="true"></i>
            </span>
          </button>
          <button class="button is-dark is-medium" @click="showScoreBoard = !showScoreBoard">
            <span class="icon">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </span>
          </button>
        </div>
      </template>
    </navbar>

    <!-- show the game actions -->
    <titlebar />

    <!-- pop up helper -->
    <popup :display="showMenu" @close="showMenu = false">
      <article class="panel is-success">
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fa fa-circle-thin" aria-hidden="true"></i>
          </span>
          Show Question
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fa fa-circle-thin" aria-hidden="true"></i>
          </span>
          Show
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fa fa-circle-thin" aria-hidden="true"></i>
          </span>
          Change Player Order
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fa fa-circle-thin" aria-hidden="true"></i>
          </span>
          Quit Game
        </a>
      </article>
    </popup>

    <!-- game display -->
    <div class="columns is-gapless">
      <div class="column" :class="[ showScoreBoard ? 'is-8-desktop' : 'is-12-desktop' ]">
        <div class="section">
          <template v-if="showQuestion">
            <h3 class="title is-4 has-text-centered">Question</h3>
            <div v-show="!questionHistory">
              <question :reveal="game.reveal"/>
              <button class="button is-small is-rounded is-outlined is-light is-flex is-centered"
                      @click="questionHistory = !questionHistory">
                <span class="icon">
                  <i class="fa fa-arrow-left"></i>
                </span>
                <span>
                  Previous Questions
                </span>
              </button>
            </div>
            <div v-show="questionHistory">
              <questions/>
              <br/>
              <div>
                <button class="button is-light is-small is-rounded is-outlined is-flex is-centered"
                        @click="questionHistory = !questionHistory">
                  <span class="icon">
                    <i class="fa fa-close"></i>
                  </span>
                  <span>
                    Back to Question
                  </span>
                </button>
              </div>
            </div>
          </template>
        </div>
        <div class="section">
          <h3 class="title is-4 has-text-centered">Answers</h3>
          <answers />
        </div>
      </div>
      <div class="column is-4-desktop is-4-widescreen is-hidden-touch" v-show="showScoreBoard">
        <score-board />
      </div>
    </div>
  </div>
</template>

<script>
import ScoreBoard from '@/components/ScoreBoard'
import Popup from '@/components/Popup'
import Navbar from '@/components/Navbar'
import Titlebar from '@/components/Titlebar'
import Questions from '@/views/game/Questions'
import Question from '@/views/game/Question'
import Answers from '@/views/game/Answers'

export default {

  name: 'Play',

  components: {
  	Navbar,
    Popup,
    Titlebar,
    ScoreBoard,
    Questions,
    Question,
    Answers
  },

  data () {
    return {
      showMenu: false,
      showScoreBoard: true,
      showQuestion: true,
      questionHistory: false,
      stages: ['selectHotseat', 'answerQuestion', 'vote', 'reveal'],
      inHotseat: false,

      user: {
        name: "Justin",
        score: 23,
      },

      game: {
        key: 'XOW23G',
        reveal: false
      }
    }
  },

  methods: {

  }
}
</script>

<style scoped lang="scss">
  .gameboard {
    min-height: 100vh;
    min-width: 100vw;
    margin-bottom: 50px;
    .section {
      padding: 1.5em;
    }

    .button{
      &.is-centered {
        margin: auto;
      }
    }
  }
</style>
