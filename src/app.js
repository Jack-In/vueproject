/*
* @Author: sunduo
* @Date:   2017-12-06 16:54:07
* @Last Modified by:   allen100309
* @Last Modified time: 2017-12-09 20:29:53
*/
import Vue from 'vue';

// 导入全局插件模块
import './config/plugins';

// 导入配置模块
import Config from './config.js';


//导入全局过滤器
import './config/filters'

//导入全局路由
import router from './config/router'


//导入父组件
import app from './app.vue';
//实例化Vue对象
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
  created:function(){
    // 添加请求拦截器
    this.$http.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      // this.$indicator.open('加载中...');
      return config;
    }.bind(this), function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

  // 添加响应拦截器
  this.$http.interceptors.response.use(function (response) {
      // this.$indicator.close();
      return response;
    }.bind(this), function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }
})
//根据路由地址设置浏览器标题
router.afterEach((to, from, next) => {
  document.title = to.name;
})