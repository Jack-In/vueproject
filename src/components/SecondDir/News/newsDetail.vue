<template>
  <div class="mui-content">
    <div class="title">
      <h3>{{data.title}}</h3>
      <span>{{data.add_time | fmtdate("YYYY-MM-DD")}}&nbsp;&nbsp;&nbsp;&nbsp;{{data.click}}次浏览</span>
    </div>
    <div class="details" v-html="data.content">

    </div>

    <!--  评论 -->
      <div class="comment">
        <!--添加评论-->
        <h4>提交评论</h4>

        <div class="submitcomment">
            <textarea placeholder="请输入评论内容"></textarea>
            <button class="mui-btn mui-btn-primary">发表</button>
        </div>
        <div class="title">
            <h4>评论列表</h4>
        </div>
        <!--评论列表-->
        <div class="item">
            <div class="content">评论内容</div>
            <div>
                <span class="user">匿名用户</span>  <span>时间</span>
            </div>
        </div>

        <div class="more">
            <button class="mui-btn mui-btn-primary mui-btn-outlined">加载更多</button>
        </div>

    </div>
  </div>

</template>

<script>
  export default {
    data(){
      return {
        id:this.$route.params.id,
        data:{}
      }
    },
    created:function(){
      this.getDetail()
    },
    watch:{
      '$route.path':function(){
        this.getDetail()
      }
    },
    methods:{
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
  
  /*  评论的样式 */
    .submitcomment {
        text-align: center;
    }
    .submitcomment textarea {
        margin-top: 10px;
        padding: 0;
        width: 96%;
        height: 60px;
    }
    .submitcomment button {
        width: 96%;
    }
    .comment .title {
        border-top: 1px solid rgba(92, 92, 92, 0.4);
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
        margin: 20px 0 0 0;
        vertical-align: middle;
        padding: 10px 0;
    }
    
    .item {
        padding: 15px 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
    }
    
    .item div {
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
    }
    
    .item span {
        font-size: 15px;
    }
    
    .item .user {
        color: skyblue;
    }
    
    .more {
        margin: 10px 0;
        text-align: center;
    }
    
    .more>button {
        width: 96%;
    }
</style>
