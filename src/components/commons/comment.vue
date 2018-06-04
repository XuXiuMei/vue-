<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goback">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="tell"></textarea>
                </li>
                <li>
                    <mt-button type="primary" @click="sendMessage()" size="large">发表评论</mt-button><!--mint中的按钮-->
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>10条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list" v-for="(item,index) in comment" :key="index">
                <li>
                    {{item.user_name}}：{{item.content}} &nbsp;&nbsp;&nbsp;{{item.add_time|formatDate}}
                </li>

            </ul>
            <mt-button type="danger" @click="findMore()" size="large" plain>加载更多</mt-button>
        </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {Indicator} from 'mint-ui';
    export default{
        data(){
            return {
                id:"",
                messages:[],
                comments:[],
                comment:[],
                idxh:1,
                tell:"",
                i:10
            }
        },
        props:['cid'],
       created() {
       this.id=this.$props.cid ;
           this.$ajax.get('comment.json')
                   .then((res)=>{
                       let self=this;
                       self.messages=res.data.message;
                       //console.log(self.messages)
                       self.messages.forEach(function(item){
                           if(item.id==self.id){
                              self.comments=item.messages;
                               self.comments.forEach(function(itemIdx){
                                   if(itemIdx.idx==1){
                                      // console.log(itemIdx.msgs)
                                      self.comment=self.comment.concat(itemIdx.msgs)
                                      // console.log( self.comment)
                                   }
                               })
                           }
                       })
                   })
                   .catch((err)=>{
                       console.log(err)
                   })
     },
    methods:{
        findMore(){
            this.idxh++;
            let self=this;
            this.comments.forEach(function(itemIdx){
                if(itemIdx.idx==self.idxh){
                    self.comment=self.comment.concat(itemIdx.msgs)

                   // console.log( self.comment)
                }
            })
        },
        sendMessage(){
            Indicator.open({
                text:'发送中',
                spinnerType:'fading-circle'
            })
            let tell=this.tell;
            this.i++;
            var n="匿名用户"+this.i;
            var date=  new Date();
            var newMsg={"user_name":n,"content":tell,"add_time":date}
            this.comment.unshift(newMsg);
            this.tell=""
           setTimeout(function(){
               Indicator.close();
           },500)

        },
        goback(){
            this.$router.go(-1);
        }
    }
    }
</script>

<style type="stylesheet/stylus" scoped>
    .photo-comment > div span:nth-child(1) {
        float: left;
        font-weight: bold;
        margin-left: 5px;
    }

    .photo-comment > div span:nth-child(2) {
        float: right;
    }

    .photo-comment {
        height: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        line-height: 30px;
        margin-bottom: 5px;
    }

    .txt-comment {
        padding: 5 5;
    }

    .txt-comment textarea {
        margin-bottom: 5px;
    }

    .comment-list li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-bottom: 5px;
        margin-bottom: 5px;
        padding-left: 5px;
    }

    li {
        list-style: none;
        font-size:15px;
    }

    ul {
        margin: 0;
        padding: 0;
    }
</style>