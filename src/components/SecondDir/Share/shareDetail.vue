<template>
  <div class="mui-content">
    <div class="info">
      <div class="title">
        <h3>{{info.title}}</h3>
        <span>
          {{info.addtime | fmtdate('YYYY-MM-DD')}}&nbsp;&nbsp;&nbsp;&nbsp;
          {{info.click}}次浏览
        </span>
      </div>
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(itme,index) in img">
          <router-link :to="itme.url" >
            <img class="preview-img" :src="itme.src" @click="$preview.open(index, img)">
          </router-link>
        </li>
      </ul>
      <div class="content" v-html="info.content"></div>

      <comment :id="this.id"></comment>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
import comment from '../../common/comment.vue'
export default {
  data() {
    return {
      img:[],
      info:{},
      id:this.$route.params.id
    }
  },
  created(){
    this.getImg(this.id)
    this.getInfo(this.id)
  },
  methods:{
    getImg(id){
      this.axios
        .get(this.$root.config + '/api/getthumimages/'+ id)
        .then((res)=>{
          this.img = res.data.message;
          this.img.forEach(function(item){
            item.w = '600';
            item.h = '400'
          })
        })
        .catch((err)=>{
          console.error(err)
        })
    },
    getInfo(id){
      this.axios
        .get(this.$root.config + '/api/getimageInfo/'+ id)
        .then((res)=>{
          this.info = res.data.message[0];
        })
        .catch((err)=>{
          console.error(err)
        })
    }
  },
  components:{
    comment
  }
};
</script>

<style scoped>
.title{
     border-bottom: 2px solid rgba(92,92,92,0.1);
     padding: 10px 5px;
 }

.title h3{
    font-size: 16px;
    font-weight: bold;
    color:#0094ff;
}
.title span{
    font-size:12px;
    color:rgba(92,92,92,0.6);
}
.content{
    padding: 5px 5px;
    width: 100%;
    font-size: 14px;
    color: #8f8f94;
}
.info {
  margin-bottom: 50px;
}
/*9宫格样式*/
.mui-content>.mui-table-view:first-child {
  margin-top: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell>a:not(.mui-btn) {
  padding: 0;
}
.mui-grid-9 img {
  width: 100%;
  vertical-align: top
}
.mui-table-view-cell,.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  padding: 0;
}
</style>