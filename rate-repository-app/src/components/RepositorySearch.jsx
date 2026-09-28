import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import theme from '../theme';

const RepositorySearch = ({ searchInput, handleSearchChange }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={handleSearchChange}
      value={searchInput}
      style={styles.searchbar}
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    maxWidth: 640,
    backgroundColor: theme.colors.textLight,
    border: 'none',
  },
});

export default RepositorySearch;
