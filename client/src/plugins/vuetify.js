import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Touch from 'vuetify/lib/directives/touch';

Vue.use(Vuetify, {
  directives: { Touch }
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#B71C1C'
      }
    }
  }
});
