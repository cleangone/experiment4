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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faThumbsDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
//import { Button, ButtonsInstaller } from '@progress/kendo-buttons-vue-wrapper'
import { ButtonsInstaller } from '@progress/kendo-buttons-vue-wrapper'
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


// Install BootstrapVue - b-table-simple
Vue.use(BootstrapVue)

library.add(faThumbsUp, faThumbsDown, faEdit, faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// kendo
Vue.use(ButtonsInstaller)
Vue.use(MediaPlayerInstaller)

new Vue({
    router,
    store,
    components: {
        MediaPlayer
    },
    render: h => h(App),
}).$mount('#app')