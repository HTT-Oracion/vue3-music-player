<template>
  <div class="player-btn">
    <div class="play-music">
      <audio src="" controls></audio>
    </div>
  </div>
  <!-- <Aplayer
    autoplay
    :music="{
      title: 'secret base~君がくれたもの~',
      artist: 'Silent Siren',
      src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
      pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
    }"
  /> -->
</template>

<script>
// import Aplayer from 'vue-aplayer'
export default {
  name: 'PlayerBtn',
  components: {
    // Aplayer
  }
}
</script>

<style lang="less" scoped>
.player-btn {
  position: fixed;
  width: 100vw;
  height: 80px;
  bottom: 0;
  background-color: #ccc;
  z-index: 99;
  .play-music {
    width: 80%;
    margin: 10px auto;
    audio {
      width: 100%;
      background-color: transparent;
    }
  }
}
</style>