import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

import useMe from '../hooks/useMe';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client/react';

const AppBar = () => {
  const { data, loading } = useMe();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (loading) return 'loading...';

  const sighOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.scrollView}
      >
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {!data.me ? (
          <Link to="/signin">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        ) : (
          <Pressable onPress={sighOut}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        )}

        <Link to="/BodyMassIndexCalculator">
          <Text style={styles.text}>BodyMassIndexCalculator</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight || 44,
    backgroundColor: theme.colors.textPrimary,
    paddingBottom: 28,
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  text: {
    color: theme.colors.textLight,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontSizes.bold,
  },
});

export default AppBar;
