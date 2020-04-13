import Vue from 'vue'
import Vuex from 'vuex'
import cognito from './modules/cognitoStore'
import trends  from './modules/trendStore'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        cognito,
        trends
    }
});
  