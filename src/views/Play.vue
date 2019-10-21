<template>
  <div class="gameboard hero is-dark">
    <!-- main navigation and options menu -->
    <navbar :game="game.key" 
            :name="user.name" 
            :score="user.score" 
            >
      <template #bar-end>
        <div class="buttons">
          <button class="button is-dark is-medium" @click="popup.show = true; popup.showMenu = true">
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
    <popup :display="popup.show" @close="popup.show = false; popup.showMenu = false">
      <option-menu :options="game.options" @optionClick="handleOptionClick" v-if="popup.showMenu">
        <template #title>Options</template>
      </option-menu>
      <div class="content" v-else-if="popup.confirmQuit">
        <div class="box has-text-centered" >
          <h3 class="title is-5 has-text-dark">Are you sure you want to quit?</h3>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button class="button is-link">Quit Game</button>
            </div>
            <div class="control">
              <button class="button is-primary" 
                      @click="popup.show = false; popup.showMenu = false">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="popup.reorderPlayers">
        <player-order :players="game.players" />
      </div>
    </popup>

    <!-- game display -->
    <div class="columns is-gapless">
      <div class="column" >
        <!-- question section -->
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
        <!-- answer section -->
        <div class="section">
          <h3 class="title is-4 has-text-centered">Answers</h3>
          <h3 class="subtitle is-4 has-text-centered">Waiting for 3 moreanswers...</h3>
          <answer :name="user.name" />
          <answers :shrink="showScoreBoard"  :select="true"  />
        </div>
      </div>
      <transition name="slide-right">
        <div class="column is-4-desktop is-hidden-touch" v-show="showScoreBoard">
          <score-board :players="game.players" />
        </div>
      </transition>
      <transition name="slide-right">
        <div class="is-hidden-desktop floating-scoreboard" v-show="showScoreBoard">
          <score-board :players="game.players" />
        </div>
      </transition>
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
import Answer from '@/views/game/Answer'
import PlayerOrder from '@/views/game/PlayerOrder'
import OptionMenu from '@/components/OptionMenu'

export default {

  name: 'Play',

  components: {
  	Navbar,
    Popup,
    Titlebar,
    ScoreBoard,
    Questions,
    Question,
    Answer,
    Answers,
    OptionMenu,
    PlayerOrder
  },

  created(){
  },

  data () {
    return {

      showScoreBoard: true,
      showQuestion: true,
      questionHistory: false,

      popup: {
        show: false,
        showMenu: false,
        confirmQuit: false,
        reorderPlayers: false,
      },

      user: {
        id: 'xfxxxfs',
        name: "Justin",
        score: 23,
        inHotseat: false,
        gameHost: true
      },

      game: {
        
        key: 'XOW23G',
        
        reveal: false,

        stages: ['enterHotSeat', 'answerQuestion', 'vote', 'reveal'],

        players: [
          {
            id: 2,
            name: 'Justin',
            score: 20,
            roundPoints: 3,
          },
          {
            id: 3,
            name: 'Stephanie',
            score: 26,
            roundPoints: 0,
          },
          {
            id: 4,
            name: 'Carl',
            score: 22,
            roundPoints: 7,
          },
          {
            id: 5,
            name: 'Claire',
            score: 20,
            roundPoints: 3,
          },
          {
            id: 6,
            name: 'Danielle',
            score: 10,
            roundPoints: 4,
          },
          {
            id: 7,
            name: 'Kendra',
            score: 20,
            roundPoints: 2,
          },
        ],

        options: [
          {
            text: 'Toggle Question Display',
            icon: 'fa-eye-slash',
            action: 'hide-questions'
          },
          {
            text: 'Select Player Order',
            icon: 'fa-users',
            action: 'reorder'
          },
          {
            text: 'Quit Game',
            icon: 'fa-times-circle',
            action: 'quit'
          }
        ],

        questions: [
          {
            hotsetPlayer: {
              name: "Justin",
              id: 2,
            },
            text: "Who are you? Who who, who who?",
            answers: [
              {
                player: {
                  name: "Justin",
                  id: 2,
                },
                text: "Me. I am.",
                picks: [
                  2, 3, 4, 5
                ]
              },
            ]
          }
        ]
      }
    }
  },

  computed: {

  },

  methods: {
    handleOptionClick(action){
      console.log(action)
      switch(action){
        case 'hide-questions':
          this.showQuestion = !this.showQuestion
        break;
        case 'reorder':
          this.popup.reorderPlayers = true
          this.popup.showMenu = false
        break;
        case 'quit':
          this.popup.confirmQuit = true
          this.popup.showMenu = false
        break;
      }

    }
  }
}
</script>

<style scoped lang="scss">

  @import "@/styles/slide-right-animation.scss";

  .slide-right-enter-active {
    animation: slideInRight .5s;
  }
  .slide-right-leave-active {
    animation: slideOutRight .4s reverse;
  }


  .gameboard {
    min-height: 100vh;
    min-width: 100vw;
    margin-bottom: 50px;
    position: relative;

    .section {
      padding: 1vw;
    }

    .button{
      &.is-centered {
        margin: auto;
      }
    }

    .columns {
      position: relative;

      .floating-scoreboard {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
      }
    }
  }



</style>
