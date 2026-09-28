import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY_REVIEWS } from '../graphql/queries';

const useRepositoryReviews = (variables) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY_REVIEWS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { data, error, loading, fetchMore: handleFetchMore };
};

export default useRepositoryReviews;
