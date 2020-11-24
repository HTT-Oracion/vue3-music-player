<template>
  <h1>歌手详情页</h1>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  name: 'ArtistDetail',
  setup () {
    const route = useRoute()
    console.log(route.query);
  }
}
</script>

<style>
</style>