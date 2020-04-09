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
            </b-th>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td></b-td>
              <b-td></b-td>
              <b-td></b-td>
              <b-td></b-td>
              <b-td></b-td>
              <b-td>
                <span class="pointer hoverable">
                  <font-awesome-icon icon="plus" @click="displayAddModal()"/>
                </span>
              </b-td>
            </b-tr>

            <b-tr role="row" v-for="trend in getTrendsByUserId(userId)" :key="trend.id">
            <!--<b-tr role="row" v-for="trend in trends" :key="trend.id">-->
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
            <mdb-input label="Name" v-model="modalTrend.name" />
            <mdb-input label="Video" v-model="modalTrend.video" />
          </form>
        </mdb-modal-body>
        <mdb-modal-footer class="justify-content-center">
          <mdb-btn color="info" @click.native="handleModalSubmit(getUserId)">{{modalIsAdd ? "Add" : "Update"}}</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>
    </mdb-container>
    <TrendListener></TrendListener>
  </div>
</template>

<script>
import TrendListener from "../TrendListener";
import { API, graphqlOperation } from "aws-amplify";
import { 
  mdbContainer, mdbBtn,mdbInput,
  mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } 
  from "mdbvue";
import { mapGetters, mapActions } from 'vuex';
import * as mutations from "../../graphql/mutations";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'EditTrends',
  components: { TrendListener, 
    mdbContainer, mdbBtn, mdbInput,
    mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
  },
  props: {
    userId: String
  },
  data() {
    return {
      modalDisplayed: false,
      modalIsAdd: false,
      modalTrend: {}
    }
  },
  computed: mapGetters(['getTrends', 'getTrendsByUserId', 'getUserId']),
  async created() {
    this.retrieveTrends();
  },
  methods: {
    getDisplayTrends() {
      return this.getTrends;
    },

    displayAddModal() {
      this.modalTrend = {name:"", video:""}
      this.modalIsAdd = true;
      this.modalDisplayed=true;
    },
    displayUpdateModal(trend) {
      this.modalTrend = {id:trend.id, name:trend.name, video:trend.video}
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