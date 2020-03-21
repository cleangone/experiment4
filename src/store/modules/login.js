const state = {
    signedIn: Boolean
};

const getters = {
    isSignedIn:(state) => { return state.signedIn }
};

// actions: do an action and then call a mutation to mutate the state
const actions = {
    // setter has no-op action before mutating 
    async setSignedIn ({ commit }, newValue) { commit('SET_SIGNED_IN', newValue) }
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


