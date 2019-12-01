<template>
  <g>
    <polygon
      v-bind:data-x="field.x"
      v-bind:data-y="field.y"
      v-bind:points="field.svgPolygon(15, 300, 300)"
      v-bind:class="{ 'not-exsiting-field': field.fieldValue===-1, 'distance1': field.marked===1, 'distance2': field.marked===2}"
      fill="none"
      stroke="black"
    ></polygon>
    <circle
      v-if="field.fieldValue > 0"
      v-bind:class="{ 'player1': field.fieldValue===1, 'player2': field.fieldValue===2 }"
      v-bind:cx="field.cx(15, 300, 300)"
      v-bind:cy="field.cy(15, 300, 300)"
      r="15"
    ></circle>
    <text text-anchor="middle" style="font-size: 0.5em;" v-bind:x="field.cx(15, 300, 300)"
      v-bind:y="field.cy(15, 300, 300)">
    x: {{field.x}}, z: {{field.z}}
    </text>
  </g>
</template>

<script>
export default {
  props: ["field"]
};
</script>

<style>
.distance1 {
    stroke: yellow;
    z-index: 1000;
}

.distance2 {
    stroke: orange;
    z-index: 1000;
}
.not-exsiting-field {
    fill: #000;
}
.player1 {
  fill: #f00;
}
.player2 {
  fill: #00f;
}
</style>