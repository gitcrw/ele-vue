import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      images_path:[],
      sy_path:[],
      viewStyle:'card'
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
      }
    }
})

export default store;