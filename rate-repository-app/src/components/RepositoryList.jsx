import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
      style={styles.list}
    />
  );
};

const RepositoryList = () => {
  const { data, loading } = useRepositories();
  if (loading) return 'loading...';
  return <RepositoryListContainer repositories={data.repositories} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
  list: {
    backgroundColor: theme.colors.lightBackground,
    padding: 12,
  },
});

export default RepositoryList;
