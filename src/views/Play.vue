<template>
  <div class="gameboard hero is-dark">
    <div v-if="loaded">
      <!-- main navigation and options menu -->
      <navbar :game="gameKey"
              :name="player.name"
              :score="player.score"
              :inHotSeat="$store.getters.inHotSeat"
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
              <div id="question" class="section" v-show="!display.hideQuestion">
                  <h3 class="title is-4 has-text-centered">Question</h3>

                  <div v-show="!display.questionHistory">
                    <!-- question -->
                    <question :reveal="display.revealQuestion"
                              :answer="display.answerQuestion"
                              :question="currentQuestion"
                              @answered="submitQuestion"
                              />
                    <div v-show="questions.length > 1">
                      <!-- show previous -->
                      <button class="button is-small is-rounded is-outlined is-light is-flex is-centered"
                              @click="display.questionHistory = !display.questionHistory"
                              >
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
                    <questions :questions="questions"/>
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
              <div id="answer" class="section">
                <br/>
                <div v-show="display.answer">
                  <h3 class="title is-4 has-text-centered">
                    Answers
                  </h3>
                  <!-- answer to write -->
                  <answer :name="player.name"
                          v-show="display.answer"
                          @answer="submitAnswer"/>

                  <!-- all users's answers -->
                  <answers-completed :shrink="display.scoreboard"
                                     :answers="answers"
                                     :player="player"
                                     :players="players"
                                     :answersRemaining="answersRemaining"
                                     v-show="display.answers"
                                     />

                  <!-- all users's answers -->
                  <answers :shrink="display.scoreboard"
                           :select="!hotSeatPlayer"
                           :answers="answers"
                           :player="player"
                           :players="players"
                           @selected="submitSelectedAnswer"
                           v-show="display.selectAnswers || display.revealAnswers"
                           />

                </div>
                <div class="is-mobile">
                  <br />
                </div>
              </div>

            </div>
            <!-- scoreboards -->
            <transition name="slide-right">
              <div class="column is-4-desktop is-hidden-touch" v-show="display.scoreboard">
                <score-board :players="allPlayers" />
              </div>
            </transition>
            <transition name="slide-right">
              <div class="is-hidden-desktop floating-scoreboard" v-show="display.scoreboard">
                <score-board :players="allPlayers" />
              </div>
            </transition>
          </div>
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
import AnswersCompleted from '@/views/game/AnswersCompleted'
import Answers from '@/views/game/Answers'
import Answer from '@/views/game/Answer'
import PlayerOrder from '@/views/game/PlayerOrder'
import OptionMenu from '@/components/OptionMenu'
import ConfirmBox from '@/components/ConfirmBox'

