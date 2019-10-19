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

    </popup>

    <!-- game display -->
    <div class="columns is-gapless">
      <div class="column" >
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
          <h3 class="subtitle is-4 has-text-centered">Waiting for 3 answers...</h3>
          <answers />
        </div>
      </div>
      <div class="column is-4-desktop is-hidden-touch" v-show="showScoreBoard">
        <score-board :players="game.players" />
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

      user: {
        id: 'xfxxxfs',
        name: "Justin",
        score: 23,
        inHotseat: false,
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
            text: 'Show Question',
            type: 'toggle',
            action: 'toggleQestion'
          },
          {
            text: 'Change Player Order',
            type: 'button',
            aciton: 'selectPlayerOrder',
          },
          {
            text: 'Quit Game',
            type: 'button',
            action: 'quitGame'
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
    generateId(){
      let number = Math.random()
      return number.toString(36).substr(2, 9);
    }
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
