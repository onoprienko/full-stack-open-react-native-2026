import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './../../src/components/RepositoryList';
import AppBar from './AppBar';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <AppBarTab>
        <RepositoryList style={styles.tab} />
      </AppBarTab>
      <StatusBar style="auto" />
    </View>
  );
};

export default Main;
