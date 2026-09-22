import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          description
          forksCount
          id
          name
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          userHasReviewed
          language
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
