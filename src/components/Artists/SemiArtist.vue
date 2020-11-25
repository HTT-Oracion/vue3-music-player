<template>
  <div class="semiArtist">
    <div
      class="artist-item"
      v-for="(item, index) in artists"
      :key="index"
      @click="toArtist(item.id)"
    >
      <div class="cover">
        <img :src="item.img1v1Url" />
      </div>
      <span class="name">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { axiosGet } from '@/http/http'
import { useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'
export default {
  name: 'SemiArtist',
  setup () {
    const state = reactive({
      artists: []
    })
    const toArtist = (id) => {
      console.log(id);
    }
    const route = useRoute()
    onMounted(async () => {
      const { data } = await axiosGet(`/simi/artist?id=${route.query.id}`)
      state.artists = data.artists
    })
    return {
      ...toRefs(state),
      toArtist
    }
  }
}
</script>

<style lang="less">
.semiArtist {
  width: 100%;
  height: 100%;
  .artist-item {
    float: left;
    margin: 10px 5px 0 5px;
    width: 320px;
    cursor: pointer;
    .cover {
      width: 100%;
      height: 320px;
      img {
        width: 100%;
      }
    }
  }
}
</style>