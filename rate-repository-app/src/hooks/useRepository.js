import { useQuery } from "@apollo/client";

import { GET_SINGLE_REPO } from "../graphql/queries";

const useRepository = (id) => {
  const results = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: "cache-and-network",
    variables: {
      id,
    },
  });

  return { repository: results.data?.repository };
};

export default useRepository;
