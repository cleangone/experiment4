import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

const state = {
    trends: []
};

const getters = {
    getTrends:(state) => { 
        
    await API.graphql(graphqlOperation(queries.listTrends)).then(
      res => {
        this.trends = res.data.listTrends.items
        this.trends.sort((a, b) => a.name.localeCompare(b.name));
      }
    );
        
        return state.trends;
        
    }
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
    SET_TRENDS: (state, newValue) => { state.trends = newValue }
}

export default {
    state,
    getters, 
    actions,
    mutations
}




<script>
// import { API, graphqlOperation } from "aws-amplify";
// import * as queries from "../graphql/queries";
// import * as mutations from "../graphql/mutations";
// import * as subscriptions from "../graphql/subscriptions";

// export default {
//   data() {
//     return {
//       trends: []
//     };
//   },
//   async created() {
//     await API.graphql(graphqlOperation(queries.listTrends)).then(
//       res => {
//         this.trends = res.data.listTrends.items
//         this.trends.sort((a, b) => a.name.localeCompare(b.name));
//       }
//     );
//   },
//   methods: {
//   createTrend(name) {
//       // alert ("createTrend " + name);
//       const todo = {name:name, upVotes:0, downVotes:0};
//       API.graphql(graphqlOperation(mutations.createTrend, { input: todo }));
//       this.newTrendName = '';
//     },
//     deleteTrend(trend) {
//       this.$dialog.confirm("Delete " + trend.name + "?", { okText:'Delete', cancelText:'Cancel' })
//         .then(function() {
//           const deleteInput = { id: trend.id };
//           API.graphql(graphqlOperation(mutations.deleteTrend, { input: deleteInput }));
//         });
//     }
//   },
//   mounted() {
//     API.graphql(graphqlOperation(subscriptions.onUpVote)).subscribe({
//       next: voteCasted => {
//         const id = voteCasted.value.data.onUpVote.id;
//         const upVotes = voteCasted.value.data.onUpVote.upVotes;
//         const trend = this.trends.find(trend => trend.id === id);
//         trend.upVotes = upVotes;
//       }
//     });
//     API.graphql(graphqlOperation(subscriptions.onDownVote)).subscribe({
//       next: voteCasted => {
//         const id = voteCasted.value.data.onDownVote.id;
//         const downVotes = voteCasted.value.data.onDownVote.downVotes;
//         const trend = this.trends.find(trend => trend.id === id);
//         trend.downVotes = downVotes;
//       }
//     });
//     API.graphql(graphqlOperation(subscriptions.onCreateTrend)).subscribe({
//       next: createdTrend => {
//         this.trends.push(createdTrend.value.data.onCreateTrend);
//         this.trends.sort((a, b) => a.name.localeCompare(b.name));
//       } 
//     });
//     API.graphql(graphqlOperation(subscriptions.onDeleteTrend)).subscribe({
//       next: deletedTrend => {
//         const id = deletedTrend.value.data.onDeleteTrend.id;
//         this.trends = this.trends.filter(trend => trend.id !== id )
//       } 
//     });
//   }
// }
// </script>

// <style scoped>
