import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import App from './App.vue';
import store from './store';
import router from './router';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
// import 'vuetify/src/stylus/app.styl';

Vue.use(VueRouter);
Vue.use(Vuetify, {
  theme: {
    primary: '#B71C1C'
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
