<template>
  <PlayerHeader />
  <div>
    <PlayerAside />
    <PlayerContent />
  </div>
  <!-- <PlayerBtn /> -->
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerAside from './PlayerAside'
import PlayerContent from './PlayerContent'
// import PlayerBtn from './PlayerBtn'
export default {
  name: 'MyMusic',
  components: {
    PlayerHeader,
    PlayerAside,
    PlayerContent,
    // PlayerBtn
  }
}
</script>
 
<style lang="less" scoped>
</style>