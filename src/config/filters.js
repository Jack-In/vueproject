/*
* @Author: allen100309
* @Date:   2017-12-09 11:51:46
* @Last Modified by:   allen100309
* @Last Modified time: 2017-12-09 11:53:30
*/

import Vue from 'vue';
//导入moment模块
import Moment from 'moment';
//注册全局过滤器
Vue.filter('fmtdate',(val,fmt)=>{
  return Moment(val).format(fmt)
})