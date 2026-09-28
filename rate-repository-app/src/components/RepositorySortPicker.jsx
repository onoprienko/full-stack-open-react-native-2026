import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';

const RepositorySortPicker = ({ sortBy, setSortBy }) => {
  const SORT_OPTIONS = [
    {
      value: {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      },
      name: 'Latest repositories',
    },
    {
      value: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      },
      name: 'Highest rated repositories',
    },
    {
      value: {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      },
      name: 'Lowest rated repositories',
    },
  ];
  return (
    <Picker
      selectedValue={JSON.stringify(sortBy)}
      onValueChange={(itemValue) => setSortBy(JSON.parse(itemValue))}
      style={styles.picker}
    >
      {SORT_OPTIONS.map((item) => (
        <Picker.Item
          key={item.name}
          label={item.name}
          value={JSON.stringify(item.value)}
        />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    padding: 20,
    maxWidth: 640,
    backgroundColor: theme.colors.lighterBackground,
    border: 'none',
  },
});

export default RepositorySortPicker;
