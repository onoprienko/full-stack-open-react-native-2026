import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './../../src/components/RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ReviewForm from './ReviewForm';
import RepositoryPage from './RepositiryPage';
import theme from '../theme';
import UserReviews from './UserReviews';
import useMe from '../hooks/useMe';

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
  const { data, loading } = useMe({ includeReviews: true });
  if (loading) return 'loading...';
  console.log('📅', data);
  return (
    <View style={styles.container}>
      <AppBar me={data?.me} />
      <View style={styles.main}>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/:repositoryId" element={<RepositoryPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-a-review" element={<ReviewForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/my-reviews"
            element={<UserReviews reviews={data?.me?.reviews} />}
          />
        </Routes>
      </View>
    </View>
  );
};

export default Main;
