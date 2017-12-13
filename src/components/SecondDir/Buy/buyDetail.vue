<template>
    <div class="mui-content">
        <div class="detail">
            <div class="top">
              <swipe :api="imgUrl+id"></swipe>
            </div>
        </div>
        <div class="sell">
            <h4>{{goodsInfo.title}}</h4>
            <div class="price">
                市场价：<s>￥{{goodsInfo.market_price}}</s> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 销售价：<span>￥{{goodsInfo.sell_price}}</span>
            </div>
            <div class="num">
                购买数量：<num @numChange='change' :stock="goodsInfo.stock_quantity" :id="goodsInfo.id"></num>
                <!-- 自定义事件，必须使用一个函数来接收事件回调回来的参数 -->
                <!-- 执行过度动画 -->
                <transition
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter"
                    v-on:after-leave="afterLeave">
                    <div class="ball" v-show="isShow"></div>
                </transition>
            </div>
            <div class="button">
                <button class="mui-btn mui-btn-primary">立刻购买</button>
                <button class="mui-btn mui-btn-danger" @click="addShopCart">加入购物车</button>
            </div>
        </div>

        <div class="param">
            <h5>商品参数</h5>
            <div class="info">
                <p>商品编号：{{goodsInfo.goods_no}}</p>
                <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                <p>上架时间：{{goodsInfo.add_time | fmtdate("YYYY-MM-DD HH:mm:ss")}}</p>
            </div>
        </div>
        
        <div class="footer">
            <a @click="desc" class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</a>
            <a @click="push" class="mui-btn mui-btn-danger mui-btn-outlined">商品评论</a>
        </div>
    </div>
</template>

<script>
import num from '../../common/num.vue';
import swipe from '../../common/swipe.vue';
import vmObj from '../../../config/common.js'
//按需导入本地操作locaStorage的操作模块
import { setData } from '../../../config/localStorageHelp.js';
//导出组件
export default {
    data() {
        return {
            id:this.$route.params.id,
            imgUrl:'/api/getthumimages/',
            goodsInfo:[],
            num:1,//这个就是num组件中传递过来的count的值，
            isShow:false
        }
    },
    created(){
        this.getGoods();
    },
    methods:{
        getGoods(){
            this.axios.get(this.$root.config + '/api/goods/getinfo/'+this.id)
                .then((res)=>{
                    if(res.status === 200 && res.data.status === 0){
                        this.goodsInfo = res.data.message[0];
                    }
                })
                .catch((err)=>{
                    console.error(err)
                })
        },
        desc(){
            this.$router.push({ name: 'buyDesc', params: { id:this.id }})
        },
        push(){
            this.$router.push({ name: 'buyComment', params: { id:this.id }})
        },
        change(obj){
            this.num = obj.count;
        },
        // 点击加入购物车
        addShopCart() {
          // 1 获取到number组件中值
          // this.count
          // 2 更新底部的badge
          // 2.1 点击加入购物车，要把count传递到app.vue
          this.isShow = true;
          // 2.2 更新

          // 3 小球动画
          // 4 保存购物车的数据到本地存储
        },
        beforeEnter(el){
            //1.初始化小球的动画信息
            el.style.transform = 'translate(0,0)';
        },
        enter(el,done){
            //1.获取小球的横纵坐标，相对于视口
            let elx = el.getBoundingClientRect().left;
            let ely = el.getBoundingClientRect().top;

            //2.获取badge的横纵坐标
            let badge = document.querySelector('.mui-badge');
            let badgex = badge.getBoundingClientRect().left;
            let badgey = badge.getBoundingClientRect().top;
            //3.获取要移动的距离
            let x = badgex - elx;
            let y = badgey - ely;
            //4.设置小球运动动画
            el.style.transform = `translate(${x}px,${y}px)`;
            //5.vue规定必须在enter最后执行done，相当于执行这个动画
            done()
        },
        afterEnter(el){
            //动画执行完毕后，让小球隐藏
            this.isShow = false;

        },
        afterLeave(){
            //1.更新app.vue的badge数据
            vmObj.$emit('upBadge', this.num);
            setData('goodslist',{id:this.id,count:this.num})

        }
    },
    components:{
       swipe,
       num
    }
};
</script>

<style scoped>
    .num {
        position: relative;
    }
    .ball {
        left: 115px;
        top: 3px;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: red;
        z-index: 1000;
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .mui-content {
        background-color: #fff;
    }
    .top,
    .sell,
    .param,
    .footer {
        border: 1px solid rgba(92, 92, 92, 0.7);
        border-radius: 5px;
        margin: 5px;
        padding: 10px;
    }
    .sell h4 {
        color: dodgerblue;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }
    .price,
    .num,
    .button {
        margin: 10px;
        font-size: 15px;
    }
    .price span {
        font-size: 18px;
        color: red;
    }
    .param h5 {
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }
    
    .info {
        margin-top: 10px;
        margin-left: 20px;
    }
    
    .info p {
        margin: 0;
    }
    
    .footer .mui-btn {
        width: 100%;
    }
    
    .footer .mui-btn-danger {
        margin-top: 10px;
    }
</style>
