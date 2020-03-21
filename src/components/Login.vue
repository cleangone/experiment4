<template>
  <div class="login">
    <div v-if="!isSignedIn">
      <amplify-authenticator></amplify-authenticator>
    </div>
    <div v-if="isSignedIn">
      <amplify-sign-out></amplify-sign-out>
    </div>

    <!--<p>isSignedIn: {{isSignedIn}}</p>-->
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue';

export default {
  name: 'Login',
  data() {
    return {
      isSignedIn: Boolean
    }
  },
  created() {
    this.isSignedIn = false;
    this.findUser();
    
    AmplifyEventBus.$on('authState', info => {
      if (info === "signedIn") {
        // alert("AmplifyEvent - user found")
        this.findUser();
      }
      else {
        // alert("AmplifyEvent - user not found")
        this.isSignedIn = false;
      }
    });

  },
  methods: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        // alert("findUser - user found")
        this.isSignedIn = true;
        console.log(user);
      }
      catch(err) {
        // alert("findUser - user not found")
        this.isSignedIn = false;
      }
    }
  }
}
</script>

<style scoped></style>
