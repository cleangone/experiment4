import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";

const state = { 
    user: null
};

const getters = {
    hasNickname:(state) => { 
        alert("hasNickname user=" + state.user);
        if (state.user != null) {
            alert("hasNickname user.nickname=" + state.user.nickname)
        }
    
        return state.user != null && state.user.nickname != null 
        
    },
    getNickname:(state) => { 
        return (this.hasNickname(state) ? state.user.nickname : null) 
        
    }
}

const actions = {
    async retrieveUser({ commit }, userId) {
        
        alert("retrieveUser userId=" + userId)
        const user = API.graphql(graphqlOperation(queries.getUser, {id:userId}));
        commit('SET_USER', user);
    }
};

const mutations = {
    SET_USER: (state, user) => { 
        alert("SET_USER " + user)
        if (user != null) {
            alert("SET_USER user.nickname=" + user.nickname)
        }
        state.user = user;
    }
}
  
export default {
    state,
    getters, 
    actions,
    mutations
}

