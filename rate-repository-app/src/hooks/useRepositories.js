import { useQuery } from "@apollo/client";

import { GET_QUERY } from "../graphql/queries";

const useRepositories = () => {
  const results = useQuery(GET_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  return { repositories: results.data?.repositories };
};

export default useRepositories;
