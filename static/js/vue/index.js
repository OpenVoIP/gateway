import App from './App';
import Vue from 'vue';

import VueSocketIO from 'vue-socket.io';

// import ElementUI from 'element-ui';
// Vue.use(ElementUI);
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: `${window.location.protocol}//${window.location.protocol}:8000`,
    options: {
      path: '/socket.io',
      // query: 'token=' + `Bearer ${store.getters.token}`
    },
  })
);

new Vue({
  components: {App},
  template: '<App/>',
}).$mount('#speakers-vue');
