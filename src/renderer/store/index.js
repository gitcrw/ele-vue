import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      images_path:[],
      sy_path:[],
      viewStyle:'card',
      searchKey:''
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
      }
    }
})

export default store;