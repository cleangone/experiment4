<template>
  <div id="app">
    <div>
      <ul>
        <li>An AWS Amplify backend paired with a web frontend.</li>
        <li>Makes use of AWS Amplify, AWS AppSync, DynamoDB, Vue.js, Cloud 9 hosted IDE, Github</li>
      </ul>
    </div>
    
    <div class="mx-auto flex">
      <span v-for="(trend, index) in getTrends" v-bind:key="trend.id"
        v-bind:class="`focus:outline-none flex-1 h-max text-white text-sm sm:text-lg font-semibold px-1 py-1 mx-1 md:h-18 h-18 bg-${trendColors[index]}-600`">

        <div class="trend">
          <button @click="upVote(trend.id)" v-bind:class="`px-1 py-1 hover:bg-${trendColors[index]}-800`">
            <font-awesome-icon icon="thumbs-up"/> ({{trend.upVotes}})
          </button>
        </div>
        <div class="trend">
          <span v-if="trend.video==null" v-bind:class="`px-1 py-1`">{{trend.name}}</span> 
          <button v-if="trend.video!=null" @click="openDialog" v-bind:class="`px-1 py-1 hover:bg-${trendColors[index]}-800`">
            {{trend.name}} <font-awesome-icon icon="play-circle"/>
          </button>
        </div>
        <div class="trend">
          <button @click="downVote(trend.id)" v-bind:class="`px-1 py-1 hover:bg-${trendColors[index]}-800`">
            <font-awesome-icon icon="thumbs-down"/> ({{trend.downVotes}})
          </button>
        </div>
      </span>
    </div>

    <VoteChart v-bind:chartData="chartData" width="200" height="110"></VoteChart>
    <TrendListener></TrendListener>
    
    <md-dialog v-bind:md-active.sync="showDialog">
      <kendo-mediaplayer v-on:kendoready="kendoready" v-on:timechange="timechange"
        style="width: 400px; height: 300px;"
        :auto-play='true'
        :media-title="'Saagar'"
        :media-source="'https://www.youtube.com/watch?v=qFf3HTo8Kzw&t=437s'">
      </kendo-mediaplayer>
    </md-dialog>
    
  </div>
</template>

<script>
import VoteChart from "./VoteChart";
import TrendListener from "./TrendListener";
import { API, graphqlOperation } from "aws-amplify";
import { mapGetters, mapActions } from 'vuex';
import * as mutations from "../graphql/mutations";

const colorNames = ["red", "orange", "green", "blue"]
const colorHex = ["#e53e3e", "#dd6b20", "#38a169", "#3182ce"]
const colors = colorNames.concat(colorNames)
const backgroundColors = colorHex.concat(colorHex)

export default {
  components: { 
    VoteChart, 
    TrendListener
  },
  data: () => ({
    trendColors: colors,
    showDialog: false
  }),
  computed: {
    chartData: function() {
      return {
        labels: this.getTrends.map(trend => trend.name),
        datasets: [{
            label: false,
            data: this.getTrends.map(trend => trend.upVotes - trend.downVotes),
            backgroundColor: backgroundColors
          }]};
    },
    ...mapGetters(['getTrends'])
  },
  async created() {
    this.retrieveTrends();
  },
  methods: {
    upVote(id) {
      const voteInput = { id: id };
      API.graphql(graphqlOperation(mutations.upVote, { input: voteInput }));
    },
    downVote(id) {
      const voteInput = { id: id };
      API.graphql(graphqlOperation(mutations.downVote, { input: voteInput }));
    },
    openDialog() { this.showDialog = true },
    closeDialog() { this.showDialog = false },
    ...mapActions(['retrieveTrends']) 
  }
};
</script>

<style scoped>
.trend {
  text-align: center;
}
.md-dialog {
  max-width: 500px;
}
</style>