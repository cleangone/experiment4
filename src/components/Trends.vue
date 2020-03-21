<template>

  <div id="app">
    <div>
      <ul>
        <li>An AWS Amplify backend paired with a web frontend.</li>
        <li>Makes use of AWS Amplify, AWS AppSync, DynamoDB, Vue.js, Cloud 9 hosted IDE, Github</li>
      </ul>
      <br>
    </div>

    <div v-if="isSignedIn">
      <input v-model="newTrendName" placeholder="New Trend">
      <button @click="createTrend(newTrendName)">Add</button>
    </div>
    
    <div class="mx-auto flex mt-4">
      <button v-for="(trend, index) in trends" v-bind:key="trend.id" @click="upVote(trend.id)"
        v-bind:class="`focus:outline-none flex-1 h-max text-white text-sm sm:text-lg font-semibold py-2 px-2 mx-1 md:h-18 h-18 rounded bg-${trendColors[index]}-600 hover:bg-${trendColors[index]}-800`">
        + {{trend.name}} ({{trend.upVotes}})
      </button>
    </div>
    <div class="mx-auto flex mt-4">
      <button v-for="(trend, index) in trends" v-bind:key="trend.id" @click="downVote(trend.id)"
        v-bind:class="`focus:outline-none flex-1 h-max text-white text-sm sm:text-lg font-semibold py-2 px-2 mx-1 md:h-18 h-18 rounded bg-${trendColors[index]}-600 hover:bg-${trendColors[index]}-800`">
        - {{trend.name}} ({{trend.downVotes}})
      </button>
    </div>

    <VoteChart v-bind:chartData="chartData" width="200" height="110"></VoteChart>
    
    <div v-if="isSignedIn" class="mx-auto flex mt-4">
      <button v-for="(trend, index) in trends" v-bind:key="trend.id" @click="deleteTrend(trend)"
        v-bind:class="`focus:outline-none flex-1 h-max text-white text-sm sm:text-lg font-semibold py-2 px-2 mx-1 md:h-18 h-18 rounded bg-${trendColors[index]}-600 hover:bg-black`">
        <p>Delete</p>{{trend.name}}
      </button>
    </div>
 
  </div>
</template>

<script>
import VoteChart from "./VoteChart";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";
import { mapGetters } from 'vuex';




const colorNames = ["red", "orange", "green", "blue"]
const colorHex = ["#e53e3e", "#dd6b20", "#38a169", "#3182ce"]
const colors = colorNames.concat(colorNames)
const backgroundColors = colorHex.concat(colorHex)

export default {
  components: { VoteChart },
  data() {
    return {
      trends: [],
      trendColors: colors
    };
  },
  computed: {
    ...mapGetters(['isSignedIn']),
    chartData: function() {
      return {
        labels: this.trends.map(trend => trend.name),
        datasets: [{
            label: false,
            data: this.trends.map(trend => trend.upVotes - trend.downVotes),
            backgroundColor: backgroundColors
          }]};
    }
  },
  async created() {
    await API.graphql(graphqlOperation(queries.listTrends)).then(
      res => {
        this.trends = res.data.listTrends.items
        this.trends.sort((a, b) => a.name.localeCompare(b.name));
      }
    );
  },
  methods: {
   createTrend(name) {
      // alert ("createTrend " + name);
      const todo = {name:name, upVotes:0, downVotes:0};
      API.graphql(graphqlOperation(mutations.createTrend, { input: todo }));
      this.newTrendName = '';
    },
    upVote(id) {
      const voteInput = { id: id };
      API.graphql(graphqlOperation(mutations.upVote, { input: voteInput }));
    },
    downVote(id) {
      const voteInput = { id: id };
      API.graphql(graphqlOperation(mutations.downVote, { input: voteInput }));
    },
    deleteTrend(trend) {
      //alert ("deleteTrend " + trend.name);
      this.$dialog.confirm("Delete " + trend.name + "?", { okText:'Delete', cancelText:'Cancel' })
        .then(function() {
          const deleteInput = { id: trend.id };
          API.graphql(graphqlOperation(mutations.deleteTrend, { input: deleteInput }));
        });
    }
  },
  mounted() {
    API.graphql(graphqlOperation(subscriptions.onUpVote)).subscribe({
      next: voteCasted => {
        const id = voteCasted.value.data.onUpVote.id;
        const upVotes = voteCasted.value.data.onUpVote.upVotes;
        const trend = this.trends.find(trend => trend.id === id);
        trend.upVotes = upVotes;
      }
    });
    API.graphql(graphqlOperation(subscriptions.onDownVote)).subscribe({
      next: voteCasted => {
        const id = voteCasted.value.data.onDownVote.id;
        const downVotes = voteCasted.value.data.onDownVote.downVotes;
        const trend = this.trends.find(trend => trend.id === id);
        trend.downVotes = downVotes;
      }
    });
    API.graphql(graphqlOperation(subscriptions.onCreateTrend)).subscribe({
      next: createdTrend => {
        //alert ("subscriptions.onCreateTrend: " + createdTodo.value.data.onCreateTrend.name);
        this.trends.push(createdTrend.value.data.onCreateTrend);
        this.trends.sort((a, b) => a.name.localeCompare(b.name));
      } 
    });
    API.graphql(graphqlOperation(subscriptions.onDeleteTrend)).subscribe({
      next: deletedTrend => {
        //alert ("subscriptions.onDeleteTrend: " + deletedTrend.value.data.onDeleteTrend.name);
        const id = deletedTrend.value.data.onDeleteTrend.id;
        this.trends = this.trends.filter(trend => trend.id !== id )
      } 
    });
  }
};
</script>

<style scoped>
input {
  border: 2px solid silver;
  margin: 1px 4px;
  padding: 2px 2px;
  width: 140px;
}
</style>