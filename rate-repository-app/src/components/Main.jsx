import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './../../src/components/RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import BodyMassIndexCalculator from './BodyMassIndexCalculator';
import RepositoryPage from './RepositiryPage';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    backgroundColor: theme.colors.lightBackground,
    padding: 12,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.main}>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/:repositoryId" element={<RepositoryPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/BodyMassIndexCalculator"
            element={<BodyMassIndexCalculator />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </View>
  );
};

export default Main;
