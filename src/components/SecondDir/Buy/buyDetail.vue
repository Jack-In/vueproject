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
                购买数量：<num @numChange='change' :stock="goodsInfo.stock_quantity"></num>
                <!-- 自定义事件，必须使用一个函数来接收事件回调回来的参数 -->
                <div class="ball"></div>
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
            <a @click="change" class="mui-btn mui-btn-danger mui-btn-outlined">{{num}}</a>
        </div>
    </div>
</template>

<script>
import num from '../../common/num.vue';
import swipe from '../../common/swipe.vue';
import vmObj from '../../../config/common.js'
//导出组件
export default {
    data() {
        return {
            id:this.$route.params.id,
            imgUrl:'/api/getthumimages/',
            goodsInfo:[],
            num:1//这个就是num组件中传递过来的count的值
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
        change(num){
            this.num = num;
        },
        // 点击加入购物车
        addShopCart() {
          // 1 获取到number组件中值
          // this.count
          // 2 更新底部的badge
          // 2.1 点击加入购物车，要把count传递到app.vue
          vmObj.$emit('upBadge', this.num);
          // 2.2 更新

          // 3 小球动画
          // 4 保存购物车的数据到本地存储
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
        display: none;
        left: 115px;
        top: 3px;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: red;
        transition: all 0.5s linear;
        z-index: 1000;
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
