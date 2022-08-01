import { useMutation, useApolloClient } from "@apollo/client";

import useAuthStorage from "../hooks/useAuthStorage";
import { LOGIN } from "../graphql/mutations";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [login, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    const { data } = await login({
      variables: { username, password },
    });

    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
