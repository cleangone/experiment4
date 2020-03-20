/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const castVote = /* GraphQL */ `
  mutation CastVote($input: CastVoteInput!) {
    castVote(input: $input) {
      id
      name
      votes
      downVotes
    }
  }
`;
export const downVote = /* GraphQL */ `
  mutation DownVote($input: CastVoteInput!) {
    downVote(input: $input) {
      id
      name
      votes
      downVotes
    }
  }
`;
export const createTrend = /* GraphQL */ `
  mutation CreateTrend(
    $input: CreateTrendInput!
    $condition: ModelTrendConditionInput
  ) {
    createTrend(input: $input, condition: $condition) {
      id
      name
      votes
      downVotes
    }
  }
`;
export const updateTrend = /* GraphQL */ `
  mutation UpdateTrend(
    $input: UpdateTrendInput!
    $condition: ModelTrendConditionInput
  ) {
    updateTrend(input: $input, condition: $condition) {
      id
      name
      votes
      downVotes
    }
  }
`;
export const deleteTrend = /* GraphQL */ `
  mutation DeleteTrend(
    $input: DeleteTrendInput!
    $condition: ModelTrendConditionInput
  ) {
    deleteTrend(input: $input, condition: $condition) {
      id
      name
      votes
      downVotes
    }
  }
`;
