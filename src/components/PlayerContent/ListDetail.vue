<template>
  <div class="list-detail">
    <div class="list-img">
      <img :src="listData.coverImgUrl" alt="" />
    </div>
    <div class="list-info">
      <div class="list-title">{{ listData.name }}</div>
      <div class="user">
        <div class="user-avatar">
          <img :src="listData.creator.avatarUrl" alt="" />
        </div>
        <span class="user-name">{{ listData.creator.nickname }}</span>
        <span class="create-time">{{ listData.creator.createTime }} 创建</span>
      </div>
      <div class="tags">
        标签:
        <template v-for="(item, index) in listData.tags" :key="index">
          <span>{{ item }}</span>
        </template>
      </div>
      <span class="songs-num">歌曲: {{ listData.trackCount }}</span>
      <span class="play-count"> 播放: {{ format(listData.playCount) }}</span>
      <div class="list-desc">简介: {{ listData.description }}</div>
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
        评论 {{ format(listData.commentCount) }}
      </li>
      <li :class="[currentIndex === 2 ? 'active' : '']" @click="switchList(2)">
        收藏者
      </li>
    </ul>
    <!-- 歌曲列表区 -->
    <div class="main-content" v-if="currentIndex === 0">
      <!-- 歌曲列表 -->
      <!-- <el-table :data="listData.tracks" stripe style="width: 100%">
        <el-table-column prop="name" label="音乐标题" width="180">
          <template v-slot="{ row }">
            <span @click="toMusic(row.id)">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手" width="180">
        </el-table-column>
        <el-table-column prop="al.name" label="专辑"> </el-table-column>
        <el-table-column prop="address" label="时长"> </el-table-column>
      </el-table> -->
      <songs-table :data="listData.tracks"></songs-table>
    </div>
    <!-- 评论区 -->
    <div class="comment" v-if="currentIndex === 1">
      <div class="hot-comment">
        <!-- <h1>精彩评论</h1> -->
        <div
          class="ht-com-item"
          v-for="(item, index) in commentList"
          :key="index"
        >
          <div class="comment-avatar">
            <img :src="item.user.avatarUrl" />
          </div>
          <span class="user-name">{{ item.user.nickname }}:</span>
          <span class="user-comment">{{ item.content }}</span>
          <span class="comment-data">{{ formatdate(item.time) }}</span>
        </div>
      </div>
      <div class="newest-comment">
        <!-- <h4>最新评论 {{}}</h4> -->
        <div class="nw-com-item"></div>
      </div>
    </div>
    <!-- 收藏者 -->
    <div class="subscriber" v-if="currentIndex === 2">
      <div
        class="subscriber-item"
        v-for="(item, index) in listData.subscribers"
        :key="index"
      >
        <img :src="item.avatarUrl" />
        <span class="name"
          >{{ item.nickname }}
          <el-tag v-if="item.gender === 1">♂</el-tag>
          <el-tag v-else type="danger">♀</el-tag>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import SongsTable from '@/components/Songs/SongsTable'
import { useRoute } from 'vue-router'
import { toList } from '@/methods'
import { axiosGet } from '@/http/http'
import { formatCount, formatData } from '@/methods'
export default {
  name: 'ListDetail',
  components: {
    SongsTable
  },
  setup () {
    const state = reactive({
      //歌单总数据
      listData: {
        //创建者相关信息
        creator: {
        },
        //歌曲列表
        tracks: [],
        //收藏者列表
        subscribers: []
      },
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
    const format = (number) => {
      return formatCount(number)
    }
    const formatdate = (time) => {
      return formatData(time)
    }
    const route = useRoute()
    onMounted(async () => {
      const { data } = await axiosGet(`/playlist/detail?id=${route.query.id}`)
      const cmData = await axiosGet(`/comment/playlist?id=${route.query.id}`)
      state.listData = data.playlist
      state.commentList = cmData.data.comments
      console.log(state.listData);
    })
    return {
      ...toRefs(state),
      switchList,
      toMusic,
      format,
      formatdate
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
    span {
      display: inline-block;
      margin: 0 5px;
      width: 50px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.4);
      border: 0;
      border-radius: 4px;
      cursor: pointer;
    }
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
    background-color: #333;
    .hot-comment {
      margin: 20px;
      padding: 15px;
      .ht-com-item {
        width: 100%;
        margin: 15px 0;
        border-bottom: 1px solid #666;
        vertical-align: middle;
        .user-name {
          display: inline-block;
          font-size: 14px;
          margin: 10px;
          color: steelblue;
        }
        .user-comment {
          display: inline-block;
        }
        .comment-data {
          display: block;
          font-size: 13px;
          margin-left: 50px;
          color: #f6f6f6;
        }
      }
    }
    // .newest-comment {
    //   margin: 20px;
    //   .nw-com-item {
    //     width: 100%;
    //     height: 70px;
    //     border-bottom: 1px solid #f6f6f6;
    //   }
    // }
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
    padding: 20px 20px;
    overflow: hidden;
    .subscriber-item {
      display: flex;
      float: left;
      margin: 10px 0;
      width: 25%;
      height: 92px;
      align-items: center;
      img {
        float: left;
        height: 100%;
        border-radius: 50%;
      }
      .name {
        display: inline-block;
        margin-left: 20px;
        font-size: 14px;
        cursor: pointer;
      }
      .name:hover {
        color: #ec4141;
      }
    }
  }
}
</style>