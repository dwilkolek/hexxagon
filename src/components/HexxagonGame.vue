<template>
  <section>
    <h1>Hexxagon {{game.fields.length}}</h1>
    <div id="game">
      <svg height="100%" width="100%">
        <HexField
          v-on:click.native="move(field)"
          v-for="field in game.fields"
          v-bind:key="field.id"
          v-bind:field="field"
          v-bind:size="size"
          v-bind:playerMoving="playerMoving"
        />
      </svg>
    </div>
  </section>
</template>

<script>
import HexxagonGame from "../game/HexxagonGame";
import HexField from "./HexField";

export default {
  components: {
    HexField
  },
  data() {
    let game = new HexxagonGame();
    return {
      game,
      size: 300,
      playerMoving: game.playerMoving,
      movingEnabled: true
    };
  },
  methods: {
    async move(field) {
      if (this.movingEnabled) {
        this.movingEnabled = false;
        if (this.game.selectedField && field.marked) {
          await this.game.moveToMarked(field);
          if (!this.game.isGameFinished()) {
            await this.game.makeCPUMove();
            this.movingEnabled = true;
          }
          if (this.game.isGameFinished()) {
            setTimeout(() => {
              const points = this.game.getPoints();
              alert(
                `Game is finished. ${
                  points.winner == null ? "DRAW!" : "PLAYER " + points.winner
                } WINS!`
              );
              this.game = new HexxagonGame();
            }, 1000);
          }
        } else {
          this.game.markMoveOptionsForField(field);
          this.movingEnabled = true;
        }
      }
    },
    resize() {
      this.size = document.getElementById("game").offsetWidth;
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.resize);

      //Init
      this.resize();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>

<style>
#game {
  margin: 0 auto;
  height: 80vw;
  width: 80vw;
  max-height: 80vh;
  max-width: 80vh;
  background: #444;
}
</style>