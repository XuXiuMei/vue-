<template>
    <div class="tmpl">
        <nav-bar :title="title"></nav-bar>
        <div class="news-title">
            <p>{{detail.title}}</p>
            <div>
                <span>{{detail.click}}次点击</span>
                <span>分类：民生经济</span>
                <span>添加时间：{{detail.add_time|formatDate}}</span>
            </div>
        </div>
        <div class="news-content">
            {{detail.content}}
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                Darr:[],
                detail:{},
                title:''
            }
        },
        created(){
            let id=this.$route.query.id;
            this.$ajax.get('data.json')
                    .then((res)=>{
                       this.Darr=res.data.message;
                        for(var i=0;i<this.Darr.length;i++){
                            if(this.Darr[i].id==id){
                                this.detail=this.Darr[i];

                            }
                        }
                        console.log(this.detail);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
        },
    beforeRouteEnter(to, from, next) {
        console.log(from)
        let title=''
     if(from.name=="news.list"){
         title="新闻详情"
     }else if(from.name=="goods.detail"){
         title="商品介绍"
     }
        next(next(vm => {
            // 通过 `vm` 访问组件实例
            vm.title=title;
        }));
    }
    }
</script>

<style type="stylesheet/stylus" scoped>
    .news-title p {
        color: #0a87f8;
        font-size: 20px;
        font-weight: bold;
    }

    .news-title span {
        margin-right: 30px;
    }

    .news-title {
        margin-top: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }


    /*主体文章的左右距离*/

    .news-content {
        padding: 10 5;
    }
</style>