import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    maxWidth: 640,
    display: 'flex',
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    padding: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    text: {
      color: theme.colors.textLight,
      fontWeight: theme.fontWeights.bold,
    },
  },
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: ({ username, password }) => {
      if (username && password) console.log(username, password);
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={styles.input}
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.button.text}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
