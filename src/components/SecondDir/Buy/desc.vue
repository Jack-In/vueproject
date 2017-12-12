<template>
    <div class="desc">
        <h3>{{goods.title}}</h3>
        <div class="content" v-html="goods.content"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                goods: {}
            }
        },
        created() {
            this.getdesc();
        },
        methods: {
            getdesc(){
                this.axios.get(this.$root.config+'/api/goods/getdesc/'+this.id)
                    .then((res)=>{
                        if(res.status === 200 && res.data.status === 0){
                            this.goods = res.data.message[0];
                        }else{
                            console.error('服务器错误！')
                        }
                    })
                    .catch((err)=>{
                        console.error(err)
                    })
            }
        }
    };
</script>

<style >
    .desc {
        padding: 50px 5px;
    }
    .desc h3 {
        color: #0094ff;
        border-bottom: 1px solid rgba(92,92,92,0.3);
        padding: 10px;
    }
    .desc .content {
        margin-top: 10px;
    }
    .desc .content p {
        margin-bottom: 0px;
    }
</style>