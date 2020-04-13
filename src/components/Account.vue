<template>
  <div class="login">
    <div v-if="isSignedIn">
      <br><br><br>
      <amplify-sign-out></amplify-sign-out>

      <div>
        <input v-model="firstName" placeholder="First">
        <input v-model="lastName" placeholder="Last">
        <input v-model="phone" placeholder="Phone">
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
      user: { firstName: null, lastName: null, phone: null }
    }
  },
  computed: {
    ...mapGetters(['isSignedIn', 'getUserId', 'getFirstName', 'getLastName', 'getPhone']),
    firstName: {
      get() { return this.getFirstName },
      set(value) { this.user.firstName = value }
    },
    lastName: {
      get() { return this.getLastName },
      set(value) { this.user.lastName = value }
    },
    phone: {
      get() { return this.getPhone },
      set(value) { this.user.phone = value }
    }
  },
  
  created() {
    this.findUser();
    AmplifyEventBus.$on('authState', info => {
      if (info === "signedIn") { 
        this.findUser() 
      }
      else { this.logout() }
    });
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
