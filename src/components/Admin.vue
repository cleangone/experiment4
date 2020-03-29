<template>
  <div>
    <mdb-container>
      <b-table-simple striped hover>
          <b-thead>
            <b-th>Name</b-th>
            <b-th>Video ID</b-th>
            <b-th>User</b-th>
            <b-th>Up</b-th>
            <b-th>Down</b-th>
            <b-th>
              <!--<mdb-btn color="info" class="px-1 py-0" @click.native="trendModal=true"><font-awesome-icon icon="plus"/></mdb-btn>-->
            </b-th>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td>
                <!--<input v-model="newName" placeholder="New Trend">-->
                </b-td>
              <b-td>
                <!--<input class="large" v-model="newVideo" placeholder="YouTube Video ID">-->
                </b-td>
              <b-td></b-td>
              <b-td></b-td>
              <b-td></b-td>
              <b-td>
                <span class="pointer hoverable">
                  <font-awesome-icon icon="plus" @click="displayAddModal()"/>
                </span>
              </b-td>
            </b-tr>
            <b-tr role="row" v-for="trend in getTrends" :key="trend.id">
              <b-td>{{trend.name}}</b-td>
              <b-td>{{trend.video}}</b-td>
              <b-td>{{trend.userId}}</b-td>
              <b-td>{{trend.upVotes}}</b-td>
              <b-td>{{trend.downVotes}}</b-td>
              <b-td>
                <span class="pointer hoverable">
                  <font-awesome-icon icon="edit" @click="displayUpdateModal(trend)"/>
                </span>
                <span class="pointer hoverable">
                  <font-awesome-icon icon="trash" @click="deleteTrend(trend)"/>
                </span>
              </b-td>
            </b-tr>
          </b-tbody>
      </b-table-simple>

      <mdb-modal v-if="modalDisplayed" @close="modalDisplayed=false">
        <mdb-modal-header>
          <mdb-modal-title tag="h4" class="w-100 text-center font-weight-bold">{{modalIsAdd ? "Add" : "Update"}} Video</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <form class="mx-3 grey-text">
            <!--<mdb-input label="Name" placeholder="Name" type="text" v-model="this.modalTrend.name"/>-->
            <!--<mdb-input label="Video" placeholder="Video" type="text" v-model="this.modalTrend.video"/>-->

            <mdb-input label="Name" v-model="modalTrend.name" />
            <mdb-input label="Video" v-model="modalTrend.video" />
          </form>
        </mdb-modal-body>
        <mdb-modal-footer class="justify-content-center">
          <!--<mdb-btn color="info" @click.native="handleModalSubmit(getUserId)">{{modalIsAdd ? "Add" : "Update"}}</mdb-btn>-->

          <mdb-btn color="info" @click.native="handleModalSubmit(getUserId)">{{modalIsAdd ? "Add" : "Update"}}</mdb-btn>

        </mdb-modal-footer>
      </mdb-modal>
    </mdb-container>
    <TrendListener></TrendListener>
  </div>
</template>

<script>
import TrendListener from "./TrendListener";
import { API, graphqlOperation } from "aws-amplify";
import { 
  mdbContainer, mdbBtn,mdbInput,
  mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } 
  from "mdbvue";
import { mapGetters, mapActions } from 'vuex';
import * as mutations from "../graphql/mutations";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'Admin',
  components: { TrendListener, 
    mdbContainer, 
    // mdbRow, mdbCol, 
    mdbBtn,
    mdbInput,
    mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
  },
  data() {
    return {
      modalDisplayed: false,
      modalIsAdd: false,
      modalTrend: {}
    }
  },
  computed: mapGetters(['getTrends', 'getUserId']),
  async created() {
    this.retrieveTrends();
  },
  methods: {
    displayAddModal() {
      this.modalTrend = {name:"", video:""}
      this.modalIsAdd = true;
      this.modalDisplayed=true;
    },
    displayUpdateModal(trend) {
      this.modalTrend = trend;
      this.modalIsAdd = false;
      this.modalDisplayed=true;
    },
    handleModalSubmit(userId) {
      if (this.modalTrend.name.length == 0) { return }
      
      if (this.modalIsAdd) {
        var trend = {name:this.modalTrend.name, userId:userId, upVotes:0, downVotes:0};
        if (this.modalTrend.video.length > 0) { trend.video = this.modalTrend.video }
        API.graphql(graphqlOperation(mutations.createTrend, { input: trend }));
      }
      else {
        var sparseUpdateTrend = {id:this.modalTrend.id, name:this.modalTrend.name, userId:userId};
        sparseUpdateTrend.video = this.modalTrend.video.length > 0 ? this.modalTrend.video : null;
        API.graphql(graphqlOperation(mutations.updateTrend, { input: sparseUpdateTrend }));
      }
      this.modalDisplayed = false;
    },

    deleteTrend(trend) {
      this.$dialog.confirm("Delete " + trend.name + "?", { okText:'Delete', cancelText:'Cancel' })
        .then(function() {
          const deleteInput = { id: trend.id };
          API.graphql(graphqlOperation(mutations.deleteTrend, { input: deleteInput }));
        });
    },

//     getUser(userId) {
      
      
//       createPatient = async () => {
//     var params = { 
//       UserPoolId: 'xxxxxxxxxxxxxxxxxxxx', 
//       AttributesToGet: [ "email" ],
//       Filter: "",
//       Limit: 10
//   };

//   var identityService = new AWS.CognitoIdentityServiceProvider();
//       identityService.listUsers(params, function(err, data) {
//         if (err) console.log(err, err.stack); // an error occurred
//         else     console.log(data);         // successful response
//       })
// }
      
      
      
    //   // Auth.
    //   this.$dialog.confirm("Delete " + trend.name + "?", { okText:'Delete', cancelText:'Cancel' })
    //     .then(function() {
    //       const deleteInput = { id: trend.id };
    //       API.graphql(graphqlOperation(mutations.deleteTrend, { input: deleteInput }));
    //     });
    // },



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

.large {
  width: 250px;
}

span.pointer {
  cursor: pointer;
  margin-right: 10px;
}
</style>