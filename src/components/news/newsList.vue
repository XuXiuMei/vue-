<template>
    <div class="tmpl">
        <nav-bar title="新闻列表"></nav-bar>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in arr" :key="item.id">
                <router-link :to="{name:'news.detail',query:{id:item.id} }">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                       <span v-text="item.title"> </span>
                        <div class="news-desc">
                            <p>点击数：{{item.click}}</p>
                            <p>发表时间：{{item.add_time|formatDate}}</p>
                        </div>

                    </div>
                </router-link>
            </li>
        </ul>


    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                arr:[]
            }
        },created(){
        this.$ajax.get("data.json")
                .then((res)=>{
                    this.arr=res.data.message;
                    console.log (this.arr)
                })
                .catch((err)=>{
                    console.log('新闻列表获取失败',err)
                })
    }
    }
</script>

<style type="stylesheet/stylus" scoped>
   .mui-media-body p {
       color:#0bb0f5;
   }
    .news-desc p:nth-child(1){
        float:left;
    }
   .news-desc p:nth-child(2){
       float:right;
   }
</style>