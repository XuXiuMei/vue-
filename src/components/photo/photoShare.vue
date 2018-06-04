<template>
    <div class="tmpl">
        <nav-bar title="图片分享"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="item in category" :key="item.id">
                    <a href="javascript:;" @click=" getPicByCategoryId()">{{item.title}}</a>
                </li>

            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="pic in pics" :key="pic.id">
                    <router-link :to="{name:'photo.detail',params:{id:pic.id}}">
                        <img v-lazy="pic.img_url">
                        <p>
                            <span>{{pic.title}}</span>
                            <br>
                            <span>{{pic.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                category:[],
                pics:[]

            }
        },created(){
        this.$ajax.all([this.$ajax.get('cate.json'), this.getPicByCategoryId()])
                .then(this.$ajax.spread((res)=>{
                    this.category=res.data.message;
                    this.category.unshift({
                        id: 0,
                        title: '全部'
                    })
                }))
            //该catch可以处理两个请求中的异常，但是成功后的操作各自处理
                .catch(err => console.log('h', err));



    },
    methods:{
        getPicByCategoryId(){
             return this.$ajax.get("pic.json")
                    .then((res)=>{
                      this.pics=res.data.message;
                    })

        }
    }
    }
</script>

<style type="stylesheet/stylus" scoped>
    .photo-header li {
        list-style: none;
        display: inline-block;
        margin-left: 10px;
        height: 30px;
    }

    .photo-header ul {
        /*强制不换行*/
        white-space: nowrap;
        overflow-x: auto;
        padding-left: 0px;
        margin: 5;
    }


    /*下面的图片*/

    .photo-list li {
        list-style: none;
        position: relative;
    }

    .photo-list li img {
        width: 100%;
        height: 230px;
        vertical-align: top;
    }

    .photo-list ul {
        padding-left: 0px;
        margin: 0;
    }

    .photo-list p {
        position: absolute;
        bottom: 0px;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        margin-bottom: 0px;
    }

    /*图片懒加载 mint-ui*/

    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>