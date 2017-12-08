<template>
  <div class="mui-content">
    <ul class="mui-table-view mui-table-view-chevron">

      <li class="mui-table-view-cell mui-media" v-for="item in news">
        <router-link class="mui-navigate-right" :to="{name:'newsDetail',params: { id: item.id }}">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis"><span class="mui-pull-left">发表时间: {{item.add_time | fmtdate('YYYY-MM-DD')}}</span><span class="mui-pull-right">点击数: {{item.click}}</span></p>
          </div>
        </router-link>
      </li>

    </ul>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        news:[]
      }
    },
    created:function(){
      // GET /someUrl
      //通过app.js把公共的api地址共享过来，$root是vue实例对象
      // this.$http.get(this.$root.config + '/api/getnewslist').then((response) => {
      //   // get body data
      //   this.data = response.body.message;
      //   console.log(this.data)
      // }, (error) => {
      //   console.log(error)
      // });
      this.$http.get(this.$root.config + '/api/getnewslist')
          .then((res)=>{
            this.news = res.data.message;
          })
          .catch((err)=>{
            console.log(err)
          })
    },
    //注册局部过滤器
    // filters:{
    //   'time':function(value){
    //     let time = new Date(value);
    //     return time.getFullYear()+ '-' + (time.getMonth() + 1) + '-' + time.getDate();
    //   }
    // }
  };
</script>
<style type="text/css" media="screen" scoped>
  .mui-media-body {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
  }
  .mui-ellipsis {
    line-height: 22px;
  }
  .mui-content>.mui-table-view:first-child {
    margin-top: 0;
  }
</style>