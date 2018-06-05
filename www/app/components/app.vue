<style lang='stylus'>
    *{
        margin:0;
        padding:0;
    }
    body{
        background:#eee;
    }
    .wrap{
        width: 1300px;
        margin:50px auto;
        background:#fff;
        min-height:550px;
        overflow:hidden;
    }
    .leftPart{
        float: left;
        width: 350px;
        background:#fff;
    }
    .centerPart{
        float: left;
        width: 600px;
        background:#fff;
        height: 550px;
        overflow-y:scroll;
    }
    .centerPart::-webkit-scrollbar{
           width:5px;
           height: 18px;
           background:#fff;
    }
    .centerPart::-webkit-scrollbar-track{
       /*  box-shadow:inset 0px 0px  6px rgba(0, 0, 0, 0.7); */
    }
    .centerPart::-webkit-scrollbar-thumb{
        border-radius:5px;
        box-shadow:inset 0px 0px  6px rgba(0, 0, 0, 0.7);
        background:#ccc;
    }
    .rightPart{
        float: left;
        width: 350px;
        background:#fff;
    }
    .qbox{
        padding:20px;
        border-bottom:1px solid #eee;
    }
    .qtitle{
        font-weight: bold;
        font-size: 18px;
    }
    .qoptions{
        padding:20px;
        padding-bottom: 0px;
        label{
            margin-right:20px;
        }
    }
    select{
        width: 300px;
        outline:none;
        border: 1px solid #bdbdbd;
        border-radius:10px;
        height: 30px;
        padding-left:10px;
        box-sizing:border-box;
    }
    .innerbox{
        position: relative;
        margin:20px auto;
        width: 500px;
        border-radius:6px;
        border: 1px solid #eee;
        cursor: pointer;
    }
    .innerbox:hover .edit,.innerbox:hover .arrowup,.innerbox:hover .arrowdown{
        display: block;
    }
    .edit{
        position: absolute;
        right:30px;
        top:20px;
        width: 25px;
        height:25px;
        background:url('/images/bianji.svg');
        background-size:cover;
        display:none;
    }
    .arrowup{
        position: absolute;
        right:60px;
        top:23px;
        width: 20px;
        height:20px;
        background:url('/images/up.svg');
        background-size:cover;
        display:none;
    }
    .arrowdown{
        position: absolute;
        right:90px;
        top:23px;
        width: 20px;
        height:20px;
        background:url('/images/down.svg');
        background-size:cover;
        display:none;
    }
    /* 动画 */
    .onedit{
        animation:donghua 0.5s linear 0s infinite alternate;
    }
    @-webkit-keyframes donghua{
        from{
            box-shadow:0px 0px 0px red;
        }
        to{
            box-shadow:0px 0px 20px red;
        }
    }

</style>
<template>
    <div class="wrap">
        <div class="leftPart">
            <xintizone></xintizone>
        </div>
        <div class="centerPart">
            <div v-for="(item,no) in q" :class="{'innerbox':true,'onedit':$store.state.nowedit == no+1}">
                <div :is="item.type" :item="item" :no="no" class="itemBox"></div>
                <span class="edit" @click="$store.commit('changeNowEdit',{
                'nowedit':no+1
                })"></span>
                <span class="arrowup" :data-no="no" @click="$store.commit('changeNowEdit',{
                'nowedit':no+1
                })"></span>
                <span class="arrowdown" :data-no="no" @click="$store.commit('changeNowEdit',{
                'nowedit':no+1
                })"></span>
            </div>
        </div>
        <div class="rightPart">
            <setzone v-if="$store.state.nowedit != 0" :item="q[$store.state.nowedit - 1]"></setzone>
        </div>
    </div>
</template>

<script>
import singleoption from "./singleoption.vue";
import multipleoption from "./multipleoption.vue";
import menuoption from "./menuoption.vue";
import xintizone from "./xintizone.vue";
import setzone from "./setzone.vue";
export default {
    data(){
        return{
            q:[
                {
                    "title":"您最喜欢的明星是谁？",
                    "type":"singleoption",
                    "options":[
                        {"v":"江疏影"},
                        {"v":"胡歌"},
                        {"v":"赵丽颖"},
                        {"v":"迪丽热巴"}
                    ]
                },
                {
                    "title":"你喜欢吃的食物是什么？",
                    "type":"multipleoption",
                    "options":[
                        {"v":"苹果"},
                        {"v":"橘子"},
                        {"v":"香蕉"},
                        {"v":"菠萝"}
                    ]
                },
                {
                    "title":"你的出生地？",
                    "type":"menuoption",
                    "options":[
                        {"v":"石家庄"},
                        {"v":"扎鲁特"},
                        {"v":"北七家"},
                        {"v":"廊坊市"}
                    ]
                }
            ]
        }
    },
    components:{
        singleoption,
        multipleoption,
        menuoption,
        xintizone,
        setzone
    },
    mounted(){
        var self = this;
        $("#xintiul li").draggable({
            connectToSortable:".centerPart",
            helper:"clone",
            revert:"invalid"
        });

        $(".centerPart").sortable({
            cancel:".innerbox",
            stop:function(event,ui){
                var index = $(ui.item[0]).index()
                var tixing = $(ui.item[0]).data("tixing");
                // 拖拽来的东西需要消失，（这个就是克隆之后的dom节点）
                $(ui.item[0]).remove();
                // 让数据变化，从而视图变化
                self.q.splice(index,0,{
                    "title":"我是新的题目，请编辑",
                    "type":tixing,
                    "options":[
                        {"v":"新选项A"},
                        {"v":"新选项B"},
                        {"v":"新选项C"},
                        {"v":"新选项D"}
                    ]
                });
                self.$store.commit("changeNowEdit",{"nowedit":index+1})
            }
        });
        // 事件委托，上下箭头
        $(".centerPart").on("click",".arrowup",function(){
                var no = $(this).data("no");
            if( no>0){
                self.q.splice(no-1,0,self.q.splice(no,1)[0])
            }
        });
        // 事件委托，上下箭头
        $(".centerPart").on("click",".arrowdown",function(){
            var no = $(this).data("no");
            self.q.splice(no+1,0,self.q.splice(no,1)[0])

        });
    }
}
</script>


