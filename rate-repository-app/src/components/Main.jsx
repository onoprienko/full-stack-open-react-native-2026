import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './../../src/components/RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ReviewForm from './ReviewForm';
import RepositoryPage from './RepositiryPage';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    backgroundColor: theme.colors.lightBackground,
    padding: 12,
    flex: 1,
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-a-review" element={<ReviewForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </View>
  );
};

export default Main;
