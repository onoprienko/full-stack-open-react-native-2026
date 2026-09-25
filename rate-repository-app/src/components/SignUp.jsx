import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at max 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be at max 50 characters long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), 'Passwords do not match'])
    .required('Password confirmation is required'),
});

export const SignUpContainer = ({ formik }) => {
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
      <View>
        <TextInput
          placeholder="Password confirmation"
          value={formik.values.passwordConfirmation}
          onChangeText={formik.handleChange('passwordConfirmation')}
          onBlur={formik.handleBlur('passwordConfirmation')}
          style={[
            styles.input,
            formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation &&
              styles.inputError,
          ]}
          secureTextEntry
        />
        {formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation && (
            <Text style={{ color: theme.colors.error }}>
              {formik.errors.passwordConfirmation}
            </Text>
          )}
      </View>

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.button.text}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useCreateUser();
  const [signIn] = useSignIn();

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: async ({ username, password }) => {
      if (username && password) {
        try {
          const { data } = await signUp({
            username,
            password,
          });
          console.log('🔵', data);
          try {
            const { data } = await signIn({
              username,
              password,
            });
            console.log('🔵', data);
            navigate('/');
          } catch (error) {
            console.error('🟠', error.message);
          }
        } catch (error) {
          console.error('🟠', error.message);
        }
      }
    },
  });

  //console.log(formik);
  return <SignUpContainer formik={formik} />;
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

export default SignUp;
