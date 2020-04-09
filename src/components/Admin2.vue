<template>
  <div>
    <mdb-container>
    <!--col widths in "blocks"-->
    <mdb-row>
      <mdb-col col="9">
        <!--note that key item.id does not exist-->
        <AdminItem
          v-for="(item, index) in adminItems" v-bind:key="index"
          :index="item.index"
          :time="item.time"
          :title="item.title"
          :location="item.location"
          :description="item.description"
        />
      </mdb-col>
      <mdb-col col="3">
            <mdb-btn color="info" @click.native="modal=true">Add Event</mdb-btn>
      </mdb-col>
    </mdb-row>
    
    <mdb-modal v-if="modal" @close="modal = false">
      <mdb-modal-header>
        <mdb-modal-title tag="h4" class="w-100 text-center font-weight-bold">Add new event</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form class="mx-3 grey-text">
          <mdb-input
            name="title"
            label="Title"
            icon="edit"
            placeholder="Briefing"
            type="text"
            @input="handleInput($event, 'title')"
          />
         
        </form>
      </mdb-modal-body>
      <mdb-modal-footer class="justify-content-center">
        <mdb-btn color="info" @click.native="addItem">Add</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

  </mdb-container>
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn,mdbInput,
  mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } 
  from "mdbvue";
import AdminItem from "./AdminItem";

export default {
  name: "App",
  components: {
    AdminItem,
    mdbContainer, mdbRow, mdbCol, mdbBtn,
    mdbInput,
    mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
  },
  data() {
    return {
      adminItems: [
        {
          time: "10:00",
          title: "Breakfast with Simon",
          location: "Lounge Caffe",
          description: "Discuss Q3 targets"
        },
        {
          time: "10:30",
          title: "Daily Standup Meeting (recurring)",
          location: "Warsaw Spire Office"
        },
        {
          time: "11:00",
          title: "Call with HRs"
        },
        {
          time: "12:00",
          title: "Lunch with Timmoty",
          location: "Canteen",
          description: "Project evalutation"
        }
      ],
      modal: false,
      newValues: []
    };
  },
  methods: {
    handleDelete(eventIndex) {
      this.events.splice(eventIndex, 1);
    },
    handleInput(val, type) {
      this.newValues[type] = val;
    },
    addItem() {
      this.adminItems.push({
        title: this.newValues["title"],
      });
    }
  }
  
}
</script>

<style scoped>
</style>