import { gql } from '@apollo/client';

export const REPO_FIELDS = gql`
  fragment RepoFields on Repository {
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
`;

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      fullName
    }
  }
`;
