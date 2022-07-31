import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_QUERY } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);
  const results = useQuery(GET_QUERY);

  const fetchRepositories = async () => {
    setLoading(results.loading);
    setRepositories(results.data.repositories);
  };

  useEffect(() => {
    fetchRepositories();
  }, [loading, repositories]);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
