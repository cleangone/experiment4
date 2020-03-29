<template>
  <div>
    <span class="badge badge-primary ml-2">+</span>
    <span class="badge badge-danger ml-2">-</span>
    <div class="media mt-1">
      <h3 class="h3-responsive font-weight-bold mr-3 pt-0">{{time}}</h3>
      <div class="media-body mb-3 mb-lg-3">
        <!--badge not working - should put a red box around the "-"-->
        <mdb-badge tag="a" color="danger-color" class="ml-2 float-right">-</mdb-badge>
        <h6 v-if="title" class="mt-0 font-weight-bold">{{title}}</h6>
        <hr class="hr-bold my-2">

        <p class="font-smaller mb-0">
          <mdb-icon icon="location-arrow"/> {{location}}
        </p>
      </div>
    </div>
    <p class="p-2 mb-4 blue-grey lighten-5">{{description}}</p>
  </div>
</template>

<script>
import { mdbBadge, mdbIcon } from "mdbvue";

export default {
  name: "AdminItem",
  components: { 
    mdbBadge, 
    mdbIcon 
  },
  props: {
    index: {
      type: Number
    },
    time: {
      type: String
    },
    title: {
      type: String
    },
    location: {
      type: String
    },
    description: {
      type: String
    }
  },
  methods: {
    onDelete() {
      this.$emit("delete", this.index);
    }
  }
};
</script>

<style scoped>
</style>