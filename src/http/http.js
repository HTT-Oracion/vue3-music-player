import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

export function axiosGet (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// export function axiosPost (options) {
//   return new Promise((resolve, reject) => {
//     axios.post(options.url, {})
//   })
// }
