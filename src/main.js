import Vue from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import VueRouter from 'vue-router'
import VuejsDialog from 'vuejs-dialog';
import Login from './components/Login'
import Trends from './components/Trends'

import 'vuejs-dialog/dist/vuejs-dialog.min.css';

Amplify.configure(awsconfig)

Vue.use(VuejsDialog);
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
       {path: '/', component: Trends},
       {path: '/Login', component: Login},
       {path: '*', component: Trends}
    ],
    mode: 'history'
});


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')