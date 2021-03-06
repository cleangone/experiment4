/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrend = /* GraphQL */ `
  query GetTrend($id: ID!) {
    getTrend(id: $id) {
      id
      name
      video
      upVotes
      downVotes
      userId
    }
  }
`;
export const listTrends = /* GraphQL */ `
  query ListTrends(
    $filter: ModelTrendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrends(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        video
        upVotes
        downVotes
        userId
      }
      nextToken
    }
  }
`;
