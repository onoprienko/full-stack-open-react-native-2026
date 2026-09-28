import { Text, FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RepositorySortPicker from './RepositorySortPicker';
import { useState } from 'react';

export const RepositoryListContainer = ({
  repositories,
  sortBy,
  setSortBy,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      style={{ flex: 1 }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={() => (
        <RepositorySortPicker sortBy={sortBy} setSortBy={setSortBy} />
      )}
    />
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState({
    value: {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
    },
    name: 'Latest repositories',
  });
  const { data, loading } = useRepositories(sortBy);
  if (loading) return <Text>Loading...</Text>;
  if (!data || !data.repositories) return <Text>Repositories not found</Text>;
  return (
    <RepositoryListContainer
      repositories={data.repositories}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
});

export default RepositoryList;
