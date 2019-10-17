<template>
<nav class="panel">
  <div class="panel-block">
    <template v-for="player in players">
      <div class="panel-row" :class="{ 'has-hotseat': player.hotseat }">
        <div class="panel-section hotseat">
            <span class="icon is-large is-danger" v-show="player.hotseat">
              <i class="fa fa-fire fa-lg"></i>
            </span>
        </div>
        <div class="panel-section">
          {{player.name}}
        </div>
        <div class="panel-section">
          <span>
            {{player.score}}
          </span>
          <span class="tag is-success is-small score-change" v-show="player.scoreChange > 0">
            <span class="icon is-medium is-danger">
              <i class="fa fa-plus fa-sm"></i>
            </span>
            <span>
             <b>{{player.scoreChange}}</b>
            </span>
          </span>
        </div>
      </div>
    </template>
  </div>
</nav>
</template>

<script>
export default {
  name: 'scoreboard',
  data () {
    return {
      players: [
        {
          hotseat: false,
          name: 'Stephanie',
          score: 30,
          scoreChange: 3
        },
        {
          hotseat: false,
          name: 'Carl',
          score: 30,
          scoreChange: 0
        },
        {
          hotseat: true,
          name: 'Claire',
          score: 30,
          scoreChange: 0
        },
        {
          hotseat: false,
          name: 'Trevor',
          score: 30,
          scoreChange: 0
        },
        {
          hotseat: false,
          name: 'Daniell',
          score: 30,
          scoreChange: 0
        },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.panel {
  .panel-block {
    display: table;
    width: 100%;

    .panel-row {
      display: table-row;
      & + .has-hotseat {
        background-color: lightgrey;
      }
      .panel-section {
        align-items: center;
        color: #363636;
        display: flex;
        justify-content: flex-start;
        padding: .5em .75em;
        display: table-cell;
      }
      &:not(:last-child) .panel-section {
        border-bottom: 1px solid #dbdbdb;
      }
    }

  }


  .panel-block, .panel-heading, .panel-tabs {
      border-bottom: 1px solid #dbdbdb;
      border-left: 1px solid #dbdbdb;
      border-right: 1px solid #dbdbdb;
  }
}

.score-change {
  padding: 0px 10px 0px 15px;
  line-height: .7em;
  i {
    font-size: .8em;
  }
  b {
    font-size: 1.2em;
  }
}
</style>