<template>
  <div>
    <b-table-simple striped hover>
        <b-thead>
          <b-th>Name</b-th>
          <b-th>Up</b-th>
          <b-th>Down</b-th>
          <b-th></b-th>
        </b-thead>
        <b-tbody>
          <b-tr>
            <b-td><input v-model="newTrendName" placeholder="New Trend"></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td>
              <kendo-button style="font-size:large" @click="createTrend(newTrendName)">Add</kendo-button>
            </b-td>
          </b-tr>
          <b-tr role="row" v-for="trend in trends" :key="trend.id">
            <b-td>{{trend.name}}</b-td>
            <b-td>{{trend.upVotes}}</b-td>
            <b-td>{{trend.downVotes}}</b-td>
            <b-td>
              <kendo-button style="font-size:large" @click="deleteTrend(trend)">Delete</kendo-button>
            </b-td>
          </b-tr>
        </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";
import * as subscriptions from "../graphql/subscriptions";
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  data() {
    return {
      trends: []
    };
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
        this.trends.push(createdTrend.value.data.onCreateTrend);
        this.trends.sort((a, b) => a.name.localeCompare(b.name));
      } 
    });
    API.graphql(graphqlOperation(subscriptions.onDeleteTrend)).subscribe({
      next: deletedTrend => {
        const id = deletedTrend.value.data.onDeleteTrend.id;
        this.trends = this.trends.filter(trend => trend.id !== id )
      } 
    });
  }
}
</script>

<style scoped>
input {
  border: 2px solid silver;
  margin: 1px 4px;
  padding: 2px 2px;
  height: 35px;
  width: 140px;
}
</style>