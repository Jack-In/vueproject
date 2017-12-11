<template>
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="back"></a>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
        methods:{
            back(){
                this.$router.back();
            }
        }
    }
</script>