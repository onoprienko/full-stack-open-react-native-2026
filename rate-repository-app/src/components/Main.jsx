import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RepositoryList from './../../src/components/RepositoryList';
import PressableText from './../../src/components/PressableText';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
});

const Main = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Rate Repository Application</Text>
        <RepositoryList />
        <StatusBar style="auto" />
      </View>
    </>
  );
};

export default Main;
