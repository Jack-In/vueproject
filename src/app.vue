<template>
  <div class="content">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back" v-if="isShow"></a>
      <h1 class="mui-title">{{titles}}</h1>
    </header>
    <nav class="mui-bar mui-bar-tab">
      <router-link to='/home' class="mui-tab-item">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to='/member' class="mui-tab-item">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to='/shopcar' class="mui-tab-item">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" @upBadge='update'>{{count}}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to='/search' class="mui-tab-item">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
    <!-- 显示路由视图 -->
      <router-view></router-view>
  </div>
</template>
<script>
//导入读取localstorage插件
  import { getData } from './config/localStorageHelp.js'
//导入公共通信组件
  import vmObj from './config/common.js';
  export default {
    data:function(){
      return {
        isShow:false,
        count:0
      }
    },
    created(){
      this.jumpBack(this.$route.name)
      
    },
    mounted(){
      this.getCount();
      this.update()
    },
    watch:{
      //监视路由是否变化
      '$route':function(newValue){
        this.jumpBack(newValue.name)
      }
    },
    methods:{
      back(){
        this.$router.back();
      },
      jumpBack(path){
        let arr = ['home','member','shopcar','search'];
        if(arr.indexOf(path) === -1){
          this.isShow = true;
        }else{
          this.isShow = false;
        }
      },
      update(){

        vmObj.$on('upBadge',(count)=>{
          this.count += count;
        });
        vmObj.$on('upBdage',()=>{
          this.getCount()
        })
      },
      getCount(){
        let arr = getData('goodslist');
        let num = 0;
        arr.forEach((item)=>{
          num += item.count;
        })
        this.count = num;
      }
    }
  };
</script>