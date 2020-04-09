<template>
  <div id="app">
    <table width=100%>
      <tr>
        <td>
          <div class="font-sans text-3xl sm:text-4xl font-light text-blue-700 mb-3">Experiment 4</div>
        </td>
        <td align=right>
          <router-link to="/">Home</router-link>
          &nbsp; &nbsp;<router-link to="/Admin" v-if="isSignedIn">Admin</router-link>
          &nbsp; &nbsp;
          <router-link to="/Account" v-if="!isSignedIn">Login</router-link>
          <router-link to="/Account" v-if="isSignedIn">{{ getAccountLinkText() }}</router-link>
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
  computed: mapGetters(['isSignedIn', 'getFirstName']),
  created() {
    this.findUser();
  },
  methods: {
    getAccountLinkText() {
      let firstName = this.getFirstName
      return (firstName == null || firstName.length == 0 ? "Account" : firstName)
    },
    ...mapActions(['findUser'])
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>