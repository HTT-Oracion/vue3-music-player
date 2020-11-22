<template>
  <player-banner></player-banner>
  <Recommend />
</template>

<script>
import PlayerBanner from './PlayerBanner'
import Recommend from './Recommend'
export default {
  name: 'RecommendPage',
  components: {
    PlayerBanner,
    Recommend
  }
}
</script>

<style lang="less" scoped>
</style>