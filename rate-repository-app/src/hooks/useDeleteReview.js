import { useMutation, useApolloClient } from '@apollo/client/react';

import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient();

  const deleteReview = async ({ id }) => {
    const response = await mutate({
      variables: {
        deleteReviewId: id,
      },
    });

    apolloClient.resetStore();
    return response;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
