<template>
    <div class="tmpl">
        <nav-bar title="图文详情"></nav-bar>
        <div class="photo-title">
            <p>{{dets.title}}</p>
            <span>发起日期：{{dets.add_time|formatDate}}</span>
            <span>{{dets.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"  v-for="(item,index) in pic" :key="index">
                <img class="preview-img" :src="item.src" height="100" @click="$preview.open(index, pic)">
            </li>

        </ul>
        <div class="photo-desc">
            <p>{{dets.content}}</p>
        </div>
        <comment :cid="id"></comment>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                pics:[],
                pic:[],
                detss:[],
                dets:{},
                id:''
            }
        },created(){
        this.id=this.$route.params.id;
        this.$ajax.all([this.$ajax.get('photopic.json'),this.$ajax.get('photodetail.json')])
                .then(this.$ajax.spread((img,det)=>{
                    this.pics=img.data.message;
                    this.detss=det.data.message
                  var self=this;
                 for(var i=0;i<self.pics.length;i++){
                        if(self.pics[i].id==self.id){
                            self.pic=self.pics[i].img_url;
                            self.pic.forEach(function(item){
                                item.w=300;
                               item.h=300;
                            })
                       }
                   }
                    for(var i=0;i<self.detss.length;i++){
                        if(self.detss[i].id==self.id){
                            self.dets=self.detss[i];
                        }
                    }
                   console.log(self.pic)
                    console.log(self.dets)

                }))
    }
    }
</script>

<style type="stylesheet/stylus" scoped>
    li {
        list-style: none;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    .photo-title {
        overflow: hidden;
    }

    .photo-title,
    .photo-desc {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-bottom: 5px;
        margin-bottom: 5px;
        padding-left: 5px;
    }

    .photo-title p {
        color: #13c2f7;
        font-size: 20px;
        font-weight: bold;
    }

    .photo-title span {
        margin-right: 20px;
    }

    .mui-table-view.mui-grid-view.mui-grid-9 {
        background-color: white;
        border: 0;
    }

    .mui-table-view.mui-grid-view.mui-grid-9 li {
        border: 0;
    }

    .photo-desc p {
        font-size: 18px;
    }

    .mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
        padding: 2 2;
    }
</style>