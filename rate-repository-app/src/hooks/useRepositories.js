import { useQuery } from "@apollo/client";

import { GET_QUERY } from "../graphql/queries";

const useRepositories = (variables) => {
  const results = useQuery(GET_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  return { repositories: results.data?.repositories };
};

export default useRepositories;
