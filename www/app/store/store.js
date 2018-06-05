import Vuex from "vuex";
import Vue from "vue";
//使用vuex
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        nowedit:0
    },
    mutations:{
        changeNowEdit(state,{nowedit}){
            state.nowedit = nowedit;
        }
    }
})