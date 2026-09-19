import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

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

const AppBar = () => {
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
        <Link to="/signin">
          <Text style={styles.text}>SignIn</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
