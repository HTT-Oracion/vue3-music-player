<template>
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
  <table border="1">
    <thead>
      <tr>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{ index + 1 }}</td>
        <td @click="toMusic(item.id)">{{ item.name }}</td>
        <td @click="toArtist(item.ar[0].id)">{{ item.ar[0].name }}</td>
        <td @click="toAlbum(item.al.id)">{{ item.al.name }}</td>
        <td>{{ formattime(item.dt) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { toArtistDetail, formatTime } from '@/methods'
export default {
  name: 'SongsTable',
  props: ['data'],
  setup () {
    const toMusic = (id) => {
      console.log(id);
    }
    const toArtist = (id) => {
      toArtistDetail(id)
    }
    const toAlbum = (id) => {
      console.log(id);
    }
    const formattime = (time) => {
      return formatTime(time)
    }
    return {
      toMusic,
      toArtist,
      toAlbum,
      formattime
    }
  }
}
</script>

<style lang="less" scoped>
table {
  margin: 15px auto;
  background-color: #333;
  width: 100%;
  font-size: 16px;
  thead {
    text-align: left;
    line-height: 25px;
    background-color: #ec4141;
  }
  tbody {
    tr:hover {
      background-color: #555;
    }
  }
  th,
  td {
    padding: 5px;
  }
  td {
    line-height: 30px;
    border: 1px solid #666;
    cursor: pointer;
  }
  tr:nth-child(2n) {
    background-color: #444;
  }
  td:hover {
    color: steelblue;
  }
}
</style>