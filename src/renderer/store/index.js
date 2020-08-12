import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      images_path:[],
      sy_path:[],
      viewStyle:'card',
      searchKey:'',
      showPopup:'',
      mb:false,
      avatar:'',
      taskId:'',
      taskofProId:'',//当前任务所在的项目id
    },
    mutations: {
      sy_path(state, payload) {
            state.sy_path.push(payload)
      },
      images_path(state, payload) {
          state.images_path.push(payload)
      },
      clear_images_path(state){
        state.images_path = []
      },
      viewStyle(state,payload){
        state.viewStyle = payload
      },
      searchKey(state,payload){
        state.searchKey = payload
      },
      showPopup(state,payload){
        state.showPopup = payload
      },
      mb(state,payload){
        state.mb = payload
      },
      avatar(state,payload){
        state.avatar = payload
      },
      taskId(state,payload){
        state.taskId = payload
      },
      taskofProId(state,payload){
        state.taskofProId = payload
      },
    }
})

export default store;