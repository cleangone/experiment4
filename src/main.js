import Vue from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import VueRouter from 'vue-router'
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

Amplify.configure(awsconfig)

Vue.use(VueRouter);
Vue.use(VuejsDialog);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')