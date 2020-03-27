import { Auth } from 'aws-amplify';

const state = {
    userId: null
};

const getters = {
    isSignedIn:(state) => { 
        return state.userId != null 
    },
    getUserId:(state) => { 
        return state.userId
    }  
};

// actions: do an action and then call a mutation to mutate the state
const actions = {
    async findUser({ commit }) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        commit('SET_AUTH_USER', user) 
      }
      catch(e) {
        commit('SET_AUTH_USER', null) 
      }
    },
    async logout ({ commit } ) { 
        commit('SET_AUTH_USER', null) 
    }
}; 

const mutations = {
    SET_AUTH_USER: (state, user) => { 
        const username = (user == null ? null : user.username)
        state.userId = username 
    }
}

export default {
    state,
    getters, 
    actions,
    mutations
}


