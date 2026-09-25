import { useMutation, useApolloClient } from '@apollo/client/react';

import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const apolloClient = useApolloClient();

  const createUser = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        user: {
          password,
          username,
        },
      },
    });

    apolloClient.resetStore();
    return response;
  };

  return [createUser, result];
};

export default useCreateUser;
