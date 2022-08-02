import { gql } from "@apollo/client";

export const REPO_DETAILS = gql`
  fragment repoDetails on Repository {
    ownerAvatarUrl
    description
    fullName
    language
    stargazersCount
    ratingAverage
    reviewCount
    forksCount
    id
    name
    ownerName
    url
    createdAt
  }
`;

export const USER_DETAILS = gql`
  fragment userDetails on User {
    id
    username
    createdAt
    reviewCount
  }
`;

export const REVIEW_DETAILS = gql`
  fragment reviewDetails on Review {
    id
    userId
    repositoryId
    rating
    createdAt
    text
  }
`;

export const PAGE_INFO = gql`
  fragment pageInfo on PageInfo {
    endCursor
    startCursor
    hasNextPage
    hasPreviousPage
  }
`;
