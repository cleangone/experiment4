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
export default {
  name: 'Login',
  props: {
    isSignedIn: Boolean
  },
  created() {
    this.signedIn = false;
  }
}
</script>

<style scoped></style>
