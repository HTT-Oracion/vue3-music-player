<template>
  <div class="list-detail">
    <div class="list-img">
      <img :src="listData.coverImgUrl" alt="" />
    </div>
    <div class="list-info">
      <div class="list-title">{{ listData.name }}</div>
      <div class="user">
        <div class="user-avatar">
          <img :src="avatarData.avatarUrl" alt="" />
        </div>
        <span class="user-name">{{ avatarData.nickname }}</span>
        <span class="create-time">{{ listData.createTime }} 创建</span>
      </div>
      <div class="tags">标签:</div>
      <span class="songs-num">歌曲:{{ listData.trackCount }}</span>
      <span class="play-count">播放:{{ listData.playCount }}</span>
      <div class="list-desc">简介:{{ listData.description }}</div>
    </div>
  </div>
  <!-- 列表区域 -->
  <div class="list-wrapper">
    <!-- 选项卡 -->
    <ul>
      <li :class="[currentIndex === 0 ? 'active' : '']" @click="switchList(0)">
        歌曲列表
      </li>
      <li :class="[currentIndex === 1 ? 'active' : '']" @click="switchList(1)">
        评论 {{ listData.commentCount }}
      </li>
      <li :class="[currentIndex === 2 ? 'active' : '']" @click="switchList(2)">
        收藏者
      </li>
    </ul>
    <!-- 歌曲列表区 -->
    <div class="main-content" v-if="currentIndex === 0">
      <!-- 歌曲列表 -->
      <el-table :data="musicList" stripe style="width: 100%">
        <el-table-column prop="name" label="音乐标题" width="180">
          <template v-slot="{ row }">
            <span @click="toMusic(row.id)">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手" width="180">
        </el-table-column>
        <el-table-column prop="al.name" label="专辑"> </el-table-column>
        <el-table-column prop="address" label="时长"> </el-table-column>
      </el-table>
    </div>
    <!-- 评论区 -->
    <div class="comment" v-if="currentIndex === 1">
      <div class="hot-comment">
        <h4>精彩评论</h4>
        <div class="ht-com-item">
          <div class="comment-avatar">
            <img src="" alt="" />
          </div>
          <span class="user-name">用户</span>
          <span class="user-comment">用户的评论</span>
          <span class="comment-data">2020/11/23</span>
        </div>
      </div>
      <div class="newest-comment">
        <h4>最新评论 {{}}</h4>
        <div class="nw-com-item"></div>
      </div>
    </div>
    <!-- 收藏者 -->
    <div class="subscriber" v-if="currentIndex === 2">subscriber</div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { toList } from '@/methods'
import { axiosGet } from '@/http/http'
export default {
  name: 'ListDetail',
  setup () {
    const state = reactive({
      //总数据
      listData: {},
      //用户信息
      avatarData: {},
      //歌曲列表
      musicList: [],
      //歌手信息
      artistInfo: [],
      // 切换选项卡
      currentIndex: 0,
      commentList: []
      // playlist: {}
    })
    //test
    const switchList = (index) => {
      state.currentIndex = index
    }
    const toMusic = (id) => {

    }
    const route = useRoute()
    onMounted(async () => {
      const { data } = await axiosGet(`/playlist/detail?id=${route.query.id}`)
      const cmData = await axiosGet(`/comment/playlist?id=${route.query.id}`)
      state.listData = data.playlist
      state.avatarData = state.listData.creator
      state.musicList = state.listData.tracks
      state.commentList = cmData.data.comments
      console.log(state.commentList);
    })
    return {
      ...toRefs(state),
      switchList
    }
  }
}
</script>

<style lang="less" scoped>
.list-detail {
  width: 80%;
  margin: 10px auto;
  overflow: hidden;
  .list-img {
    float: left;
    width: 184px;
    height: 184px;
    border-radius: 8px;
    background-color: #ccc;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .list-info {
    float: left;
    margin-left: 15px;
    overflow: hidden;
    .list-title {
      font-size: 24px;
    }
  }
  .user {
    margin-top: 5px;
    width: 100%;
    height: 24px;
    line-height: 24px;
    vertical-align: middle;
    .user-avatar {
      float: left;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #ccc;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .user-name {
      float: left;
      font-size: 13px;
      margin: 0 5px;
      color: #ccc;
    }
    .create-time {
      float: left;
      font-size: 13px;
    }
  }
  .tags {
    font-size: 14px;
    margin: 10px 0;
  }
  .songs-num,
  .play-count {
    font-size: 14px;
    margin: 10px 5px 10px 0;
  }
  .list-desc {
    font-size: 14px;
    max-width: 400px;
    margin-top: 10px;
  }
}
.list-wrapper {
  width: 80%;
  margin: 20px auto;
  ul {
    overflow: hidden;
    margin: 10px;
  }
  li {
    float: left;
    padding: 10px 20px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  li.active {
    border-bottom: 2px solid #ec4141;
  }
  li:nth-child(2) {
    margin-left: 15px;
  }
  .main-content {
    width: 100%;
    background-color: #ccc;
  }
  .comment {
    width: 100%;
    background-color: #fff;
    .hot-comment {
      margin: 20px;
      .ht-com-item {
        width: 100%;
        height: 70px;
        color: #ccc;
        border-bottom: 1px solid #f6f6f6;
      }
    }
    .newest-comment {
      margin: 20px;
      .nw-com-item {
        width: 100%;
        height: 70px;
        border-bottom: 1px solid #f6f6f6;
      }
    }
  }

  .comment-avatar {
    float: left;
    height: 42px;
    width: 42px;
    border-radius: 50%;
    background-color: #ccc;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  /* 收藏者 */
  .subscriber {
    width: 100%;
    background: #fff;
  }
}
</style>