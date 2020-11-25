<template>
  <artist-info
    :name="artistDetail.artist.name"
    :cover="artistDetail.artist.cover"
    :songsNum="artistDetail.artist.musicSize"
    :albumsNum="artistDetail.artist.albumSize"
    :mvsNum="artistDetail.videoCount"
  >
  </artist-info>
  <!-- 专辑 mv 歌手详情 相似歌手 -->
  <ul class="select" @click="select">
    <li :class="[currentIndex === 0 ? 'active' : '']" data-index="0">专辑</li>
    <li :class="[currentIndex === 1 ? 'active' : '']" data-index="1">mv</li>
    <li :class="[currentIndex === 2 ? 'active' : '']" data-index="2">
      歌手详情
    </li>
    <li :class="[currentIndex === 3 ? 'active' : '']" data-index="3">
      相似歌手
    </li>
  </ul>
  <keep-alive>
    <div>
      <Album v-if="currentIndex === 0" />
      <artist-mv v-if="currentIndex === 1"></artist-mv>
      <div v-if="currentIndex === 2">
        <h2>
          <strong>{{ artistDetail.artist.name }}</strong
          >简介:
        </h2>
        <p class="brief-desc">{{ artistDetail.artist.briefDesc }}</p>
      </div>
      <semi-artist v-if="currentIndex === 3"></semi-artist>
    </div>
  </keep-alive>
</template>

<script>
import ArtistInfo from './ArtistInfo'
import Album from './Album'
import ArtistMv from './ArtistMv'
import SemiArtist from './SemiArtist'
import { useRoute } from 'vue-router'
import { toArtistDetail } from '@/methods'
import { axiosGet } from '@/http/http'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  name: 'ArtistDetail',
  components: {
    ArtistInfo,
    Album,
    ArtistMv,
    SemiArtist
  },
  setup () {
    const route = useRoute()
    const state = reactive({
      currentIndex: 0,
      artistDetail: {
        artist: {

        }
      },
      artistInfo: {
        artist: {

        }
      },
    })
    const select = (e) => {
      state.currentIndex = parseInt(e.target.getAttribute("data-index"))
    }
    onMounted(async () => {
      const { data } = await axiosGet(`/artist/detail?id=${route.query.id}`)
      const sData = await axiosGet(`/artists?id=${route.query.id}`)
      state.artistDetail = data.data
      state.artistInfo = sData.data
      console.log(state.artistInfo);
    })
    return {
      ...toRefs(state),
      select
    }
  }
}
</script>

<style lang="less" scoped>
.select {
  display: block;
  margin-bottom: 20px;
  overflow: hidden;
  li {
    float: left;
    margin: 10px;
    padding: 5px;
  }
  .active {
    border-bottom: 1px solid #ec4141;
  }
}
.brief-desc {
  padding: 15px 30px 15px 0;
  line-height: 20px;
  letter-spacing: 1px;
  text-indent: 2em;
}
</style>