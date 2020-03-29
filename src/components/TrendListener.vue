<script>
import { mapActions } from 'vuex';
import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "../graphql/subscriptions";

var createSubscription, updateSubscription, deleteSubscription, upVoteSubscription, downVoteSubscription

export default {
  name: 'TrendListener',
  methods: {
    ...mapActions(['addStoredTrend', 'updateStoredTrend', 'deleteStoredTrend', 'addStoredUpVote', 'addStoredDownVote']) 
  },
  mounted() {
    createSubscription = API.graphql(graphqlOperation(subscriptions.onCreateTrend)).subscribe({
      next: result => { this.addStoredTrend(result.value.data.onCreateTrend) } 
    });
    
    updateSubscription = API.graphql(graphqlOperation(subscriptions.onUpdateTrend)).subscribe({
      next: result => { this.updateStoredTrend(result.value.data.onUpdateTrend) } 
    });
    
    deleteSubscription = API.graphql(graphqlOperation(subscriptions.onDeleteTrend)).subscribe({
      next: result => { this.deleteStoredTrend(result.value.data.onDeleteTrend) } 
    });
    
    upVoteSubscription = API.graphql(graphqlOperation(subscriptions.onUpVote)).subscribe({
      next: result => { this.addStoredUpVote(result.value.data.onUpVote) }
    });
    
    downVoteSubscription = API.graphql(graphqlOperation(subscriptions.onDownVote)).subscribe({
      next: result => { this.addStoredDownVote(result.value.data.onDownVote) }
    });
  },
  destroyed() {
      createSubscription.unsubscribe();
      updateSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
      upVoteSubscription.unsubscribe();
      downVoteSubscription.unsubscribe();
  }
};
</script>

