import { Text, FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      style={{ flex: 1 }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

const RepositoryList = () => {
  const { data, loading } = useRepositories();
  if (loading) return <Text>Loading...</Text>;
  return <RepositoryListContainer repositories={data.repositories} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
});

export default RepositoryList;
