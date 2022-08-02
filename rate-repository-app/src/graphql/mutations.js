import { gql } from "@apollo/client";

import { REPO_DETAILS, REVIEW_DETAILS, USER_DETAILS } from "./fragments";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($user: CreateUserInput!) {
    createUser(user: $user) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      ...ReviewDetails
      repository {
        ...RepoDetails
      }
    }
  }
  ${REPO_DETAILS}
  ${REVIEW_DETAILS}
`;
