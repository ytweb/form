<template>
    <div class="qbox">
        <div class="qtitle">
            {{no+1}} . {{item.title}}
        </div>
        <div class="qoptions">
            <select>
                <option v-for="option in item.options" :value="option.v">{{option.v}}</option>
            </select>
        </div>
    </div>
</template>
<script>
    export default{
        props:["item","no"]
    }
</script>