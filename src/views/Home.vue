<template>
  <div class="home">
    <HexxagonGame />
  </div>
</template>

<script>
// @ is an alias to /src
import HexxagonGame from '@/components/HexxagonGame.vue'

export default {
  name: 'home',
  components: {
    HexxagonGame
  }
}
</script>
