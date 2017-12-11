<template>
    <div class="mui-content" ref="muicontent">
        <mt-loadmore :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <ul class="mui-table-view mui-grid-view">
                <!-- ref是vue中的特殊属性，指向的是他属性绑定的dom元素 -->
                <li v-for="item in goodslist" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <a href="">
                        <img class="mui-media-object" :src="item.img_url">
                        <div class="mui-media-body">{{ item.title }}</div>
                    </a>
                    <div class="bottom">
                        <h6>
                            <span>￥{{ item.sell_price }}</span>
                            <s>￥{{ item.market_price }}</s>
                        </h6>
                        <div class="sell">
                            <span>热卖中</span>
                            <span>剩余{{ item.stock_quantity }}件</span>
                        </div>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              goodslist: [],
              allLoaded:false
            }
        },
        created() {//已经使用虚拟dom创建好了dom元素，但是页面上还没有，这时候就如果去打印元素获取的是一个空对象，但是你展开后有有东西，是因为在展开时，及时获取了页面上的信息
            this.getgoods();
        },
        mounted(){//已经把虚拟dom创建渲染到了页面上去
            this.$refs.muicontent.style.height = document.documentElement.clientHeight + 'px'
            console.log();
        },
        methods: {
          getgoods() {
            this.axios
              .get(this.$root.config + '/api/getgoods?pageindex=1')
              .then((res) => {
                if (res.status === 200 && res.data.status === 0) {
                  this.goodslist = res.data.message;
                }
              })
              .catch((err) => {
                console.error(err);
              })
          },
          loadBottom(){
            console.log(111)

            // 这是因为在加载数据后需要对组件进行一些重新定位的操作。
        this.$refs.loadmore.onBottomLoaded();
          }
        }
    };
</script>
<style scoped>
    .mui-table-view:before {
        display: none;
    }
    
    .mui-table-view:after {
        display: none;
    }
    
    .mui-content>.mui-table-view:first-child {
        margin-top: 0px;
    }
    
    .mui-table-view.mui-grid-view .mui-table-view-cell {
        margin-right: 0px;
        padding: 0px;
    }
    
    .mui-table-view.mui-grid-view {
        padding: 5px;
    }
    
    .mui-table-view-cell {
        border: 1px solid rgba(92, 92, 92, 0.5);
        box-shadow: 0 0 4px #666;
        padding: 4px;
        margin-top: 5px;
        margin-left: 5px;
        width: 48%;
    }
    
    .mui-table-view-cell img {
        width: 100%;
    }
    
    .mui-table-view-cell:after {
        display: none;
    }
    
    .mui-table-view-cell>a {
        margin: 0;
    }
    
    .mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn) {
        margin: 0;
        margin-bottom: 5px;
        text-align: left;
        color: #000;
    }
    
    .bottom {
        text-align: left;
        background-color: rgba(92, 92, 92, 0.1);
        padding: 5px;
    }
    
    .bottom>h6>span {
        color: red;
        font-size: 14px;
        margin-right: 20px;
    }
    
    .bottom>.sell {
        margin-top: 15px;
        color: rgba(92, 92, 92, 0.8);
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
</style>
