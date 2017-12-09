/*
* @Author: sunduo
* @Date:   2017-12-06 16:54:07
* @Last Modified by:   allen100309
* @Last Modified time: 2017-12-09 00:17:29
*/
import Vue from 'vue';
//导入路由模块
import VueRouter from 'vue-router';
// 导入配置模块
import Config from './config.js';
//导入ajax请求模块
// import VueResource from 'vue-resource';
// 导入axios模块
import Axios from 'axios';
//导入moment模块
import Moment from 'moment';
// 按需引入部分组件
import { Swipe, SwipeItem } from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//注册使用VueResource
// Vue.use(VueResource);
// 把post发送的数据，转换成json的形式在进行发送
import qs from 'qs';
Axios.interceptors.request.use((config) => {
    config.data = qs.stringify(config.data);
    return config;
}, function(error) {
    return Promise.reject(error);
});
//注册使用路由组件
Vue.use(VueRouter);

//注册全局过滤器
Vue.filter('fmtdate',(val,fmt)=>{
  return Moment(val).format(fmt)
})
//引入创建的组件
import '../statics/css/mui.min.css';
import '../statics/css/icons-extra.css';

import Home from './components/Home/home.vue';
import Member from './components/Member/member.vue';
import Shopcar from './components/Shopcar/shopcar.vue';
import Search from './components/Search/search.vue';
import News from './components/SecondDir/News/new.vue';
import NewsDetail from './components/SecondDir/News/newsDetail.vue';
import Share from './components/SecondDir/Share/share.vue';
import Buy from './components/SecondDir/Buy/buy.vue';
import Feedback from './components/SecondDir/Feedback/feedback.vue';
import Video from './components/SecondDir/Video/video.vue';
import Contact from './components/SecondDir/Contact/contact.vue';


import app from './app.vue';

Vue.prototype.$http = Axios;
/*let vm = new Vue({
  el:'#app',
  render:function(creat){
    return creat(app);
  }
});
简写*/
// 创建路由
//创建组件
const router = new VueRouter({
  linkActiveClass: 'mui-active',
  //routes // （缩写）相当于 routes: routes
  // 定义路由
  routes:[
    { path: '/', redirect: '/home' },
    { name:'home' , path: '/home', component: Home },
    { name:'member' , path: '/member', component: Member },
    { name:'shopcar' , path: '/shopcar', component: Shopcar },
    { name:'search' , path: '/search', component: Search },
    { name:'news' , path: '/news', component: News },
    { name:'newsDetail' , path: '/news/:id', component: NewsDetail },
    { name:'share' , path: '/share', component: Share },
    { name:'buy' , path: '/buy', component: Buy },
    { name:'feedback' , path: '/feedback', component: Feedback },
    { name:'video' , path: '/video', component: Video },
    { name:'contact' , path: '/contact', component: Contact },
  ]
});

let vm = new Vue({
  el:'#app',
  data:{
    //因为是单页面应用，所以可以使用data把config共享出去
    config:Config.api_url
  },
  router,
  // render:(c)=>{return c(app)};//可以简写成下边的写法
  // render:(c)=> c(app),//或者这样
  render:c=> c(app),//render会回调传回一个createElement函数，去创建我们的虚拟dom；这个函数是vue提供给我们的；
})
//根据路由地址设置浏览器标题
router.afterEach((to, from, next) => {
  document.title = to.name;
})