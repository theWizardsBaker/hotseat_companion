<template>
  <div class="gameboard hero is-dark">
    <!-- main navigation and options menu -->
    <navbar :game="game.key" 
            :name="user.name" 
            :score="user.score" 
            >
      <template #bar-end>
        <div class="buttons">
          <button class="button is-medium" 
                  :class="{ 'is-light': popup.show, 'is-dark': !popup.show }" 
                  @click="popup.show = true; popup.showMenu = true">
            <span class="icon">
              <i class="fa fa-gear" aria-hidden="true"></i>
            </span>
          </button>
          <button class="button is-medium"
                  :class="{ 'is-light': display.scoreboard, 'is-dark': !display.scoreboard }" 
                  @click="display.scoreboard = !display.scoreboard">
            <span class="icon">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </span>
          </button>
        </div>
      </template>
    </navbar>

    <!-- show the game actions -->
    <titlebar :title="currentStage.directions.title" 
              :text="currentStage.directions.text" />

    <!-- pop up helper -->
    <popup :display="popup.show" @close="popup.show = false; popup.showMenu = false">
      <!-- options menu -->
      <option-menu :options="game.options"
                   @optionClick="handleOptionClick"
                   v-if="popup.showMenu">
        <template #title>Options</template>
      </option-menu>
      <!-- confirm quit -->
      <div class="content" v-else-if="popup.confirmQuit">
        <confirm-box @confirm="quitGame"
                     @cancel="popup.show = false; popup.confirmQuit = false">
          Are you sure you want to quit?
        </confirm-box>
      </div>
      <!-- player order -->
      <div v-else-if="popup.reorderPlayers">
        <player-order :players="game.players"
                      @complete="popup.show = false; popup.reorderPlayers = false"/>
      </div>
      <div v-else-if="popup.scoring" class="section has-text-black">
        <div class="panel">
          <p class="panel-heading">
            Scoring
          </p>
          <div class="panel-block">
            <table class="table is-fullwidth is-striped">
              <tr>
                <th>1 point</th>
                <td>Each player that guesses your answer</td>
              </tr>
              <tr>
                <th>2 points</th>
                <td>Guessing the player in the Hot Seat’s answer correctly</td>
              </tr>
              <tr>
                <th>4 points</th>
                <td>Responding with the same answer as the player in the Hot Seat</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </popup>

    <!-- the gameboard -->
    <div class="game">
      <div class="game-display">
        <!-- game display -->
        <div class="columns">
          <div class="column" >
            <!-- question section -->
            <div class="section" v-show="!display.hideQuestion">
                <h3 class="title is-4 has-text-centered">Question</h3>
                <div v-show="!display.questionHistory">
                  <!-- question -->
                  <question :reveal="display.revealQuestion" :answer="user.inHotseat" />
                  <div>
                    <!-- show previous -->
                    <button class="button is-small is-rounded is-outlined is-light is-flex is-centered"
                            @click="display.questionHistory = !display.questionHistory">
                      <span class="icon">
                        <i class="fa fa-arrow-left"></i>
                      </span>
                      <span>
                        Previous Questions
                      </span>
                    </button>
                  </div>
                </div>
                <div v-show="display.questionHistory">
                  <!-- questions -->
                  <questions/>
                  <br/>
                  <div>
                    <button class="button is-light is-small is-rounded is-outlined is-flex is-centered"
                            @click="display.questionHistory = !display.questionHistory">
                      <span class="icon">
                        <i class="fa fa-close"></i>
                      </span>
                      <span>
                        Back to Question
                      </span>
                    </button>
                  </div>
                </div>
            </div>
            <!-- answer section -->
            <div class="section">
              <br/>
              <div v-show="display.answer">
                <h3 class="title is-4 has-text-centered">Answer</h3>
                <h3 class="subtitle is-5 has-text-centered">Waiting for 3 more answers...</h3>
                <answer :name="user.name" v-show="display.answer" />
              </div>
              <div v-show="display.answers">
                <h3 class="title is-4 has-text-centered">Answers</h3>
                <h3 class="subtitle is-5 has-text-centered">Waiting for 3 more answers...</h3>
                <answers :shrink="display.scoreboard"  :select="true"/>
              </div>
            </div>
          </div>
          <!-- scoreboards -->
          <transition name="slide-right">
            <div class="column is-4-desktop is-hidden-touch" v-show="display.scoreboard">
              <score-board :players="game.players" />
            </div>
          </transition>
          <transition name="slide-right">
            <div class="is-hidden-desktop floating-scoreboard" v-show="display.scoreboard">
              <score-board :players="game.players" />
            </div>
          </transition>
        </div>
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
import Answer from '@/views/game/Answer'
import PlayerOrder from '@/views/game/PlayerOrder'
import OptionMenu from '@/components/OptionMenu'
import ConfirmBox from '@/components/ConfirmBox'

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
    PlayerOrder,
    ConfirmBox
  },

  created(){
  },

  data () {
    return {

      display: {
        scoreboard: true,
        hideQuestion: false,
        questionHistory: false,
        revealQuestion: false,
        answer: false,
        answers: false,
        selectAnswers: false,
      },

      popup: {
        show: false,
        scoring: false,
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

        stage: 0,

        stages: [
          {
            name: 'enterHotSeat',
            directions: {
              title: "Draw",
              text: "Player in the Hot Seat selects and reads a card"
            },
            display: {}
          },
          {
            name: 'answerQuestion',
            directions: {
              title: "Answer",
              text: "Write an answer to the Hot Seat card from the perspective of the player in the Hot Seat"
            },
            display: {
              answer: true
            }
          }, 
          {
            name: 'vote',
            directions: {
              title: "Guess",
              text: "Select which answer you think was written by the player in the Hot Seat"
            },
            display: {
              answers: true,
              selectAnswers: true
            }
          }, 
          {
            name: 'reveal',
            directions: {
              title: "Reveal",
              text: "The player in the Hot Seat's answer is revealed"
            },
            display: {
              answers: true,
              selectAnswers: false
            }
          },
          {
            name: 'score',
            directions: {
              title: "Score",
              text: "Recieve points for your answer"
            },
            display: {
              answers: true
            }
          }
        ],

        players: [
          {
            id: 2,
            name: 'Justin',
            score: 20,
            roundPoints: 3,
            order: 0
          },
          {
            id: 3,
            name: 'Stephanie',
            score: 26,
            roundPoints: 0,
            order: 1
          },
          {
            id: 4,
            name: 'Carl',
            score: 22,
            roundPoints: 7,
            order: 2
          },
          {
            id: 5,
            name: 'Claire',
            score: 20,
            roundPoints: 3,
            order: 3
          },
          {
            id: 6,
            name: 'Danielle',
            score: 10,
            roundPoints: 4,
            order: 4
          },
          {
            id: 7,
            name: 'Kendra',
            score: 20,
            roundPoints: 2,
            order: 5
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
            text: 'Scoring Points',
            icon: 'fa-sort-numeric-asc',
            action: 'scoring'
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

  watch: {
    currentStage(){
      // hide all display elements
      this.$set(this.display, 'answer', !!this.currentStage.display.answer)
      this.$set(this.display, 'answers', !!this.currentStage.display.answers)
      this.$set(this.display, 'waiting', !!this.currentStage.display.waiting)
    }
  },

  computed: {
    orderedPlayers() {
      return this.game.players.sort((a, b) => {
        return a.order - b.order
      })
    },
    isHost(){
      return false
    },
    hotSeatPlayer(){
      return this.game.players[2]
    },
    currentStage(){
      return this.game.stages[this.game.stage]
    }
  },

  methods: {

    handleOptionClick(action){
      // set point maximum
      switch(action){
        case 'hide-questions':
          this.display.hideQuestion = !this.display.hideQuestion
        break;
        case 'reorder':
          this.popup.reorderPlayers = true
          this.popup.showMenu = false
        break;
        case 'quit':
          this.popup.confirmQuit = true
          this.popup.showMenu = false
        break;
        case 'scoring':
          this.popup.scoring = true
          this.popup.showMenu = false
        break;
      }

    },

    quitGame(){

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

  .panel-block {
    background-color: white;
    th {
      white-space: nowrap;
    }
  }


  .gameboard {
    /*min-width: 100vw;*/
    position: relative;
    padding: 0;
    display: flex;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;

    .game {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
      .game-display {

        .section {
          padding: 2em;
          padding-bottom: 5em;
          &:first-child {
            padding-bottom: 4em;
          }
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
            top: 10px;
            left: 0;
          }
        }
      }
    }
  }



</style>
