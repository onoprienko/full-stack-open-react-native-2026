import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(3, 'Password must be at least 3 characters long')
    .required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async ({ username, password }) => {
      if (username && password) {
        try {
          const { data } = await signIn({
            username,
            password,
          });
          console.log('🔵', data);
        } catch (error) {
          console.error('🟠', error.message);
        }
      }
    },
  });

  //console.log(formik);
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
          style={[
            styles.input,
            formik.touched.username &&
              formik.errors.username &&
              styles.inputError,
          ]}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.username}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          style={[
            styles.input,
            formik.touched.password &&
              formik.errors.password &&
              styles.inputError,
          ]}
          secureTextEntry
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.password}
          </Text>
        )}
      </View>

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.button.text}>Sign in</Text>
      </Pressable>
    </View>
  );
};

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
  inputError: {
    borderColor: theme.colors.error,
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

export default SignIn;
