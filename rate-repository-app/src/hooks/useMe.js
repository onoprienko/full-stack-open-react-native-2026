import { useQuery } from '@apollo/client/react';
import { GET_ME } from '../graphql/queries';

const useMe = ({ includeReviews }) => {
  const { data, error, loading } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews },
  });

  return { data, error, loading };
};

export default useMe;
