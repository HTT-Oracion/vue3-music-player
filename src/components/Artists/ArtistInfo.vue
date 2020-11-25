<template>
  <div class="artist-info">
    <div class="artist-avatar">
      <img :src="cover" />
    </div>
    <div class="artist-info">
      <h2>{{ name }}</h2>
      <!-- 收藏 -->
      <span class="name">{{ originName }}</span>
      <span>单曲数：{{ songsNum }}</span>
      <span>专辑数：{{ albumsNum }}</span>
      <span>mv数：{{ mvsNum }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistInfo',
  props: {
    cover: String,
    songsNum: Number,
    albumsNum: Number,
    mvsNum: Number,
    name: {
      type: String,
      default: 'Lia'
    },
    originName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.artist-info {
  overflow: hidden;
  .artist-avatar {
    float: left;
    width: 184px;
    height: 184px;
    overflow: hidden;
    img {
      width: 100%;
      border-radius: 5px;
    }
  }
  .artist-info {
    float: left;
    margin-left: 15px;
    h2 {
      font-size: 20px;
    }
    .name {
      display: block;
      margin: 10px 0;
      color: #f6f6f6;
    }
    span {
      margin-right: 20px;
    }
  }
}
</style>