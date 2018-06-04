<template>
    <div>
        <mt-header title="信息管理系统"></mt-header>
        <router-view></router-view>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" :to="{name:'home'}">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'member'}">
                <span class="mui-icon mui-icon-members"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'shopcart'}">
                <span class="mui-icon mui-icon-shopcart"><span class="mui-badge">{{number}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'search'}">
                <span class="mui-icon  mui-icon-search"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>
    </div>
</template>

<script type="text/ecmascript-6">
    import vueBus from './components/commons/vueBus.js';
    import Tools from './components/goods/goodsTool.js';
    export default{
        data(){
        return {
            number:0
        }
    },
    created(){
        this.number=Tools.getCount();
        vueBus.$on('addShop',(pro)=>{
            this.number+=pro.num;
        })
    }
    }
</script>

<style type="stylesheet/stylus" scoped>

</style>