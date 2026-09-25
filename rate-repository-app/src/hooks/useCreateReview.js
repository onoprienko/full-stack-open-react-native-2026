import { useMutation, useApolloClient } from '@apollo/client/react';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async ({ ownerName, rating, repositoryName, text }) => {
    const response = await mutate({
      variables: {
        review: {
          ownerName,
          rating,
          repositoryName,
          text,
        },
      },
    });

    apolloClient.resetStore();
    return response;
  };

  return [createReview, result];
};

export default useCreateReview;
