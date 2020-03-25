import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";

const state = { 
    trends: [] 
};

const getters = {
    getTrends:(state) => { return state.trends }
};

const actions = {
   async retrieveTrends({ commit }) {
        // read each time - safety net for getting out of sync
        await API.graphql(graphqlOperation(queries.listTrends)).then(
            res => { commit('SET_TRENDS', res.data.listTrends.items) }
        );
    },
    async setTrends ({ commit }, newTrends) { commit('SET_TRENDS', newTrends) },
    async addStoredTrend ({ commit }, trend) { commit('ADD_TREND', trend) },
    async deleteStoredTrend ({ commit }, trend) { commit('DELETE_TREND', trend) },
    async addStoredUpVote ({ commit }, trend) { commit('ADD_UP_VOTE', trend) },
    async addStoredDownVote ({ commit }, trend) { commit('ADD_DOWN_VOTE', trend) }
};

const mutations = {
    SET_TRENDS: (state, newTrends) => { 
        state.trends = newTrends;
        state.trends.sort((a, b) => a.name.localeCompare(b.name));
    },
    ADD_TREND: (state, addedTrend) => { 
        const stateTrend = state.trends.find(trend => trend.id === addedTrend.id);
        if (stateTrend == null) {
            state.trends.push(addedTrend);
            state.trends.sort((a, b) => a.name.localeCompare(b.name));
        }
    },
    DELETE_TREND: (state, deletedTrend) => { 
        state.trends = state.trends.filter(trend => trend.id !== deletedTrend.id ) 
    },
    ADD_UP_VOTE: (state, updatedTrend) => { 
        const stateTrend = state.trends.find(trend => trend.id === updatedTrend.id);
        if (stateTrend != null) {
            stateTrend.upVotes = updatedTrend.upVotes
        }
    },
    ADD_DOWN_VOTE: (state, updatedTrend) => { 
        const stateTrend = state.trends.find(trend => trend.id === updatedTrend.id);
        if (stateTrend != null) {
            stateTrend.downVotes = updatedTrend.downVotes
        }
    }
}
  
export default {
    state,
    getters, 
    actions,
    mutations
}

