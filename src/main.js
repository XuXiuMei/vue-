//引入vue
import Vue from 'vue';

//引入axios
import Axios from 'axios';
//配置默认的请求url
Axios.defaults.baseURL = 'http://localhost:8080/json/';
Vue.prototype.$ajax = Axios;

//引入mint-ui
import MintUi from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUi)
//引入vue-preview插件图片预览
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
//引入mui样式
import './static/vendor/mui-master/dist/css/mui.css'
//引入我们的全局的css
import './static/global.css';

//引入moment
import Moment from 'moment';

import App from './app.vue';
const Home=r=>require(['./components/home.vue'],r) ;
const NewsList=r=>require(['./components/news/newsList.vue'],r);
const NewsDetail=r=>require(['./components/news/newsDetail.vue'],r);
const Member=r=>require([ './components/member.vue'],r);
const Shopcart=r=>require(['./components/shopcart.vue'],r);
const Search=r=>require([ './components/search.vue'],r);
const PhotoShare=r=>require(['./components/photo/photoShare.vue'],r);
const PhotoDetail=r=>require([ './components/photo/photoDetail.vue'],r);
const GoodsList=r=>require(['./components/goods/goodsList.vue'],r);
const GoodsDetail=r=>require([ './components/goods/goodsDetail.vue'],r);
const GoodComment=r=>require([ './components/goods/goodComment.vue'],r);
//引入vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//配置路由规则
let router = new VueRouter({
    linkActiveClass:"mui-active"
});
router.addRoutes([
    { name: 'home', path: '/home', component: Home },
    { path: '/', redirect: { name: 'home' } } ,//重定向到Home
    { name: 'news.list', path: '/news/list', component: NewsList },
    { name: 'news.detail', path: '/news/detail', component: NewsDetail },
    { name: 'news.detail', path: '/news/detail', component: NewsDetail },
    { name: 'member', path: '/member', component:Member },
    { name: 'search', path: '/search', component: Search },
    { name: 'shopcart', path: '/shopcart', component: Shopcart },
    { name: 'photo.share', path: '/photo/share', component: PhotoShare },
    { name: 'photo.detail', path: '/photo/detail/:id', component: PhotoDetail },
    { name: 'goods.list', path: '/goods/list', component: GoodsList  },
    { name: 'goods.detail', path: '/goods/detail/:gid', component: GoodsDetail  },
    { name: 'good.comment', path: '/good/comment', component: GoodComment  }
    ])
//声明全局过滤器
Vue.filter('formatDate',function(value){
    return Moment(value).format('YYYY-MM-DD');
})

//声明全局的组件navBar,带返回功能
import navBar from './components/commons/navBar.vue'
Vue.component('navBar',navBar);
//声明全局的组件评论
import Comment from './components/commons/comment.vue'
Vue.component('comment',Comment);
//声明全局的轮播图
import MySwipe from './components/commons/mySwipe.vue'
Vue.component('mySwipe', MySwipe);
//构建vue实例
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})
