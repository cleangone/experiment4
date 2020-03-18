import Vue from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import VuejsDialog from 'vuejs-dialog';

// default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

Amplify.configure(awsconfig)

Vue.use(VuejsDialog);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')