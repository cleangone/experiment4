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
import Admin from './components/Admin'
import Admin2 from './components/Admin2'
import store from './store'
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import { BootstrapVue } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faPlayCircle, faPlus, faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { MdDialog } from 'vue-material/dist/components'
import '@progress/kendo-ui/js/kendo.button' 
import '@progress/kendo-ui/js/kendo.mediaplayer' 
import { ButtonsInstaller } from '@progress/kendo-buttons-vue-wrapper'
import { MediaPlayer, MediaPlayerInstaller } from '@progress/kendo-mediaplayer-vue-wrapper'
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/lib/css/mdb.min.css';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '@progress/kendo-theme-default/dist/all.css'

Amplify.configure(awsconfig)
Vue.use(AmplifyPlugin, AmplifyModules);

Vue.use(VuejsDialog);
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
       {path: '/', component: Trends},
       {path: '/Login', component: Login},
       {path: '/Admin', component: Admin},
       {path: '/Admin2', component: Admin2},
       {path: '*', component: Trends}
    ],
    mode: 'history'
});

Vue.use(BootstrapVue) // for b-table-simple
Vue.use(ButtonsInstaller)  // kendo button
Vue.use(MediaPlayerInstaller) // kendo media player
Vue.use(MdDialog) // dialog for media player

library.add(faEdit, faPlayCircle, faPlus, faThumbsUp, faThumbsDown, faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
    router,
    store,
    components: {
        MediaPlayer
    },
    render: h => h(App),
}).$mount('#app')