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
          <button v-if="trend.video!=null" @click="openDialog(trend)" 
            v-bind:class="`py-1 hover:bg-${trendColors[index]}-800`">
            <img :src="'https://img.youtube.com/vi/' + trend.video + '/0.jpg'">
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
      <kendo-mediaplayer class="mediaplayer" v-on:kendoready="kendoready" v-on:timechange="timechange"
          :auto-play='true' :media-title="dialogTrend.name" 
          :media-source="`https://www.youtube.com/watch?v=${dialogTrend.video}`"/>
        <button @click="upVote(dialogTrend.id)">
          <font-awesome-icon icon="thumbs-up"/> ({{dialogTrend.upVotes}})
        </button>
        <button @click="downVote(dialogTrend.id)">
          <font-awesome-icon icon="thumbs-down"/> ({{dialogTrend.downVotes}})
        </button>
    </md-dialog>
    
  </div>
</template>

<script>
import VoteChart from "./VoteChart";
import TrendListener from "./TrendListener";
import { API, graphqlOperation } from "aws-amplify";
import { mapGetters, mapActions } from 'vuex';
import * as mutations from "../graphql/mutations";

const colorNames = ["red", "orange", "yellow", "green", "blue", "indigo", "gray"]
const colorHex = ["#e53e3e", "#dd6b20", "#D69E2E", "#38a169", "#3182ce", "#5A67D8", "#718096"]
const colors = colorNames.concat(colorNames)
const backgroundColors = colorHex.concat(colorHex)

export default {
  components: { 
    VoteChart, 
    TrendListener
  },
  data: () => ({
    trendColors: colors,
    showDialog: false,
    dialogTrend: {}
  }),
  computed: {
    chartData: function() {
      var chartTrends = []
      for (var i=0; i<this.getTrends.length; i++) {
        const t = this.getTrends[i]
        const words = t.name.split(" ");
        const votes = t.upVotes - t.downVotes
        chartTrends.push({name:words[0] + "(" + votes + ")", votes:votes, color:backgroundColors[i]});
      } 
      
      // sort most popular first
      chartTrends.sort((a, b) => (b.votes - a.votes));
      return {
        labels: chartTrends.map(trend => trend.name),
        datasets: [{
            label: false,
            data: chartTrends.map(trend => trend.votes),
            backgroundColor: chartTrends.map(trend => trend.color),
          }]
      };
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
    openDialog(trend) { 
      this.dialogTrend = trend;
      this.showDialog = true;
    },
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
  max-width: 600px;
}
.mediaplayer {
  width: 600px; 
  height: 400px;
}
.mediaplayersmall {
  width: 60px; 
  height: 40px;
}
</style>