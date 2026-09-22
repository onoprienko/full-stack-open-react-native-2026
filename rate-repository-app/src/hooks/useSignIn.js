import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    return mutate({
      variables: {
        credentials: {
          password,
          username,
        },
      },
    });
  };

  return [signIn, result];
};

export default useSignIn;
