import { gql } from "@apollo/client";

export const REPO_DETAILS = gql`
  fragment RepoDetails on Repository {
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
  fragment UserDetails on User {
    id
    username
    createdAt
    reviewCount
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    userId
    repositoryId
    rating
    createdAt
    text
  }
`;
