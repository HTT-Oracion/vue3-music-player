import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './http/http'
import '@/assets/css/global.css'
import '@/assets/css/reset.css'
const app = createApp(App)
app.config.globalProperties.$http = axios
app
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
