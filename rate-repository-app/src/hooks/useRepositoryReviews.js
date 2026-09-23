import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY_REVIEWS } from '../graphql/queries';

const useRepositoryReviews = (repositoryId) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY_REVIEWS, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network',
  });

  return { data, error, loading };
};

export default useRepositoryReviews;
