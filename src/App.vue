<template>
  <div id="app">
    <div>
      <!--todo - add border-->
      <input v-model="newTodoName" placeholder="New Item">
      
      <!--todo - make look like button-->
      <button @click="createTodo(newTodoName)">Add</button>
    </div>
    

    <div class="mx-auto flex mt-4">
      <button v-for="(candidate, index) in candidates" v-bind:key="candidate.id" @click="castVote(candidate.id)"
        v-bind:class="`focus:outline-none flex-1 h-max text-white text-sm sm:text-lg font-semibold py-2 px-2 mx-1 md:h-18 h-18 rounded bg-${candidateColors[index]}-600 hover:bg-${candidateColors[index]}-800`">
        {{candidate.name}}<p>{{candidate.votes}}</p>
      </button>
    </div>
    <h1 class="text-gray-800 font-bold mt-8 mb-3">Live updates</h1>
    <VoteChart v-bind:chartData="chartData" width="200" height="110"></VoteChart>
    
    <div class="mx-auto flex mt-4">
      <button v-for="(candidate, index) in candidates" v-bind:key="candidate.id" @click="deleteTodo(candidate)"
        v-bind:class="`focus:outline-none flex-1 h-max text-white text-sm sm:text-lg font-semibold py-2 px-2 mx-1 md:h-18 h-18 rounded bg-${candidateColors[index]}-600 hover:bg-black`">
        <p>Delete</p>{{candidate.name}}
      </button>
    </div>
 
  </div>
</template>

<script>
import VoteChart from "./components/VoteChart";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";

const distinctColors = ["red", "orange", "green", "blue"]
const distinctBackgroundColors = ["#e53e3e", "#dd6b20", "#38a169", "#3182ce"]
const colors = distinctColors.concat(distinctColors)
const backgroundColors = distinctBackgroundColors.concat(distinctBackgroundColors)

export default {
  components: { VoteChart },
  data() {
    return {
      candidates: [],
      candidateColors: colors
    };
  },
  computed: {
    chartData: function() {
      return {
        labels: this.candidates.map(candidate => candidate.name),
        datasets: [{
            label: false,
            data: this.candidates.map(candidate => candidate.votes),
            backgroundColor: backgroundColors
          }]};
    }
  },
  async created() {
    await API.graphql(graphqlOperation(queries.listTodos)).then(
      res => (this.candidates = res.data.listTodos.items)
    );
  },
  methods: {
   createTodo(name) {
      // alert ("creating " + name);
      const todo = {name:name, votes:0};
      API.graphql(graphqlOperation(mutations.createTodo, { input: todo }));
      this.newTodoName = '';
    },
    castVote(id) {
      const voteInput = { id: id };
      API.graphql(graphqlOperation(mutations.castVote, { input: voteInput }));
    },
    deleteTodo(todo) {
      //alert ("deleteTodo " + todo.name);
      this.$dialog.confirm("Delete " + todo.name + "?", { okText:'Delete', cancelText:'Cancel' })
        .then(function() {
          const deleteInput = { id: todo.id };
          API.graphql(graphqlOperation(mutations.deleteTodo, { input: deleteInput }));
        });
    }
  },
  mounted() {
    API.graphql(graphqlOperation(subscriptions.onCastVote)).subscribe({
      next: voteCasted => {
        const id = voteCasted.value.data.onCastVote.id;
        const votes = voteCasted.value.data.onCastVote.votes;
        const candidate = this.candidates.find(candidate => candidate.id === id);
        candidate.votes = votes;
      }
    });
    API.graphql(graphqlOperation(subscriptions.onCreateTodo)).subscribe({
      next: createdTodo => {
        //alert ("subscriptions.onCreateTodo: " + createdTodo.value.data.onCreateTodo.name);
        this.candidates.push(createdTodo.value.data.onCreateTodo);
      } 
    });
    API.graphql(graphqlOperation(subscriptions.onDeleteTodo)).subscribe({
      next: deletedTodo => {
        //alert ("subscriptions.onDeleteTodo: " + deletedTodo.value.data.onDeleteTodo.name);
        const id = deletedTodo.value.data.onDeleteTodo.id;
        this.candidates = this.candidates.filter(candidate => candidate.id !== id )
      } 
    });
  }
};
</script>