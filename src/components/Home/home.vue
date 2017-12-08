<template>
  <div class="mui-content">
    <!-- 轮播图组件 -->
    <mt-swipe :show-indicators="true">
      <mt-swipe-item v-for="(item,index) in logos" key="index">
        <a :href="item.url">
          <img :src="item.img">
        </a>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 六个导航 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="itme in menus">
        <router-link :to="itme.url" >
          <span class="mui-icon" :class="itme.className"></span>
          <div class="mui-media-body">{{itme.title}}</div>
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        menus:[],
        logos:[]
      }
    },
    created:function(){
      this.getdata();
      this.gtelogo();
    },
    methods:{
      gtelogo(){
        //获取logo
        // this.$http.get(this.$root.config + '/api/getlunbo').then((response) => {
        //   // get body data
        //   this.logo = response.body.message;
        //   console.log(this.logo)
        //   }, (error) => {
        //     console.log(error)
        //   });
        this.$http.get(this.$root.config + '/api/getlunbo')
          .then((res)=>{
            this.logos = res.data.message;
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      getdata(){
        // 获取9宫格
        // this.$http.get(this.$root.config + '/api/getmenus').then((response) => {

        //   // get body data
        //   this.data = response.body.message;
        //   console.log(this.data)
        // }, (error) => {
        //   console.log(error)
        // });
        this.$http.get(this.$root.config + '/api/getmenus')
          .then((res)=>{
            this.menus = res.data.message;
          })
          .catch((err)=>{
            console.log(err)
          })
      }
    }
  };
</script>
<style type="text/css" media="screen" scoped>
  .mint-swipe {
    height: 187px;
  }
  .mint-swipe img {
    width: 100%;
    height: 100%;
  }
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
  }
  .mui-icon{
    width: 50px;
    height: 50px;
    background-size: 50px 50px;
  }
  .icon-news {
    background-image: url('../../../statics/images/menu1.png');
  }
  .icon-share {
    background-image: url('../../../statics/images/menu2.png');
  }
  .icon-buy {
    background-image: url('../../../statics/images/menu3.png');
  }
  .icon-feedback {
    background-image: url('../../../statics/images/menu4.png');
  }
  .icon-video {
    background-image: url('../../../statics/images/menu5.png');
  }
  .icon-contact {
    background-image: url('../../../statics/images/menu6.png');
  }
</style>