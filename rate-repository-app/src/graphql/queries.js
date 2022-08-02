import { gql } from "@apollo/client";

import { REPO_DETAILS, REVIEW_DETAILS } from "./fragments";

export const GET_QUERY = gql`
  query {
    repositories {
      edges {
        node {
          ...RepoDetails
        }
      }
    }
  }
  ${REPO_DETAILS}
`;

export const GET_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_SINGLE_REPO = gql`
  query getSingleRepo($id: ID!) {
    repository(id: $id) {
      ...RepoDetails
    }
  }
  ${REPO_DETAILS}
`;

export const GET_REVIEWS = gql`
  query getReviews($id: ID!) {
    repository(id: $id) {
      reviews {
        edges {
          node {
            ...ReviewDetails
            user {
              username
            }
          }
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`;
