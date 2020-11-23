<template>
  <h1 class="search-count">找到首单曲</h1>
  <div class="songs-on-search"></div>
</template>

<script>
import { axiosGet } from '@/http/http'
export default {
  name: 'SongsonSearch',
  props: ['data'],
  setup (props) {
    console.log(props.data);
    return {
      // list
    }
  }
}
</script>

<style>
.search-count {
  font-size: 24px;
}
.songs-on-search {
  margin-top: 100px;
  width: 100%;
  height: 100px;
  background-color: #ccc;
}
</style>