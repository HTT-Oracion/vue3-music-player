<template>
  <div class="ablum-wrapper">
    <div class="album-cover">
      <img :src="artist.img1v1Url" />
    </div>
    <div class="songs-list">
      <ul>
        <li>热门50首</li>
        <li class="play"><i class="el-icon-caret-right"></i></li>
        <li>收藏</li>
      </ul>
      <table border="1">
        <tr v-for="(item, index) in hotSongs" :key="index">
          <td>{{ formatindex(index + 1) }}</td>
          <td>{{ item.name }}</td>
          <td>{{ format(item.dt) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router'
import { axiosGet } from '@/http/http'
import { formatTime, formatIndex } from '@/methods'
export default {
  name: 'Album',
  setup () {
    const state = reactive({
      artist: {},
      hotSongs: {}
    })
    const route = useRoute()
    const format = (time) => {
      return formatTime(time)
    }
    const formatindex = (index) => {
      return formatIndex(index)
    }
    onMounted(async () => {
      const { data } = await axiosGet(`/artists?id=${route.query.id}`)
      state.artist = data.artist
      state.hotSongs = data.hotSongs
      console.log(data);
      console.log(state.artist);
      console.log(state.hotSongs);
    })
    return {
      ...toRefs(state),
      format,
      formatindex
    }
  }
}
</script>

<style lang="less" scoped>
.ablum-wrapper {
  display: block;
  float: none;
  overflow: hidden;
  .album-cover {
    float: left;
    margin-right: 50px;
    width: 150px;
    height: 150px;

    background-color: #ccc;
    img {
      width: 100%;
      border-radius: 5px;
    }
  }
  table {
    width: 60%;
    border-color: #666666;
    margin-top: 20px;
    tr:hover {
      background-color: #555;
    }
    tr:nth-child(2n) {
      background-color: #444;
    }
    td {
      line-height: 32px;
    }
    td:nth-child(2):hover {
      cursor: pointer;
      color: #ec4141;
    }
  }
  .songs-list {
    ul {
      overflow: hidden;
      line-height: 20px;
    }
    li {
      float: left;
      margin-right: 10px;
    }
    .play {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      width: 20px;
      border-radius: 50%;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
    }
  }
}
</style>
