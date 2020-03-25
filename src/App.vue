<template>
  <div id="app">
    <table width=100%>
      <tr>
        <td>
          <div class="font-sans text-3xl sm:text-4xl font-light text-blue-700 mb-3">Experiment 4</div>
        </td>
        <td align=right>
          <router-link to="/">Home</router-link>
          &nbsp; &nbsp;<router-link to="/Video">Video</router-link>
          &nbsp; &nbsp;<router-link to="/Admin" v-if="isSignedIn">Admin</router-link>
          &nbsp; &nbsp;
          <router-link to="/Login" v-if="!isSignedIn">Login</router-link>
          <router-link to="/Login" v-if="isSignedIn">Logout</router-link>
        </td>
        </tr>
    </table>
    <router-view/>
    <br>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters(['isSignedIn']),
  created() {
    this.findUser();
  },
  methods: mapActions(['findUser']),
  mounted() {
  }
}
</script>

<style scoped>
</style>