import { mapState, mapGetters, mapActions } from 'vuex'

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
    AnswersCompleted,
    OptionMenu,
    PlayerOrder,
    ConfirmBox
  },

  created(){

    if(this.isHost){
      // if we're the host, just load
      this.loaded = true
    } else {
      // if we're the client, ask the host what the state is
      this.$socket.client.emit('request_game_state', { gameKey: this.gameKey })
      // this.$store.dispatch('request_game_state').then(() => {
      //     this.loaded = true
      // }).catch( (e) => {
      //   console.log(e)
      // })
    }
    // get room info
    // this.$http.get('/room', {
    //   params: {
    //     gameKey: this.gameKey
    //   }
    // }).then((response) => {
    //   if(response.data.room){
    //     // get historical room data
    //     this.loaded = true
    //   } else {
    //     this.quitGame()
    //   }
    // }).catch((error) => {
    //   console.log(error, 'error')
    //   // this.$router.replace("/")
    // })

  },

  data () {
    return {

      loaded: false,

      display: {
        scoreboard: false,
        hideQuestion: false,
        questionHistory: false,

        answerQuestion: false,
        revealQuestion: false,

        answer: false,
        answers: false,

        selectAnswers: false,
        revealAnswers: false,
      },

      popup: {
        show: false,
        scoring: false,
        showMenu: false,
        confirmQuit: false,
        reorderPlayers: false,
      },

      game: {

        round: 0,

        stage: 0,

        stages: [
          {
            name: 'enterHotSeat',
            directions: {
              title: "Draw",
              text: "Player in the Hot Seat selects and reads a card"
            },
            display: {},
            scrollTo: 'question'
          },
          {
            name: 'answerQuestion',
            directions: {
              title: "Answer",
              text: "Write an answer to the Hot Seat card from the perspective of the player in the Hot Seat"
            },
            display: {
              // answerQuestion: false,
              answer: true,
              answers: true
            },
            scrollTo: 'answer'
          },
          {
            name: 'vote',
            directions: {
              title: "Guess",
              text: "Select which answer you think was written by the player in the Hot Seat"
            },
            display: {
              answer: true,
              answers: true,
              selectAnswers: true
            },
          },
          {
            name: 'reveal',
            directions: {
              title: "Reveal",
              text: "The player in the Hot Seat's answer is revealed"
            },
            display: {
              answer: true,
              revealAnswers: true,
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

      }
    }
  },

  watch: {

    currentStage(){
      // hide all display elements
      console.log(this.currentStage.display)
      this.$set(this.display, 'answer', !!this.currentStage.display.answer)
      this.$set(this.display, 'answers', !!this.currentStage.display.answers)
      this.$set(this.display, 'waiting', !!this.currentStage.display.waiting)
      this.$set(this.display, 'answerQuestion', !!this.currentStage.display.answerQuestion)
      this.$set(this.display, 'revealAnswers', !!this.currentStage.display.revealAnswers)
      this.$set(this.display, 'selectAnswers', !!this.currentStage.display.selectAnswers)
      // if we have a param
      if(!!this.currentStage.scrollTo){
        console.log(this.$refs[this.currentStage.scrollTo])
        // scroll that thing into view
        // document.getElementById(this.currentStage.scrollTo).scrollIntoView(true)
        let elm = document.getElementById(this.currentStage.scrollTo)
        // document.getElementById('app').scrollTop = elm.offsetTop
        window.scroll({ top: elm.offsetTop + 50, behavior: 'smooth' })
      }
    },

    loaded: {
      immediate: true,
      handler(val){
        // if(!val){
          this.$emit('toggleLoading')
        // }
      }
    },

    connected: {
      immediate: true,
      handler(val){
        if(!val){
          this.$router.replace({ path: '/' })
        }
      }
    },

    '$store.getters.inHotSeat': {
      immediate: true,
      handler(val){
        this.delay(800).then(() => {
          this.display.revealQuestion = val
          this.display.answerQuestion = val
        })
      }
    },

    'game.stage': {
      immediate: true,
      handler(val){
        if(val === 0){
          this.activatePlayers()
        }
      }
    },

    answersRemaining(val){
      if(val === 0){
        this.advanceStage()
      }
    },

    synced: {
      immediate: true,
      handler(val, val2){
        if(!this.loaded && val){
          this.loaded = val
        }
      }
    },


  },

  computed: {
    // get the states from the store
    ...mapState({
      user: ({user}) => user,
      connected: ({game}) => game.connected,
      questions: ({questions}) => questions,
    }),

    ...mapGetters({
      synced: 'synced',
      isHost: 'isHost',
      player: 'player',
      answers: 'answers',
      gameKey: 'gameKey',
      players: 'activePlayers',
      allPlayers: 'allPlayers',
      hotSeatPlayer: 'hotSeatPlayer',
      currentQuestion: 'currentQuestion',
      answersRemaining: 'answersRemaining',
      answerPicksRemaining: 'answerPicksRemaining',
    }),

    playerInfo(){
      if(!!this.player){
        return {
          name: this.player.name,
          userId: this.player.userId
        }
      }
    },

    currentStage(){
      return this.game.stages[this.game.stage]
    }

  },

  sockets: {

    question_added(){
      this.display.revealQuestion = true
      this.advanceStage()
    },

  },

  methods: {

    ...mapActions([
      'activatePlayers',
      'incrementRound',
      'incrementStage',
      'quitGame',
    ]),

    submitSelectedAnswer(answer){
      this.$socket.client.emit('select_answer', {
        gameKey: this.gameKey,
        answer: answer,
        player: this.playerInfo
      })
    },

    submitAnswer(answerText){
      let answer = {
        hotSeatPlayer: this.playerInfo,
        answer: answerText
      }
      this.$socket.client.emit('add_answer', { gameKey: this.gameKey, answer: answer })
    },

    submitQuestion(question){

      this.$set(question, 'hotSeatPlayer', this.playerInfo)

      // this.$set(question, 'answers', [])

      this.$socket.client.emit('add_question', { gameKey: this.gameKey, question: question })

    },

    advanceStage(){
      let len = this.game.stages.length

      if(this.game.stage === len - 1){
        this.incrementRound()
        this.game.stage = 0
      } else {
        this.incrementStage()
        this.game.stage++
      }
    },

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

    // quitGame(){
    //   this.quitGame()
    //   // this.$router.replace({ path: '/' })
    // }

  }
}
</script>

<style scoped lang="scss">

  @import "@/styles/slide-right-animation.scss";
  @import "~vuejs-noty/dist/vuejs-noty.css";

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
