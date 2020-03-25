<template>
  <div>
    <b-table-simple striped hover>
        <b-thead>
          <b-th>Name</b-th>
          <b-th>Video</b-th>
          <b-th>Up</b-th>
          <b-th>Down</b-th>
          <b-th></b-th>
        </b-thead>
        <b-tbody>
          <b-tr>
            <b-td><input v-model="newTrendName" placeholder="New Trend"></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td></b-td>
            <b-td>
              <kendo-button style="font-size:large" @click="createTrend(newTrendName)">Add</kendo-button>
            </b-td>
          </b-tr>
          <b-tr role="row" v-for="trend in getTrends" :key="trend.id">
            <b-td>{{trend.name}}</b-td>
            <b-td></b-td>
            <b-td>{{trend.upVotes}}</b-td>
            <b-td>{{trend.downVotes}}</b-td>
            <b-td>
              <span class="pointer">
                <font-awesome-icon icon="edit"/>
              </span>
              <span class="pointer">
                <font-awesome-icon icon="trash" @click="deleteTrend(trend)"/>
              </span>
            </b-td>
          </b-tr>
        </b-tbody>
    </b-table-simple>
    <TrendListener></TrendListener>
  </div>
</template>

<script>
import TrendListener from "./TrendListener";
import { API, graphqlOperation } from "aws-amplify";
import { mapGetters, mapActions } from 'vuex';
import * as mutations from "../graphql/mutations";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'Admin',
  components: { TrendListener },
  computed: mapGetters(['getTrends']),
  async created() {
    this.retrieveTrends();
  },
  methods: {
    createTrend(name) {
      const trend = {name:name, upVotes:0, downVotes:0};
      API.graphql(graphqlOperation(mutations.createTrend, { input: trend }));
      this.newTrendName = '';
    },
    deleteTrend(trend) {
      this.$dialog.confirm("Delete " + trend.name + "?", { okText:'Delete', cancelText:'Cancel' })
        .then(function() {
          const deleteInput = { id: trend.id };
          API.graphql(graphqlOperation(mutations.deleteTrend, { input: deleteInput }));
        });
    },
    ...mapActions(['retrieveTrends']) 
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
span.pointer {
  cursor: pointer;
  margin-right: 10px;
}
</style>