<template>
  <div class="mui-content">
    <div class="title">
      <h3>{{data.title}}</h3>
      <span>{{data.add_time | fmtdate("YYYY-MM-DD")}}&nbsp;&nbsp;&nbsp;&nbsp;{{data.click}}次浏览</span>
    </div>
    <div class="details" v-html="data.content">

    </div>
    <!-- 使用评论标签组件 -->
    <comment :id="this.id"></comment>
  </div>

</template>

<script>
  import comment from '../../common/comment.vue';
  
  export default {
    data(){
      return {
        id:this.$route.params.id,
        data:{},
        content:''
      }
    },
    created:function(){
      this.getDetail()
    },
    methods:{
      //获取新闻详细信息
      getDetail(){
        this.$http.get(this.$root.config+'/api/getnew/'+this.id)
          .then((res)=>{
            this.data = res.data.message[0];
            console.log(this.data)
          })
          .catch((err)=>{
            console.log(err)
          })
      }
    },
    components:{
      comment
    }
  };
</script>

<style type="text/css" media="screen">
  .details img {
    width: 100%;
  }
</style>
<style scoped>
  .mui-content {
    background-color: #fff;
  }
  .title {
    padding: 10px 5px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.1);
  }
  .title h3 {
    font-size: 16px;
    font-weight: bold;
    color: #0094ff;
  }
  .title span {
    color: rgba(92, 92, 92, 0.7);
    font-size: 12px;
  }
  .details {
    padding: 5px 5px;
    overflow: hidden;

  }
</style>
