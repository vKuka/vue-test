<template>
  <div id="app">
    <TheTimer class="app-timer"/>
    <BaseUserTable/>
  </div>
</template>

<script>
import BaseUserTable from './components/BaseUserTable.vue'
import TheTimer from './components/TheTimer.vue'

export default {
  name: 'App',
  components: {
    BaseUserTable,
    TheTimer,
  }
}
</script>

<style lang="scss">
#app {
  max-width: 800px;
  margin: 0 auto;
}

.app-timer {
  margin-bottom: 50px;
}
</style>
