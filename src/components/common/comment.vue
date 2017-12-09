<template>
  <!--  评论 -->
  <div class="comment">
    <!--添加评论-->
    <h4>提交评论</h4>
    <div class="submitcomment">
        <textarea placeholder="请输入评论内容" v-model="content"></textarea>
        <button class="mui-btn mui-btn-primary" @click="postcomments">发表</button>
    </div>
    <div class="title">
        <h4>评论列表</h4>
    </div>
    <!--评论列表-->
    <div class="item" v-for="(item,index) in comments" :key="index">
        <div class="content">{{item.content}}</div>
        <div>
            <span class="user">{{item.user_name}}</span>  <span>{{item.add_time | fmtdate("YYYY-MM-DD HH:mm:ss")}}</span>
        </div>
    </div>

    <div class="more">
        <button class="mui-btn mui-btn-primary mui-btn-outlined" @click="more">加载更多</button>
    </div>

</div>
</template>
<script>
export default {
  data(){
    return {
      comments:[],
      content:'',
      page:1
    }
  },
  props:['id'],
  created:function(){
    this.getcomments()
  },
  methods:{
    //获取评论信息
      getcomments(){
        this.$http.get(this.$root.config+'/api/getcomments/'+this.id, {
              params: {
                'pageindex':this.page
              }
            })
          .then((res)=>{
            this.comments= this.comments.concat(res.data.message)
          })
          .catch((err)=>{
            console.error(err)
          })
      },
      //提交评论信息
      postcomments(){
        if(this.content.length === 0){
          this.$toast('请输入评论内容！');
        }else{
          this.$http.post(this.$root.config+'/api/postcomment/'+this.id, 'content='+this.content,{
          //设置请求类型，否则会报错误
          // headers: {
          //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          // }
        })
          .then((res)=>{
            this.$toast(res.data.message);
            this.comments.unshift({
              user_name: '匿名用户',
              add_time: new Date(),
              content: this.content
            })
            this.content = "";
          })
          .catch((err)=>{
            console.error(err)
          })
        }
      },
      //加载更多
      more(){
        this.page++;
        this.getcomments()
      }
  }
};
</script>
<style type="text/css" media="screen" scoped>
  
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