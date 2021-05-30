import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import Buefy from 'buefy';
import VueFeather from 'vue-feather';

import App from './App.vue';

import 'buefy/dist/buefy.css';
import './main.scss';

Vue.use(VueFeather);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDHLHpUVR6850QajwNW4NjKJc9K4_QZQIg',
  },
});

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
