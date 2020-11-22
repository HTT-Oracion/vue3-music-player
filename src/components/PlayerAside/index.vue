<template>
  <section class="player-aside">
    <el-avatar :size="60" src="https://empty">
      <img
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
      />
    </el-avatar>
    <div class="songs-video">
      <el-link type="info" :underline="false" icon="el-icon-headset"
        >我的歌单</el-link
      >
      <el-link type="info" :underline="false" icon="el-icon-star-off"
        >我的收藏</el-link
      >
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.player-aside {
  position: fixed;
  float: left;
  width: 15vw;
  height: 100vh;
  background-color: #333;
  color: #fff;
  .el-avatar {
    position: absolute;
    left: 40px;
    top: 0;
  }
  .songs-video {
    margin-top: 75px;
    .el-link {
      display: block;
      width: 100px;
      height: 30px;
      font-size: 16px;
      line-height: 30px;
      margin-left: 25px;
      margin-top: 5px;
      color: #fff;
    }
    .el-link:hover {
      border-bottom: 2px solid #ec4141;
    }
  }
}
</style>