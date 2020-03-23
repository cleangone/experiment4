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
import { AmplifyEventBus } from 'aws-amplify-vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Login',
  computed: mapGetters(['isSignedIn']),
  created() {
    AmplifyEventBus.$on('authState', info => {
      if (info === "signedIn") { this.findUser() }
      else { this.setSignedIn(false) }
    });
  },
  methods: {
    ...mapActions(['findUser', 'setSignedIn'])
  }
}
</script>

<style scoped></style>
