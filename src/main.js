import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
//header.vue  搜索 上传 icon 
import './assets/icon/header/iconfont';
//header search
import './assets/icon/header/sousou.js';
//slideshow
import './assets/icon/slideshow/iconfont.js';
//recommend
import './assets/icon/recommend/iconfont.js';
//lgoin
import './assets/icon/login/iconfont.js';

createApp(App).use(store).use(router).use(ElementPlus).mount('#app');

// import axios from 'axios';
// axios.defaults.withCredentials=true;//让ajax携带cookie
// Vue.prototype.$axios = axios;