import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import plugins from './plugins'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(Vuex)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBO0eTaMrFybrl6x4z7XCLbhaLRA2CsHtg',
    libraries: 'places'
  }
})

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins
})

export default store
