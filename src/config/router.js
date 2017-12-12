/*
* @Author: allen100309
* @Date:   2017-12-09 11:52:02
* @Last Modified by:   allen100309
* @Last Modified time: 2017-12-11 21:56:52
*/

import Vue from 'vue';
//导入路由模块
import VueRouter from 'vue-router';
//注册使用路由组件
Vue.use(VueRouter);
//导入ajax请求模块
// import VueResource from 'vue-resource';
// 导入axios模块
import Axios from 'axios';
//注册使用VueResource
// Vue.use(VueResource);

// 把post发送的数据，转换成文本的形式在进行发送；
// import qs from 'qs';
// Axios.interceptors.request.use((config) => {
//     config.data = qs.stringify(config.data);
//     return config;
// }, function(error) {
//     return Promise.reject(error);
// });



//引入创建的组件
import '../../statics/css/mui.min.css';
import '../../statics/css/icons-extra.css';

import Home from '../components/Home/home.vue';
import Member from '../components/Member/member.vue';
import Shopcar from '../components/Shopcar/shopcar.vue';
import Search from '../components/Search/search.vue';
import News from '../components/SecondDir/News/new.vue';
import NewsDetail from '../components/SecondDir/News/newsDetail.vue';
import Share from '../components/SecondDir/Share/share.vue';
import ShareDetail from '../components/SecondDir/Share/shareDetail.vue';
import Buy from '../components/SecondDir/Buy/buy.vue';
import BuyDetail from '../components/SecondDir/Buy/buyDetail.vue';
import buyDesc from '../components/SecondDir/Buy/desc.vue';
import buyComment from '../components/SecondDir/Buy/comment.vue';
import Feedback from '../components/SecondDir/Feedback/feedback.vue';
import Video from '../components/SecondDir/Video/video.vue';
import Contact from '../components/SecondDir/Contact/contact.vue';

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
    { name:'home' , path: '/home', meta:{ title:'首页' }, component: Home },
    { name:'member' , path: '/member', meta:{ title:'会员中心' }, component: Member },
    { name:'shopcar' , path: '/shopcar', meta:{ title:'购物车' }, component: Shopcar },
    { name:'search' , path: '/search', meta:{ title:'搜索' }, component: Search },
    { name:'news' , path: '/news', meta:{ title:'热点新闻' }, component: News },
    { name:'newsDetail' , path: '/news/:id', meta:{ title:'新闻详情' }, component: NewsDetail },
    { name:'share' , path: '/share', meta:{ title:'图片分享' }, component: Share },
    { name:'shares' , path: '/share/:id', meta:{ title:'图片分享' }, component: Share },
    { name:'shareDetail' , path: '/shareDetail/:id', meta:{ title:'图片分享详情' }, component: ShareDetail },
    { name:'buy' , path: '/buy', meta:{ title:'购物页面' }, component: Buy },
    { name:'buyDetail' , path: '/buy/:id', meta:{ title:'购物详情页面' }, component: BuyDetail },
    { name:'buyDesc' , path: '/buy/desc/:id', meta:{ title:'商品详情页面' }, component: buyDesc },
    { name:'buyComment' , path: '/buy/comment/:id', meta:{ title:'商品详情页面' }, component: buyComment },
    { name:'feedback' , path: '/feedback', meta:{ title:'留言反馈' }, component: Feedback },
    { name:'video' , path: '/video', meta:{ title:'视频分享' }, component: Video },
    { name:'contact' , path: '/contact', meta:{ title:'联系我们' }, component: Contact },
  ]
});
//给Vue原型帮绑上Axios
Vue.prototype.$http = Axios;
Vue.prototype.axios = Axios;
//根据路由地址设置浏览器标题,路由守卫
router.afterEach((to, from, next) => {
  Vue.prototype.titles = to.meta.title;
  document.title = to.meta.title;
})
export default router;