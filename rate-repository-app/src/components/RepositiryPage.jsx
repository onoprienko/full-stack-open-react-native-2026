import { Text, View, StyleSheet } from 'react-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router';
import RepositoryReviews from './RepositiryReviews';

const RepositoryPage = () => {
  const { repositoryId } = useParams();
  const { data, loading } = useRepository(repositoryId);
  if (loading) return <Text>Loading...</Text>;
  if (!data || !data.repository) return <Text>Repository not found</Text>;

  return (
    <View style={styles.container}>
      <RepositoryItem item={data.repository} button />
      <RepositoryReviews repositoryId={repositoryId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RepositoryPage;
