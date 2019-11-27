<template>
  <section>
    <h1>Hexxagon {{game.fields.length}}</h1>
    <!-- <button @click="draw()">Draw map</button> -->
    <svg width="600" height="600">
       <polygon v-bind:data-x="field.x" v-bind:data-y="field.y" v-for="field in game.fields" v-bind:key="field.id" v-bind:points="field.svgPolygon(15, 300, 300)" fill="none" stroke="black"></polygon>
       <!-- <circle v-bind:cx="field.cx(20, 300, 300)" v-bind:cy="field.cy(20, 300, 300)" r="2" stroke="black" stroke-width="1" fill="red" v-for="field in game.fields" v-bind:key="field.id"/> -->
    </svg>
  </section>
</template>

<script>
import HexxagonGame from "../game/HexxagonGame";

export default { 
  data() {
    return {
      game: new HexxagonGame(5)
    };
  },
  methods: {
   
  }
};
</script>

<style>
</style>