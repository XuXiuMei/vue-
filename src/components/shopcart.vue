<template>
    <div class="tmpl">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(item,index) in arr">
                    <mt-switch v-model="item.isPicked"></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="pay-calc">
                        <p>{{item.title}}</p>
                        <div class="calc">
                            <span>￥{{item.sell_price}}</span>
                            <span @click="substract(item)">-</span>
                            <span>{{item.num}}</span>
                            <span @click="add(item)">+</span>
                            <a href="javascript:;" @click="delone(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):}</p>
                <span>已经选择商品{{countSum.count}}件，总价￥{{countSum.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Tools from  './goods/goodsTool.js'
    import vueBus from './commons/vueBus.js'
    export default{
        data(){
        return{
            goodsLists:[],
            arr:[]
        }
    },
    created(){
        let prods= Tools.getProds();
        this.$ajax.get('goodslist.json')
                .then((res)=>{
                    this.goodsLists=res.data.message;
                    this.goodsLists.forEach((item)=>{
                        for(let key in prods){
                            if(key==item.id){
                                this.arr.push(item)
                            }
                        }
                    })
                    this.arr.forEach((ele)=>{
                        this.$set(ele,'num',prods[ele.id]);
                        this.$set(ele,'isPicked',false)


                    })
                })
    },
    methods:{

        substract(item){
            if(item.num<=1) return;
            item.num--;

          vueBus.$emit('addShop',{id:item.id,num:-1});
            Tools.upDatePro({id:item.id,num:-1})

        },
        add(item){
            item.num++;
            vueBus.$emit('addShop',{id:item.id,num:1});
            Tools.upDatePro({id:item.id,num:1})

        },
        delone(index){
            if(window.confirm('确定删除吗')){
                console.log(this.arr)
                Tools.delone(this.arr[index].id)
                vueBus.$emit('addShop',{id:this.arr[index].id,num:-this.arr[index].num});
                this.arr.splice(index,1);
            }
        }
    },
    computed:{
        countSum(){
            let count=0;
            let sum=0;
            this.arr.forEach((item)=>{
                if(item.isPicked==true){
                    count+=item.num;
                    sum+=item.num*item.sell_price;
                }
            })
            return {count,sum};
        }
    },
    beforeRouteLeave(to,from,next){
        //导航离开之前
        //与beforeRouteBefore不同。其可以访问this
       if(this.arr.length!=0){
           if(window.confirm('亲，不再购买了吗')){
               next()
           }else{
               next(false);
           }
       }else{
           next()
       }

    }
    }
</script>
<style type="stylesheet/stylus" scoped>
    .pay-detail ul li {
        list-style: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin-bottom: 3px;
    }

    .pay-detail ul {
        padding-left: 5px;
        margin-top: 5px;
    }

    .pay-detail ul li img {
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
    }

    .pay-detail ul li >:nth-child(1),
    .pay-detail ul li >:nth-child(3) {
        display: inline-block;
    }

    .pay-calc p {
        display: inline-block;
        width: 250px;
        overflow: hidden;
        color: blue;
        font-size: 15px;
        margin-bottom: 10px;
    }

    .pay-detail ul li >:nth-child(1) {
        line-height: 80px;
    }

    .calc:nth-child(1) {
        color: red;
        font-size: 20px;
    }

    .calc span:not(:nth-child(1)) {
        border: 1px solid rgba(0, 0, 0, 0.3);
        display: inline-block;
        width: 20px;
        text-align: center;
    }

    .calc a {
        margin-left: 20px;
    }

    .show-1,
    .show-2 {
        display: inline-block;
    }

    .show-1,
    .show-2 {
        margin-left: 30px;
    }

    .show-price {
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
