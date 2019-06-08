import Vue from 'vue';
import Vuex from 'vuex';
import DataStore from './util/DataStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    snapshots: new DataStore()
  }
});

export default store;
