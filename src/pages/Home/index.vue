<script setup>
import History from "./components/History/index.vue";
import Chat from "./components/Chat/index.vue";
</script>

<template>
  <div class="home">
    <History></History>
    <Chat></Chat>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  height: 100%;
  color: white;
}
</style>