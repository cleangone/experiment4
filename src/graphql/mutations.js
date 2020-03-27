/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const upVote = /* GraphQL */ `
  mutation UpVote($input: CastVoteInput!) {
    upVote(input: $input) {
      id
      name
      video
      upVotes
      downVotes
      userId
    }
  }
`;
export const downVote = /* GraphQL */ `
  mutation DownVote($input: CastVoteInput!) {
    downVote(input: $input) {
      id
      name
      video
      upVotes
      downVotes
      userId
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
      video
      upVotes
      downVotes
      userId
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
      video
      upVotes
      downVotes
      userId
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
      video
      upVotes
      downVotes
      userId
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      nickname
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      nickname
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      nickname
    }
  }
`;
