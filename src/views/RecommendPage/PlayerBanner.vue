<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item
      v-for="item in bannerList"
      :key="item"
      arrow="hover"
      indicator-position="outside"
    >
      <img :src="item.imageUrl" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
export default {
  name: 'PlayerBanner',
  setup (props) {
    const state = reactive({
      bannerList: []
    })
    const { ctx } = getCurrentInstance()
    onMounted(async () => {
      const data = await ctx.$http.get('/banner')
      state.bannerList = data.data.banners
      // console.log(state.bannerList);
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.el-carousel {
  width: 80%;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>