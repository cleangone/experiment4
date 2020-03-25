<script>
import { mapActions } from 'vuex';
import { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "../graphql/subscriptions";

var createSubscription, deleteSubscription, upVoteSubscription, downVoteSubscription

export default {
  name: 'TrendListener',
  methods: {
    ...mapActions(['addStoredTrend', 'deleteStoredTrend', 'addStoredUpVote', 'addStoredDownVote']) 
  },
  mounted() {
    createSubscription = API.graphql(graphqlOperation(subscriptions.onCreateTrend)).subscribe({
      next: createdTrend => {
        this.addStoredTrend(createdTrend.value.data.onCreateTrend)
      } 
    });
    
    deleteSubscription = API.graphql(graphqlOperation(subscriptions.onDeleteTrend)).subscribe({
      next: deletedTrend => {
        this.deleteStoredTrend(deletedTrend.value.data.onDeleteTrend)
      } 
    });
    
    upVoteSubscription = API.graphql(graphqlOperation(subscriptions.onUpVote)).subscribe({
      next: voteCasted => {
        this.addStoredUpVote(voteCasted.value.data.onUpVote)
      }
    });
    
    downVoteSubscription = API.graphql(graphqlOperation(subscriptions.onDownVote)).subscribe({
      next: voteCasted => {
        this.addStoredDownVote(voteCasted.value.data.onDownVote)
      }
    });
  },
  destroyed() {
      createSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
      upVoteSubscription.unsubscribe();
      downVoteSubscription.unsubscribe();
  }
};
</script>

