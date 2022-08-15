import Vue from 'vue';
// @ts-ignore
import App from './App.vue';


import router from '@/plugins/router'
import store from '@/plugins/store'
import vuetify from "@/plugins/vuetify";

Vue.component( 'Header', require('./components/Header/Header.vue').default );
Vue.component( 'Options', require('./components/Options/Options.vue').default );
Vue.component( 'Content', require('./components/Content/Content.vue').default );
Vue.component( 'Footer', require('./components/Footer/Footer.vue').default );

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');
