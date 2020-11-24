import router from '@/router'
import { axiosGet } from '@/http/http'
export const toList = async (id) => {
  const data = await axiosGet(`/playlist/detail?id=${id}`)
  return data.data
}
export const toMusic = (id) => {
  // router.push('')
}
export const toMv = (id) => {

}
export const toListDetail = (id) => {
  router.push({ path: '/ListDetail', query: { id } })
}
export const toArtistDetail = (id) => {
  router.push({ path: '/ArtistDetail', query: { id } })
  console.log(id);
}
export const toSearch = (keywords) => {

}

export const formatCount = (number) => {
  if (number > 10000) {
    return `${parseFloat((number / 10000).toFixed(2))} 万`
  } else {
    return number
  }
}
export const formatData = (time) => {
  var datetime = new Date();
  datetime.setTime(time);
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
  return year + "年" + month + "月" + date + "日" + hour + ":" + minute + ":" + second;
}
export const formatTime = (time) => {
  var datetime = new Date();
  datetime.setTime(time);
  var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
  return minute + ":" + second;
}