import { Text, View } from 'react-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router';

const RepositoryPage = () => {
  const { repositoryId } = useParams();
  const { data, loading } = useRepository(repositoryId);
  if (loading) return <Text>Loading...</Text>;
  if (!data || !data.repository) return <Text>Repository not found</Text>;

  return (
    <View>
      <RepositoryItem item={data.repository} button />
    </View>
  );
};

export default RepositoryPage;
