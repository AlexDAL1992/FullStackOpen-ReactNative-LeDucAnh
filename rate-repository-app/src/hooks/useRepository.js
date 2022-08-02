import { useQuery } from "@apollo/client";

import { GET_SINGLE_REPO } from "../graphql/queries";

const useRepository = (variables) => {
  const { data, loading, fetchMore } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const repository = data?.repository;

  const handleFetchMore = () => {
    const canFetchMore = !loading && repository?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        ...variables,
        after: repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return { repository: data?.repository, fetchMore: handleFetchMore, loading };
};

export default useRepository;
