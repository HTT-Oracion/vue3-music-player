<template>
  <header class="clearfix">
    <div class="home" @click="home">
      <i class="el-icon-house"></i>
    </div>
    <div class="back" @click="back">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="go" @click="go">
      <i class="el-icon-arrow-right"></i>
    </div>
    <ul>
      <router-link to="/RecomPage">
        <li
          :class="[currentIndex === 0 ? 'active' : '']"
          @click="currentIndex = 0"
        >
          推荐
        </li>
      </router-link>
      <router-link to="/RankPage">
        <li
          :class="[currentIndex === 1 ? 'active' : '']"
          @click="currentIndex = 1"
        >
          排行榜
        </li>
      </router-link>
      <router-link to="/MusicList">
        <li
          :class="[currentIndex === 2 ? 'active' : '']"
          @click="currentIndex = 2"
        >
          歌单
        </li>
      </router-link>
      <router-link to="/ArtistList">
        <li
          :class="[currentIndex === 3 ? 'active' : '']"
          @click="currentIndex = 3"
        >
          歌手
        </li>
      </router-link>
      <router-link to="/NewestMusic">
        <li
          :class="[currentIndex === 4 ? 'active' : '']"
          @click="currentIndex = 4"
        >
          最新音乐
        </li>
      </router-link>
      <li>
        <el-input
          v-model="searchInput"
          placeholder="请输入内容"
          clearable
          prefix-icon="el-icon-search"
          @change="toSearch"
        ></el-input>
      </li>
    </ul>
  </header>
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'PlayerHeader',
  setup () {
    const state = reactive({
      searchInput: '',
      currentIndex: 0,
      searchData: []
    })

    //返回首页
    const home = () => {
      router.push('/')
    }
    //后退
    const back = () => {
      router.back()
    }

    //前进
    const go = () => {
      router.go(-1)
    }
    const router = useRouter()
    const { ctx } = getCurrentInstance()
    const toSearch = async () => {
      if (state.searchInput.trim() !== '') {
        router.push({ path: '/SearchPage', query: { keywords: state.searchInput, type: 1 } })
        state.searchInput = ''
      } else {
        state.searchInput = ''
        return
      }
    }
    return {
      ...toRefs(state),
      toSearch,
      go,
      back,
      home
    }
  }
}
</script>

<style lang="less" scoped>
header {
  position: relative;
  width: 100vw;
  height: 60px;
  background-color: #333;
  color: #fff;
  box-sizing: border-box;
  .back,
  .go,
  .home {
    position: absolute;
    top: 20px;
    width: 26px;
    height: 26px;
    line-height: 26px;
    border-radius: 50%;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }
  .back:hover,
  .go:hover,
  .home:hover {
    background-color: #444;
  }
  .home {
    left: 160px;
  }
  .back {
    left: 200px;
  }
  .go {
    left: 240px;
  }

  ul {
    width: 1400px;
    height: 60px;
    font-size: 18px;
    margin: 0 auto;
    li {
      float: left;
      width: 120px;
      height: 60px;
      line-height: 40px;
      text-align: center;
      padding: 10px 10px;
      margin-left: 60px;
      box-sizing: border-box;
      cursor: pointer;
    }
    // li:nth-child(1) {
    //   margin-left: 100px;
    // }
    li:nth-child(6) {
      margin-left: 30px;
      width: 200px;
    }
    li.active {
      font-size: 22px;
      font-weight: 700;
      border-bottom: 3px solid #ec4141;
    }
  }
  // .el-input {
  // }
}
</style>