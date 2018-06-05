<style lang='stylus'>
    .newtizone{
        padding:10px;
        ul{
            list-style:none;
            li{
                width: 200px;
                height: 50px;
                background:#fff;
                border:1px solid #ccc;
                margin: 10px auto;
                text-align: center;
                line-height: 50px;
                cursor: move;
                background:lightblue;
            }
        }
    }
</style>
<template>
    <div class="newtizone">
        <ul id="xintiul" class="ulzone" ref="ul">
            <li data-tixing="singleoption">单选题</li>
            <li data-tixing="multipleoption">多选题</li>
            <li data-tixing="menuoption">下拉题</li>
        </ul>
    </div>
</template>