import { gql } from "@apollo/client";

import {
  REPO_DETAILS,
  REVIEW_DETAILS,
  PAGE_INFO,
  USER_DETAILS,
} from "./fragments";

export const GET_QUERY = gql`
  query (
    $first: Int
    $after: String
    $searchKeyword: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(
      first: $first
      after: $after
      searchKeyword: $searchKeyword
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      edges {
        node {
          ...repoDetails
        }
        cursor
      }
      pageInfo {
        ...pageInfo
      }
    }
  }
  ${REPO_DETAILS}
  ${PAGE_INFO}
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
  query getSingleRepo($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...repoDetails
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...reviewDetails
            user {
              ...userDetails
            }
            repository {
              ...repoDetails
            }
          }
          cursor
        }
        pageInfo {
          ...pageInfo
        }
      }
    }
  }
  ${REVIEW_DETAILS}
  ${USER_DETAILS}
  ${REPO_DETAILS}
  ${PAGE_INFO}
`;

export const GET_REVIEWS = gql`
  query getReviews($id: ID!) {
    repository(id: $id) {
      reviews {
        edges {
          node {
            ...reviewDetails
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
