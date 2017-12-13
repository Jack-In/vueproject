<template>
    <div class="numBox">
        <span class="add" @click='add'>+</span><input class="num1" type="number" v-model="count"><span class="sub" @click='sub'>-</span>
    </div>
</template>
<script>
export default {
    data(){
        return {
            count:1,
            type:''
        }
    },
    //因为在加减的时候要更新本地localStorage中的数据，所以在num组件向外传值的时候，要把商品id以及操作的数量传出去（传到其他组件）
    props:['stock','num','id'],//获取前边传回来的库存数量,props这个参数板绑定的值，直接绑定到data属性里边，使用this可以直接找到
    created(){
        this.count = this.num ? this.num : 1;
    },
    methods:{
        add(){
            this.count ++;
            if(this.count >= this.stock){
                this.count = this.stock;
            }
            this.type = 'add';
            this.notify();//不管是++还是--都要把更新的数据传出去
        },
        sub(){
            this.count --;
            if(this.count <= 1){
                this.count = 1;
            }
            this.type = 'sub';
            this.notify();
        },
        notify(){
        // count变化触发事件
        // 第一个参数 是自定义事件的名称
        // 第二个参数之后，都是给订阅的人传递参数
            this.$emit('numChange', { id:this.id , count:this.count , type:this.type});
        }
    }
};
</script>
<style type="text/css" media="screen" scoped>
    .numBox {
        text-align: center;
        display: inline-block;
    }
    .numBox span {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }
    .numBox .add {
        border: 1px solid #ccc;
    }
    .numBox .num1 {
        border: 1px solid #ccc;
        height: 20px;
        width: 30px;
        display: inline-block;
        margin: 0;
        line-height: 20px;
        vertical-align: top;
        text-align: center;
        padding: 0;
        border-left-style: none;
        border-right-style: none;
        box-sizing: border-box;
        border-radius: 0;
    }
    .numBox .sub {
        border: 1px solid #ccc;
    }
</style>