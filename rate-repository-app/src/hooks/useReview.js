import { useQuery } from "@apollo/client";

import { GET_REVIEWS } from "../graphql/queries";

const useReview = (id) => {
  const results = useQuery(GET_REVIEWS, {
    fetchPolicy: "cache-and-network",
    variables: {
      id,
    },
  });

  return { reviews: results.data?.repository.reviews.edges };
};

export default useReview;
