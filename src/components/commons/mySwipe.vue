<template>
    <mt-swipe :auto="3000" style="height:218px;">
        <mt-swipe-item v-for="item in items" :key="item.id">
            <a :href="item.href||''" rel="external nofollow" >
                <img :src="item.img_url" class="img"/>

            </a>
        </mt-swipe-item>
    </mt-swipe>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                items:[]
            }
        },
    props:['url'],
    created(){
        console.log(this.$props.url)
        this.$ajax.get(this.$props.url)
                .then((res)=>{
                    this.items=res.data.message;
                })
    }
    }
</script>

<style type="stylesheet/stylus" scoped>
    /* ÂÖ²¥Í¼*/
    img {
        width: 100%;
    }
</style>