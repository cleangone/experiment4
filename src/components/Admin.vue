<template>
  <div>
    <EditTrends v-bind:userId=null /> 
  </div>
</template>

<script>
import EditTrends from "./common/EditTrends";

export default {
  name: 'Admin',
  components: { EditTrends },
}
</script>

<style scoped>
</style>