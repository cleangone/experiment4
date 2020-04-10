<template>
  <div class="login">
    <div v-if="isSignedIn">
      <br><br><br>
      <amplify-sign-out></amplify-sign-out>

      <div>
        <input v-model="user.firstName" placeholder="First">
        <input v-model="user.lastName" placeholder="Last">
        <input v-model="user.phone" placeholder="Phone">
        <br>
        <kendo-button style="margin: 6px 4px" @click="updateAccount">Update</kendo-button>
      </div>

      <br><br>
      <EditTrends v-bind:userId=getUserId /> 
    </div>
    <div v-else>
      <!--<amplify-forgot-password></amplify-forgot-password>-->

      <amplify-authenticator></amplify-authenticator>
    </div>
  </div>
</template>

<script>
import EditTrends from "./common/EditTrends";
import { AmplifyEventBus } from 'aws-amplify-vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Login',
  components: { EditTrends },
   data() {
    return {
      user: null
    }
  },
  computed: mapGetters(['isSignedIn', 'getUserId', 'getUser']),
  created() {
    AmplifyEventBus.$on('authState', info => {
      if (info === "signedIn") { 
        this.findUser() 
      }
      else { this.logout() }

      this.user = this.getUser
    });

    this.user = this.getUser
  },
  methods: {
    updateAccount() {
      this.updateUser(this.user)
   },
    ...mapActions(['findUser', 'updateUser', 'logout'])
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
