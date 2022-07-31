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
  }
`;
