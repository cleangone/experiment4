<template>
  <div id="app">
    <div>
      <ul>
        <li>An AWS Amplify backend paired with a web frontend.</li>
        <li>Makes use of AWS Amplify, AWS AppSync, DynamoDB, Vue.js, Cloud 9 hosted IDE, Github</li>
      </ul>
    </div>

    <div class="mx-auto flex">
      <button v-for="(trend, index) in trends" v-bind:key="trend.id" @click="upVote(trend.id)"
        v-bind:class="`focus:outline-none flex-1 h-max text-white text-sm sm:text-lg font-semibold py-2 px-2 mx-1 md:h-18 h-18 bg-${trendColors[index]}-600 hover:bg-${trendColors[index]}-800`">
        <font-awesome-icon icon="thumbs-up"/> ({{trend.upVotes}})
      </button>
    </div>
    <div class="mx-auto flex">
      <button v-for="(trend, index) in trends" v-bind:key="trend.id"
        v-bind:class="`focus:outline-none flex-1 h-max text-white text-sm sm:text-lg font-semibold py-2 px-2 mx-1 md:h-18 h-18 bg-${trendColors[index]}-600`">
        {{trend.name}}
      </button>
    </div>
    <div class="mx-auto flex">
      <button v-for="(trend, index) in trends" v-bind:key="trend.id" @click="downVote(trend.id)"
        v-bind:class="`focus:outline-none flex-1 h-max text-white text-sm sm:text-lg font-semibold py-2 px-2 mx-1 md:h-18 h-18 bg-${trendColors[index]}-600 hover:bg-${trendColors[index]}-800`">
        <font-awesome-icon icon="thumbs-down"/> ({{trend.downVotes}})
      </button>
    </div>

    <VoteChart v-bind:chartData="chartData" width="200" height="110"></VoteChart>
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
    upVote(id) {
      const voteInput = { id: id };
      API.graphql(graphqlOperation(mutations.upVote, { input: voteInput }));
    },
    downVote(id) {
      const voteInput = { id: id };
      API.graphql(graphqlOperation(mutations.downVote, { input: voteInput }));
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
</style>