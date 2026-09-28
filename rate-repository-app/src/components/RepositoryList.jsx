import { Text, FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RepositorySortPicker from './RepositorySortPicker';
import { useState } from 'react';
import RepositorySearch from './RepositorySearch';
import { useDebouncedCallback } from 'use-debounce';

export const RepositoryListContainer = ({
  repositories,
  sortBy,
  setSortBy,
  searchInput,
  handleSearchChange,
  onEndReached,
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
      ListHeaderComponent={
        <>
          <RepositorySearch
            searchInput={searchInput}
            handleSearchChange={handleSearchChange}
          />
          <RepositorySortPicker sortBy={sortBy} setSortBy={setSortBy} />
        </>
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
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
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSetSearchKeyword = useDebouncedCallback((value) => {
    setSearchKeyword(value.trim());
  }, 1000);

  const handleSearchChange = (value) => {
    setSearchInput(value);
    debouncedSetSearchKeyword(value);
  };

  const { data, loading, fetchMore } = useRepositories({
    ...sortBy,
    first: 2,
    searchKeyword,
  });

  if (!data || !data.repositories) {
    if (loading) return <Text>Loading...</Text>;
    return <Text>Repositories not found</Text>;
  }

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      sortBy={sortBy}
      setSortBy={setSortBy}
      searchInput={searchInput}
      handleSearchChange={handleSearchChange}
      onEndReached={fetchMore}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
});

export default RepositoryList;
