import { Auth } from 'aws-amplify';

const state = {
    signedIn: Boolean
};

const getters = {
    isSignedIn:(state) => { return state.signedIn }
};

// actions: do an action and then call a mutation to mutate the state
const actions = {
    async findUser({ commit }) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        commit('SET_SIGNED_IN', true) 
        console.log(user);
      }
      catch(e) {
        commit('SET_SIGNED_IN', false) 
      }
    },
    async setSignedIn ({ commit }, newValue) { 
        commit('SET_SIGNED_IN', newValue) 
    }
}; 

const mutations = {
    SET_SIGNED_IN: (state, newValue) => { state.signedIn = newValue }
}

export default {
    state,
    getters, 
    actions,
    mutations
}


