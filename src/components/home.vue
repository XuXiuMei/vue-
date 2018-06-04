<template>
   <div class="tmpl">
    <my-swipe :url="homeUrl"></my-swipe>
       <div class="mui-content">
           <ul class="mui-table-view mui-grid-view mui-grid-9">
               <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                   <router-link  :to="{name:'news.list'}">
                        <span class="mui-icon mui-icon-home"></span>
                         <div class="mui-media-body">新闻资讯</div>
                   </router-link>
               </li>
               <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                   <router-link  :to="{name:'photo.share'}">
                   <span class="mui-icon mui-icon-email"></span>
                   <div class="mui-media-body">图文分享</div>
                   </router-link>
               </li>
               <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                   <router-link  :to="{name:'goods.list'}">
                   <span class="mui-icon mui-icon-chatbubble"></span>
                   <div class="mui-media-body">商品展示</div>
                   </router-link>
               </li>
               <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                   <span class="mui-icon mui-icon-location"></span>
                   <div class="mui-media-body">留言反馈</div></a></li>
               <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                   <span class="mui-icon mui-icon-search"></span>
                   <div class="mui-media-body">搜索咨询</div></a></li>
               <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                   <span class="mui-icon mui-icon-phone"></span>
                   <div class="mui-media-body">联系我们</div></a></li>

           </ul>
       </div>
   </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
             return {
                homeUrl:"pic.json"
          }
    }
    }
</script>

<style type="stylesheet/stylus" scoped>

/*   九宫格*/
    .mui-content > .mui-table-view:first-child {
        margin-top: 0px;
    }
    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before
    ,.mui-icon-search:before,
    .mui-icon-phone:before {
        content: '';
    }

    .mui-icon-home{
        background-image:url('../static/images/picShare.png');
        background-repeat: round;
    }
    .mui-icon-email{
        background-image:url('../static/images/feedback.png');
        background-repeat: round;
    }
    .mui-icon-chatbubble{
        background-image:url('../static/images/goodShow.png');
        background-repeat: round;
    }
    .mui-icon-location{
        background-image:url('../static/images/news.png');
        background-repeat: round;
    }
    .mui-icon-search{
        background-image:url('../static/images/search.png');
        background-repeat: round;
    }
    .mui-icon-phone{
        background-image:url('../static/images/callme.png');
        background-repeat: round;
    }
    .mui-icon{
        width:50px;
        height:50px;
    }


    .mui-grid-view.mui-grid-9 {
        margin: 0;
        padding: 0;
        border-top:0;
        border-left:0;
        background-color: #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        margin: 0;
        padding: 11px 15px;
        vertical-align: top;
        border-right:0;
        border-bottom:0;
    }

</style>