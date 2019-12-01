<template>
  <section>
    <h1>Hexxagon {{game.fields.length}}</h1>
    <svg width="600" height="600">
      <HexField v-on:click.native="move(field)" v-for="field in game.fields" v-bind:key="field.id" v-bind:field="field" />
    </svg>
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
    return {
      game: new HexxagonGame(5)
    };
  },
  methods: {
    move(field) {
      if (this.game.selectedField && field.marked) {
        this.game.moveToMarked(field);
      } else {
        this.game.markMoveOptionsForField(field);
      }
    }
  }
};
</script>

<style>
</style>