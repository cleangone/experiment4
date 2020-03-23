import Vue from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify'
import * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
import VueRouter from 'vue-router'
import VuejsDialog from 'vuejs-dialog';
import Login from './components/Login'
import Trends from './components/Trends'
import Video from './components/Video'
import Admin from './components/Admin'
import store from './store'
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import { BootstrapVue } from 'bootstrap-vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { Button, ButtonsInstaller } from '@progress/kendo-buttons-vue-wrapper'
import { Input } from '@progress/kendo-vue-inputs';
import { MediaPlayer, MediaPlayerInstaller } from '@progress/kendo-mediaplayer-vue-wrapper'

Amplify.configure(awsconfig)
Vue.use(AmplifyPlugin, AmplifyModules);

Vue.use(VuejsDialog);
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
       {path: '/', component: Trends},
       {path: '/Login', component: Login},
       {path: '/Video', component: Video},
       {path: '/Admin', component: Admin},
       {path: '*', component: Trends}
    ],
    mode: 'history'
});



// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

library.add(faThumbsUp, faThumbsDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)


// kendo
Vue.use(ButtonsInstaller)
Vue.use(MediaPlayerInstaller)
Vue.component('k-input', Input);

new Vue({
    router,
    store,
    components: {
       Button, MediaPlayer
    },
    render: h => h(App),
}).$mount('#app')