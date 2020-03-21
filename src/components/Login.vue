<template>
  <div class="login">
    <div v-if="!isSignedIn">
      <amplify-authenticator></amplify-authenticator>
    </div>
    <div v-if="isSignedIn">
      <amplify-sign-out></amplify-sign-out>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Login',
  computed: mapGetters(['isSignedIn']),
  created() {
    this.findUser();
    
    AmplifyEventBus.$on('authState', info => {
      if (info === "signedIn") { this.findUser() }
      else { this.setSignedIn(false) }
    });
  },
  methods: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.setSignedIn(true)
        console.log(user);
      }
      catch(err) {
        this.setSignedIn(false)
      }
    },
    ...mapActions(['setSignedIn'])
  }
}
</script>

<style scoped></style>
