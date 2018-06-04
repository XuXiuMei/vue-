<template>
    <div class="tmpl">
        <nav-bar title="商品列表"></nav-bar>
        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :auto-fill="false" ref="loadmore" :bottom-all-loaded="allLoaded" class="mt-loadmore">
        <ul class="mui-table-view mui-grid-view">
            <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in goodslist" :key="item.id">
                <router-link :to="{name:'goods.detail',params:{gid:item.id}}">
                    <img class="mui-media-object" :src="item.img_url">
                    <div class="mui-media-body">{{item.title}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{item.sell_price}}</span>
                            <s>￥{{item.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{item.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>

        </ul>
        </mt-loadmore>
        <mt-spinner type="double-bounce" v-show="isLoading === 'loading'"></mt-spinner>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                goodslist:[],
                allLoaded:false,
                isLoading:""
            }
        },
    created(){
        this.$ajax.get('goodslist.json')
                .then((res)=>{
                   this.goodslist=res.data.message;
                    console.log(this.goodslist)
                })
    },
    methods:{
        handleBottomChange(status){
           this.isLoading=status;
        },
        loadBottom() {
            this.$ajax.get('goodslist.json')
                    .then((res)=>{
                        this.goodslist= this.goodslist.concat(res.data.message);
                        if((res.data.message.length)!=6){
                            this.allLoaded=true;
                        }
                        this.$refs.loadmore.onBottomLoaded()//通知停止loading状态
                    })


        }
    }
    }
</script>

<style type="stylesheet/stylus" scoped>
    .mt-loadmore{
        margin-bottom: 50px;
    }
    .tmpl{
        height:100%;
        overflow: auto;
    }
    .mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
        margin: 0px;
        padding: 0px;
        border: 1px solid #5c5c5c;
        box-shadow: 0 0 4px #666;
    }

    .sell > span {
        float: left;
        color: red;
        text-align: left;
    }

    .detail >.hot {
        float: left;
        text-align: left;
        font-size: 15px;
    }

    .detail >.count {
        float: right;
        text-align: right;
        font-size: 15px;
    }


    /*撑开，去除浮动没有的高度*/

    .detail {
        overflow: hidden;
    }

    .desc {
        color: rgba(92, 92, 92, 0.8);
        background-color: rgba(0, 0, 0, 0.2);
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
        height: 200px;
    }
</style>