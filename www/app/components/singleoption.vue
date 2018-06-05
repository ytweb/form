<template>
    <div class="qbox">
        <div class="qtitle">
            {{no+1}} . {{item.title}}
        </div>
        <div class="qoptions">
            <label v-for="option in item.options">
                <input type="radio" :name="'q'+(no+1)" />
                {{option.v}}
            </label>
        </div>
    </div>
</template>
<script>
    export default{
        props:["item","no"]
    }
</script>