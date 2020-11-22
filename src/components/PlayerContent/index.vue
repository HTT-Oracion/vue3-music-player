<template>
  <div class="player-content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'PlayerContent'
}
</script>

<style lang="less" scoped>
.player-content {
  margin-left: 15vw;
  padding: 10px 0;
  width: 85vw;
  height: 100%;
  background: #333;
  box-sizing: border-box;
}
</style>