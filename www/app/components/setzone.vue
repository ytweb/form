<style lang='stylus'>
    .box{
        padding:10px;
    }
    .row{
        line-height: 150%;
        padding:10px 0;
        font-size: 16px;
    }
    input[type="text"]{
        width: 230px;
        height: 20px;
        border-radius:4px;
        border: 1px solid #bdbdbd;
        padding:4px;
        margin-bottom: 10px;
    }
    .addoption{
        width: 230px;
        height: 25px;
        line-height: 25px;
        cursor: pointer;
        border: 1px dotted #bdbdbd;
        text-align: center;
    }
    .addoption:hover{
        background:gold;
    }
    .modify p{
        position: relative;
    }
    .cha,.bj{
        display:block;
        width: 16px;
        height: 16px;
        background:url('/images/del.svg');
        background-size:cover;
        border: 1px solid #eee;
        padding:4px;
        position: absolute;;
        top:0px;
        right:60px;
        cursor: pointer;
    }
    .cha:hover{
       animation:dong1 0.2s linear alternate;
    }
    .bj:hover{
       animation:dong1 0.2s linear alternate;
    }
    @-webkit-keyframes dong1{
        0%{
            transform:scale(1);
        }
        50%{
            transform:scale(0.5);
        }
    }
    .bj{
        background:url('/images/order.svg');
        right:30px;
    }
</style>
<template>
    <div class="box">
        <h2>设置题目</h2>
        <div class="row">
            标题：
            <input type="text" v-model="item.title" />
        </div>
        <div class="row">
            题型：
            <label><input type="radio" v-model="item.type" value="singleoption"/>单选</label>
            <label><input type="radio" v-model="item.type" value="multipleoption"/>多选</label>
            <label><input type="radio" v-model="item.type" value="menuoption"/>下拉</label>
        </div>
        <div class="row">
            选项（更改后鼠标离开后进行修改）
            <div class="modify" ref="modify">
                <p v-for="(option,index) in item.options" :key="option.v">
                    <input type="text" v-model.lazy="option.v" />
                    <span class="cha" @click="shanchu(index)"></span>
                    <span class="bj"></span>
                </p>
            </div>
            <p class="addoption" @click="addoption">添加新的选项</p>
        </div>
    </div>
</template>
<script>
    export default {
        props:["item"],
        methods:{
            shanchu(index){
                this.item.options.splice(index,1);
            },
            addoption(){
                this.item.options.push({"v":""});
            }
        },
        mounted(){
            var startIndex;
            var self = this;
            $(this.$refs.modify).sortable({
                handle:".bj",
                start:function(e,ui){
                    startIndex = $(ui.item).index();
                },
                stop:function(e,ui){
                    var endIndex = $(ui.item).index();
                    var delOption = self.item.options.splice(startIndex,1)[0];
                    self.item.options.splice(endIndex,0,delOption);
                }
            });
        }
    }
</script>