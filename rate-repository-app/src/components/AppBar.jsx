import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight || 44,
    backgroundColor: theme.colors.textPrimary,
    paddingBottom: 28,
    paddingLeft: 20,
    paddingRight: 20,
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
      <Pressable
        onPress={() => {
          console.log('🧈');
        }}
      >
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
