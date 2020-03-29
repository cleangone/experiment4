<template>
  <div class="login">
    <div v-if="isSignedIn">
      <br>
      
      <!--<input v-model="nickname" placeholder="Nickname">-->
      <!--<kendo-button v-if="hasNickname" style="font-size:large" @click="createUser(getUserId)">Add</kendo-button>-->
      <!--<kendo-button v-if="!hasNickname" style="font-size:large" @click="createUser(getUserId)">Update</kendo-button>-->
     
      <br><br>
      <amplify-sign-out></amplify-sign-out>
    </div>
    <div v-else>
    <!--<div v-if="!isSignedIn">-->
      <amplify-authenticator></amplify-authenticator>
    </div>

    
   
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue';
// import { API, graphqlOperation } from "aws-amplify";
import { mapGetters, mapActions } from 'vuex';
// import * as mutations from "../graphql/mutations";

export default {
  name: 'Login',
  computed: mapGetters(['isSignedIn', 'getUserId']),
  created() {
    AmplifyEventBus.$on('authState', info => {
      if (info === "signedIn") { 
        this.findUser() 
        
        
        // alert("Login.created calling retrieveUser")
        // this.retrieveUser(this.getUserId())
      }
      else { this.logout() }
    });
  },
  methods: {
   
    // createUser(userId) {
    //   console.log("createUser: userId=" + userId)
    //   alert("createUser: userId=" + userId)
    //   const createUserInput = { id:userId, nickname:this.nickname };
    //   API.graphql(graphqlOperation(mutations.createUser, { input: createUserInput }));
    // },
    // updateUser(userId) {
    //   alert("updateUser: userId=" + userId)
    //   const updateUserInput = { id:userId, nickname:this.nickname };
    //   API.graphql(graphqlOperation(mutations.updateUser, { input: updateUserInput }));
    // },



    ...mapActions(['findUser', 'logout'])
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
