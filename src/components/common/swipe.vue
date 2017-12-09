<template>
  <!-- 轮播图组件 -->
  <mt-swipe :show-indicators="true">
    <mt-swipe-item v-for="(item,index) in logos" key="index">
      <a :href="item.url">
        <img :src="item.img">
      </a>
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
  export default {
    data(){
      return {
        logos:[]
      }
    },
    created(){
      this.getlogo();
    },
    //接收父组件传值
    props:['api'],
    methods:{
      getlogo(){
        //获取logo
        // this.$http.get(this.$root.config + '/api/getlunbo').then((response) => {
        //   // get body data
        //   this.logo = response.body.message;
        //   console.log(this.logo)
        //   }, (error) => {
        //     console.log(error)
        //   });
        this.$http.get(this.$root.config + this.api)
          .then((res)=>{
            this.logos = res.data.message;
            console.log(this.logos)
          })
          .catch((err)=>{
            console.log(err)
          })
      },
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
</style>