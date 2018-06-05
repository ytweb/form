import Vue from 'vue';
import app from "./components/app.vue";
// 引入store
import store from "./store/store.js";
new Vue({
    el:'#app',
    // 将store注入全局
    store,
    render:h=>h(app)
});