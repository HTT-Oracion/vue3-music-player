<template>
  <div class="search-page">
    <div class="type-list">
      <div
        v-for="item in searchTypeList"
        :key="item.typeName"
        class="type-item"
        :class="[type === item.type ? 'active' : '']"
        @click="changeType(item.type)"
      >
        {{ item.typeName }}
        <!-- <div class="result-item"><div> -->
        <h1 class="search-info">找到{{ searchData.songCount }} 首单曲</h1>
      </div>
      <!-- <router-view :data="searchData" /> -->
    </div>
    <!-- <el-table :data="searchData.songs" stripe style="width: 100%">
    <el-table-column type="index"> </el-table-column>
    <el-table-column prop="name" label="音乐标题" class="music-name">
      <template #default="row">
        <span @dblclick="toMusic(row.row.id)" class="song-name">{{
          row.row.name
        }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="ar[0].name" label="歌手" width="400">
    </el-table-column>
    <el-table-column prop="al.name" label="专辑" width="300"></el-table-column>
    <el-table-column prop="address" label="时长" width="180"> </el-table-column>
  </el-table> -->
    <songs-table :data="searchData.songs"></songs-table>
  </div>
</template>

<script>
import SongsTable from '@/components/Songs/SongsTable'
import { axiosGet } from '@/http/http'
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import typeList from '@/data/typeList'
export default {
  name: 'SearchPage',
  components: {
    SongsTable
  },
  setup () {
    const state = reactive({
      searchData: {},
      //搜索类型 默认为单曲 1
      type: 1,
      typeUrl: '/SearchPage/SongsList'
    })
    const searchTypeList = typeList
    const baseUrl = '/SearchPage'
    const route = useRoute()
    const router = useRouter()
    /* 改变类型 */
    const changeType = (type) => {
      state.type = type
      // switch (state.type) {
      //   case 1:
      //     state.typeUrl = `${baseUrl}/SongsList`
      //     break;

      //   default:
      //     state.typeUrl = '${baseUrl}/SongsList'
      //     break;
      // }
      // router.push(state.typeUrl)
    }
    const toMusic = (id) => {
      console.log(id);
    }
    onMounted(async () => {
      const data = await axiosGet('/cloudsearch', route.query)
      // = 
      state.searchData = data.data.result;
      console.log(state.searchData);
    })
    return {
      ...toRefs(state),
      searchTypeList,
      changeType,
      toMusic
    }
  }
}
</script>

<style lang="less" scoped>
.search-page {
  width: 80%;
  margin: 0 auto;
  .type-list {
    position: relative;
    width: 100%;
    margin-left: 100px;
    color: #fff;
    .type-item {
      float: left;
      width: 80px;
      height: 50px;
      line-height: 50px;
      margin: 40px 10px 20px 0;
      text-align: center;
      cursor: pointer;
      box-sizing: border-box;
    }
    .active {
      border-bottom: 2px solid #ec4141;
    }
    .search-info {
      position: absolute;
      font-size: 18px;
      top: 0;
      left: 0;
    }
  }
  // .music-name {
  //   max-width: 200px;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  // }
  // .artist-name {
  //   cursor: pointer;
  // }
  // .album-name {
  //   cursor: pointer;
  // }
}
</style>