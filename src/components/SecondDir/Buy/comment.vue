<template>
    <div class="mui-content">
        <comment :id='id'></comment>
    </div>
</template>
<script>
    import comment from '../../common/comment.vue';
    export default {
        data(){
            return {
                id:this.$route.params.id
            }
        },
        components:{
            comment
        }
    };
</script>