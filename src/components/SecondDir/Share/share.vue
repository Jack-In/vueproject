<template>
  <div class="mui-content">
    <div class="title">
      <ul :style="width">
        <li v-for="(item,index) in titls" :key="index">
          <router-link v-bind:to="{name:'shares',params:{id:item.id}}">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="images">
      <ul>
          <li v-for="(item,index) in lists" :key="index">
              <router-link :to="{name:'shareDetail',params:{id:item.id}}">
                  <img :src="item.img_url" :alt="item.seo_title">
                  <p class="cover" >
                      <span>{{item.title}}</span><br>
                      {{item.zhaiyao}}
                  </p>
              </router-link>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titls:[],
      lists:[],
      width:''
    }
  },
  created(){
    this.getTitle();
    this.getImgList(-1);
  },
  watch:{
    "$route":function(){
      this.getImgList(this.$route.params.id)
    }
  },
  methods:{
    getTitle(){
      this.axios
        .get(this.$root.config + '/api/getimgcategory')
        .then((res)=>{
          this.titls = res.data.message;
          this.titls.unshift({
            id:-1,
            title:'全部'
          });
          this.width = "width:"+((this.titls.length + 1)*90)+"px";
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    getImgList(id){
      this.axios
        .get(this.$root.config + '/api/getimages/' + id)
        .then((res)=>{
          this.lists = res.data.message;
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
};
</script>

<style scoped>
  .title {
    width: 100%;
    overflow: hidden;
  }
  ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
  }
  .title li {
    margin-top: 10px;
    padding: 2px 10px;
    float: left;
  }
  .title {
      overflow-x: auto;
      overflow-y: hidden;
  }
  /* webkit核心的浏览器 隐藏滚动条 */
  ::-webkit-scrollbar{
    display:none;
  }
  .images {
      margin-top: 10px;
  }
  .images>ul {}
  .images img {
      height: 300px;
      width: 100%;
  }
  .images>ul>li {
      position: relative;
  }
  .images .cover>span {
      font-weight: bold;
  }
  .images .cover {
      color: #fff;
      position: absolute;
      left: 0px;
      bottom: 0px;
      background-color: rgba(92, 92, 92, 0.4);
      width: 100%;
      margin-bottom: 5px;
  }
</style>