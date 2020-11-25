<template>
  <div class="artist-mv">
    <div class="mv-item" v-for="(item, index) in mvs" :key="index">
      <img :src="item.imgurl" />
      <p>{{ item.name }}</p>
      <span class="play-count"
        ><i class="el-icon-caret-right"></i>{{ item.playCount }}</span
      >
      <span class="mv-time">{{ format(item.duration) }}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { axiosGet } from '@/http/http'
import { formatTime } from '@/methods'
import { useRoute } from 'vue-router'
export default {
  name: 'ArtistMv',
  setup () {
    const state = reactive({
      mvs: []
    })
    const format = (time) => {
      return formatTime(time)
    }
    const route = useRoute()
    onMounted(async () => {
      const { data } = await axiosGet(`/artist/mv?id=${route.query.id}`)
      state.mvs = data.mvs
    })
    return {
      ...toRefs(state),
      format
    }
  }
}
</script>

<style lang="less" scoped>
.artist-mv {
  width: 100%;
  .mv-item {
    position: relative;
    float: left;
    width: 320px;
    margin: 10px 10px 10px 0;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 178px;
    }
    .play-count {
      position: absolute;
      top: 5px;
      right: 5px;
    }
    .mv-time {
      position: absolute;
      right: 5px;
      bottom: 20px;
      font-size: 12px;
    }
  }
}
</style>