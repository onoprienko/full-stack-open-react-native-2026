import { useQuery } from '@apollo/client/react';
import { GET_ME } from '../graphql/queries';

const useMe = () => {
  const { data, error, loading } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });

  return { data, error, loading };
};

export default useMe;
