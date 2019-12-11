<template>
  <g v-bind:class="{'enabled': field.marked > 0 || playerMoving == field.fieldValue}">
    <polygon
      v-bind:data-x="field.x"
      v-bind:data-y="field.y"
      v-bind:points="field.svgPolygon(fieldSize, offsetSize, offsetSize)"
      v-bind:class="{ 'not-exsiting-field': field.fieldValue===-1, 'distance1': field.marked===1, 'distance2': field.marked===2}"
      fill="none"
      stroke="black"
    ></polygon>
    <circle
      v-if="field.fieldValue > 0"
      v-bind:class="{ 'player1': field.fieldValue===1, 'player2': field.fieldValue===2 }"
      v-bind:cx="field.cx(fieldSize, offsetSize, offsetSize)"
      v-bind:cy="field.cy(fieldSize, offsetSize, offsetSize)"
      v-bind:r="fieldSize"
    ></circle>
  </g>
</template>

<script>
export default {
  props: ["field", "size", "playerMoving"],
  data() {
    return {
      fieldSize: this.size / 6,
      offsetSize: this.size
    };
  },
  watch: {
    size: function(newVal, oldVal) {
      this.fieldSize = newVal / 40;
      this.offsetSize = newVal / 2;
    }
  }
};
</script>

<style>
polygon {
  fill: rgb(230, 230, 230);
}

.enabled {
  cursor: pointer;
}
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