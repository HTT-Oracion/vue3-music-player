<template>
  <div class="recommend-wrapper">
    <div class="list-title">
      <h1>推荐歌单</h1>
      <!-- <i class="el-icon-arrow-right"></i> -->
    </div>
    <div class="list-body clearfix">
      <div
        class="list-item"
        v-for="(item, index) in recommendList"
        :key="item.id"
        @click="tolist(item.id)"
        @mousemove="showList(index)"
        @mouseleave="hideList"
      >
        <img :src="item.picUrl" alt="item.copywriter" />
        <span class="list-desc" v-if="index === listIndex">{{
          item.copywriter
        }}</span>
        <span class="list-name">{{ item.name }}</span>
        <div class="list-icon" v-if="index === listIndex">
          <i class="el-icon-caret-right"></i>
        </div>
      </div>
    </div>
  </div>
  <!-- 独家放送 -->
  <!-- broadcast -->
  <div class="recommend-wrapper">
    <div class="broad-title">
      <h1>独家放送</h1>
    </div>
    <div class="broad-body">
      <div
        class="broad-item"
        v-for="item in broadcast"
        :key="item.id"
        @click="toBroad(item.id)"
      >
        <div class="play-icon">
          <i class="el-icon-caret-right"></i>
        </div>
        <img :src="item.picUrl" :alt="item.id" />
        <span class="broad-desc">{{ item.name }}</span>
      </div>
    </div>
  </div>
  <!-- 最新音乐 -->
  <!-- newestSongs -->
  <div class="recommend-wrapper">
    <div class="newest-title">
      <h1>最新音乐</h1>
    </div>
    <div class="newest-body">
      <div class="newest-item" v-for="item in newestSongs" :key="item.id">
        <img :src="item.picUrl" :alt="item.id" />
        <!-- <div class="img"></div> -->
        <span class="newest-name">{{ item.name }}</span>
        <div class="ns-play-icon">
          <i class="el-icon-caret-right"></i>
        </div>
      </div>
    </div>
  </div>
  <!-- 推荐MV -->
  <!-- recommend-mv -->
  <div class="recommend-wrapper">
    <div class="recomMv-title">
      <h1>推荐MV</h1>
    </div>
    <div class="recomMv-body">
      <div class="recomMv-item" v-for="item in recommendMvs" :key="item.id">
        <img :src="item.cover" alt="item.name" @click="toMv(item.id)" />
        <span class="mv-name">{{ item.name }}</span>
        <span class="mv-artist" @click="toArtist(item.artistId)">{{
          item.artistName
        }}</span>
        <span class="mv-playcount">
          <i class="el-icon-caret-right"></i>
          {{ item.playCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
// import { toList } from '@/methods'
import { useRouter } from 'vue-router'
export default {
  name: 'Recommend',
  setup () {
    const state = reactive({
      recommendList: [],
      broadcast: [],
      newestSongs: [],
      recommendMvs: [],
      listIndex: 999
    })
    const router = useRouter()
    const { ctx } = getCurrentInstance()
    //前往歌单
    const tolist = (id) => {
      // const data = toList(id)
      // console.log(data);
      router.push({ path: '/ListDetail', query: { id } })
      // router.push('/ListDetail')
    }
    const toMv = (id) => {

    }
    const toArtist = (id) => {

    }
    //独家放送
    const toBroad = (id) => {

    }
    const showList = (index) => {
      state.listIndex = index
    }
    const hideList = () => {
      state.listIndex = 999
    }
    //挂载时获取数据
    onMounted(async () => {
      const rdata = await ctx.$http.get('/personalized?limit=10')
      const brdata = await ctx.$http.get('/personalized/privatecontent')
      const nsdata = await ctx.$http.get('/personalized/newsong?limit=12')
      const mvdata = await ctx.$http.get('/mv/all?limit=4')
      state.recommendList = rdata.data.result
      state.broadcast = brdata.data.result
      state.newestSongs = nsdata.data.result
      state.recommendMvs = mvdata.data.data
      // console.log(nsdata);
      console.log(state.recommendMvs);
    })
    return {
      ...toRefs(state),
      tolist,
      toBroad,
      toArtist,
      toMv,
      showList,
      hideList
    }
  }
}
</script>

<style lang="less" scoped>
/* 推荐歌单 */
.recommend-wrapper {
  color: #fff;
  width: 80%;
  margin: 20px auto;
  transition: all 0.4s linear;
  h1 {
    font-size: 24px;
    text-align: center;
  }
  .list-title {
    h1 {
      text-align: center;
      font-size: 24px;
      i {
        margin-left: -5px;
      }
    }
  }
  .list-body {
    margin-top: 20px;
    width: 100%;
    overflow: hidden;
    .list-item {
      position: relative;
      float: left;
      width: 205px;
      height: 250px;
      margin: 0 0 10px 15px;
      border-radius: 10px;
      overflow: hidden;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 205px;
      }
      .list-desc {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 2px;
        height: 20px;
        width: 205px;
        line-height: 20px;
        max-width: 205px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: rgba(0, 0, 0, 0.4);
      }
      .list-icon {
        position: absolute;
        width: 24px;
        height: 24px;
        right: 5px;
        bottom: 48px;
        line-height: 26px;
        text-align: center;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        i {
          font-size: 20px;
          color: #ec4141;
        }
      }
    }
  }
  /* 独家放送 */

  .broad-body {
    margin-top: 20px;
    width: 100%;
    overflow: hidden;
    .broad-item {
      float: left;
      position: relative;
      width: 355px;
      height: 230px;
      margin-right: 15px;
      cursor: pointer;
      img {
        width: 100%;
        height: 170px;
      }
      .broad-desc {
        font-size: 14px;
      }
      .play-icon {
        position: absolute;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        top: 5px;
        left: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
      }
    }
    .broad-item:nth-child(3) {
      margin: 0;
    }
  }
  /* 独家放送end */
  /* 最新音乐 */
  .newest-body {
    margin-top: 20px;
    width: 100%;
    overflow: hidden;
    .newest-item {
      position: relative;
      float: left;
      width: 30%;
      height: 48px;
      margin: 10px 10px 0 0;
      border-radius: 10px;
      position: relative;
      cursor: pointer;
      img {
        float: left;
        height: 100%;
      }
      .img {
        float: left;
        width: 48px;
        height: 48px;
        background-color: #ccc;
      }
      .newest-name {
        display: inline-block;
        margin: 8px 0 0 8px;
        font-size: 14px;
      }
      .ns-play-icon {
        position: absolute;
        top: 50%;
        left: 16px;
        transform: translateY(-50%);
        height: 20px;
        line-height: 20px;
        text-align: center;
        width: 20px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        color: #ec4141;
      }
    }
    .newest-item:hover {
      background-color: rgba(255, 255, 255, 0.7);
      color: #f6f6f6;
    }
    // .newest-item:nth-child(3n){
    //   margin-right: 0;
    // }
  }
  /* 最新音乐end */
  /* 推荐MV */
  .recomMv-item {
    position: relative;
    float: left;
    margin-left: 15px;
    width: 260px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
    }
    .mv-name {
      display: block;
      margin: 6px 0;
      max-width: 260px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 14px;
      cursor: pointer;
    }
    .mv-artist {
      font-size: 13px;
      color: #f6f6f6;
      cursor: pointer;
    }
    .mv-playcount {
      position: absolute;
      padding-right: 2px;
      right: 0px;
      top: 4px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      width: 80px;
      font-size: 14px;
      color: #ec4141;
    }
  }
  .recomMv-item:nth-child(1) {
    margin-left: 0;
  }
  /* 推荐MV end */
}

.clearfix:after {
  content: ''; /*内容就是一个英文.*/
  display: block; /*加入的这个元素转化为块级元素*/
  clear: both; /*清除左右两边的浮动*/
}
</style>