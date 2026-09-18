import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import RepositoryList from './../../src/components/RepositoryList';
import AppBar from './AppBar';
import AppBarTab from './AppBarTab';

const Main = () => {
  return (
    <View style={0}>
      <AppBar />
      <Text>Rate Repository Application</Text>
      <AppBarTab>
        <RepositoryList />
      </AppBarTab>
      <StatusBar style="auto" />
    </View>
  );
};

export default Main;
