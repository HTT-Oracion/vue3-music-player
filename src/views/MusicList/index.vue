<template>
  <!-- banner -->
  <!-- <div class="music-banner"></div>  -->
  <!-- 分类tag -->
  <div class="shorttag-list">
    <!-- 所有分类的card -->
    <div class="alltags-card" v-if="allTagShow" @click="allTag()">
      <div class="card-header">
        <span>全部歌单</span>
        <i class="el-icon-close" @click="showAllTags"></i>
      </div>
      <div class="card-body"></div>
    </div>
    <div class="all-tag" @click="showAllTags">
      全部
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="short-tags">
      <div
        class="stag-item"
        v-for="item in shortTagList"
        :key="item"
        @click="changeCat(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
  <!-- 分类下的歌单 -->
  <div class="tag-music-list">
    <div
      class="list-item"
      v-for="(item, index) in musicList"
      :key="item.coverImgId"
      @mouseover="showList(index)"
      @mouseleave="hideList"
      @click="toList(item.id)"
    >
      <img :src="item.coverImgUrl" />
      <span class="list-name">{{ item.name }}</span>
      <span class="list-playcount">
        <i class="el-icon-caret-right"></i>
        {{ format(item.playCount) }}
      </span>
      <div class="play-btn" v-if="index === currentListIndex">
        <i class="el-icon-caret-right"></i>
      </div>
    </div>
  </div>
  <!-- <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="50"
    layout="prev, pager, next"
    :total="total"
    :pager-count="9"
    background
  >
  </el-pagination> -->
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { formatCount } from '@/methods'
export default {
  name: 'MusicList',
  setup () {
    const store = useStore()
    const router = useRouter()
    const shortTagList = store.state.shortTagList
    const { ctx } = getCurrentInstance()
    const state = reactive({
      currentListIndex: 999,
      musicList: [],
      tagList: [],
      //标签为全部的列表  
      allList: [],
      cat: '华语',
      allTagShow: false,
      //初始页
      // currentPage: 1,
      // //总数
      // total: 500,
      // //偏移量
      // // offset: 49 * 50
    })

    //显示列表的播放按钮
    const showList = (index) => {
      state.currentListIndex = index
    }
    const hideList = () => {
      state.currentListIndex = 999
    }
    const format = (number) => {
      return formatCount(number)
    }
    //切换分类
    const changeCat = (cat) => {
      state.cat = cat
      console.log(state.cat);
    }
    const toList = (id) => {
      router.push({ path: '/ListDetail', query: { id } })
    }
    //改变offset
    // const getOffset = () => {
    //   state.offset = (state.total / 50 - state.currentPage) * 50
    // }
    const getMusicList = async (cat) => {
      const data = await ctx.$http.get(`/top/playlist?cat=${cat}&limit=50`) //&offset=${state.offset}
      state.musicList = data.data.playlists
      console.log(state.musicList);
    }
    //显示所有分类
    const showAllTags = (e) => {
      state.allTagShow = !state.allTagShow
    }
    const allTag = () => {
      getMusicList("全部")
      state.allTagShow = false
    }
    // const handleSizeChange = () => {

    // }
    // const handleCurrentChange = (currentPage) => {
    //   state.currentPage = currentPage
    //   // console.log(currentPage);
    // }
    onMounted(async () => {
      getMusicList(state.cat)
    })
    watch(() =>
      state.cat
      , () => {
        getMusicList(state.cat)
        // getOffset()
      })
    return {
      ...toRefs(state),
      format,
      changeCat,
      shortTagList,
      showAllTags,
      showList,
      hideList,
      allTag,
      toList
      // handleCurrentChange
    }
  }
}
</script>

<style lang="less" scoped>
/* banner */
.music-banner {
  width: 80%;
  height: 170px;
  margin: 20px auto;
  border-radius: 10px;
  background-color: #ccc;
}
/* tag列表 （少） */
.shorttag-list {
  position: relative;
  width: 80%;
  height: 30px;
  margin: 0 auto;
  .all-tag {
    float: left;
    width: 100px;
    height: 30px;
    padding-left: 10px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    border: 1px solid #fff;
    box-sizing: border-box;
    cursor: pointer;
  }
  .all-tag:hover {
    background-color: #fff;
    border-color: #ec4141;
    color: #ec4141;
  }
  .short-tags {
    float: right;
    .stag-item {
      float: left;
      margin: 10px;
      font-size: 14px;
      cursor: pointer;
    }
    .stag-item:hover {
      color: #ec4141;
    }
    // .stag-item:last-child {
    //   margin-right: 5px;
    // }
  }
}
/*  分类下的歌单 */
.tag-music-list {
  width: 80%;
  margin: 15px auto;
  overflow: hidden;
  .list-item {
    position: relative;
    float: left;
    width: 205px;
    height: 256px;
    margin: 10px 15px 10px 15px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    box-sizing: border-box;
    img {
      width: 100%;
    }
    .list-name {
      display: block;
      margin-top: 8px;
    }
    .list-playcount {
      position: absolute;
      right: 0;
      top: 0;
      display: block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 13px;
    }
    .play-btn {
      position: absolute;
      right: 4px;
      bottom: 54px;
      height: 42px;
      width: 42px;
      border-radius: 50%;
      text-align: center;
      line-height: 42px;
      font-size: 24px;
      color: #ec4141;
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
}
.el-pagination {
  width: 250px;
  margin: 20px auto;
}
.alltags-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 748px;
  height: 600px;
  background-color: #fff;
  z-index: 99;
  .card-header {
    position: relative;
    height: 54px;
    border-bottom: 1px solid #ccc;
    span {
      display: inline-block;
      margin: 10px 0 0 15px;
      width: 84px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      font-size: 13px;
      border: none;
      border-radius: 24px;
      color: #ec4141;
      background-color: #fdf5f5;
      cursor: pointer;
    }
    span:hover {
      color: #ccc;
    }
    i {
      position: absolute;
      right: 20px;
      top: 20px;
      color: #333;
      cursor: pointer;
    }
  }
}
/*  */
</style>