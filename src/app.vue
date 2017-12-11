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
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
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
  export default {
    data:function(){
      return {
        isShow:false
      }
    },
    created(){
      this.jumpBack(this.$route.name)
      console.log(this.$route)
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
        // switch(route.name){
        //   case 'home':
        //     this.title = '首页';
        //     break;
        //   case 'member':
        //     this.title = '会员';
        //     break;
        //   case 'shopcar':
        //     this.title = '购物车';
        //     break;
        //   case 'search':
        //     this.title = '搜索';
        //     break;
        //   case 'news':
        //     this.title = '新闻列表';
        //     break;
        //   case 'newsDetail':
        //     this.title = '新闻详情页面';
        //     break;
        //   case 'share':
        //     this.title = '图片分享页面';
        //     break;
        //   case 'buy':
        //     this.title = '商品购买';
        //     break;
        //   case 'feedback':
        //     this.title = '留言反馈';
        //     break;
        //   case 'video':
        //     this.title = '视频专区';
        //     break;
        //   case 'contact':
        //     this.title = '联系我们';
        //     break;
        // };
        let arr = ['home','member','shopcar','search'];
        if(arr.indexOf(path) === -1){
          this.isShow = true;
        }else{
          this.isShow = false;
        }
      }
    }
  };
</script>