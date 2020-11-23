import { axiosGet } from '@/http/http'
export const toList = async (id) => {
  const data = await axiosGet(`/playlist/detail?id=${id}`)
  return data.data
}
export const toMusic = (id) => {
  axiosGet()
}
export const toMv = (id) => {

}
export const toListDetail = () => {

}
export const toArtist = () => {

}
export const toSearch = (keywords) => {

}