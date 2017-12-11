<template>
  <div class="mui-content">
    <mySwipe :api="api"></mySwipe>
    <!-- 六个导航 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4" v-for="itme in menus">
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
  import swipe from '../common/swipe.vue'
  export default {
    data(){
      return {
        menus:[],
        api:'/api/getlunbo'
      }
    },
    created:function(){
      this.getdata();
    },
    methods:{
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
    },
    components:{
      //注册子组件,因为swipe是导入的子组件，所以可以直接这样写
      mySwipe:swipe
    }
  };
</script>
<style type="text/css" media="screen" scoped>
  /*8宫格样式*/
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