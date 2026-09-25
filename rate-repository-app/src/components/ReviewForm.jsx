import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

import useCreateReview from '../hooks/useCreateReview';

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(3, 'Repository owner name must be at least 3 characters long')
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .min(3, 'Repository name must be at least 3 characters long')
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at max 100')
    .required('Rating is required'),
  text: yup.string().min(3, 'Review must be at least 3 characters long'),
});

export const ReviewFormContainer = ({ formik }) => {
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Repository owner name"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          onBlur={formik.handleBlur('ownerName')}
          style={[
            styles.input,
            formik.touched.ownerName &&
              formik.errors.ownerName &&
              styles.inputError,
          ]}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.ownerName}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          placeholder="Repository name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          onBlur={formik.handleBlur('repositoryName')}
          style={[
            styles.input,
            formik.touched.repositoryName &&
              formik.errors.repositoryName &&
              styles.inputError,
          ]}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.repositoryName}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          placeholder="Rating between 0 and 100"
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          onBlur={formik.handleBlur('rating')}
          style={[
            styles.input,
            formik.touched.rating && formik.errors.rating && styles.inputError,
          ]}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.rating}
          </Text>
        )}
      </View>
      <View>
        <TextInput
          placeholder="Review"
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          onBlur={formik.handleBlur('text')}
          style={[
            styles.input,
            formik.touched.text && formik.errors.text && styles.inputError,
          ]}
          multiline
        />
        {formik.touched.text && formik.errors.text && (
          <Text style={{ color: theme.colors.error }}>
            {formik.errors.text}
          </Text>
        )}
      </View>

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.button.text}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    },
    validationSchema,
    onSubmit: async ({ ownerName, repositoryName, rating, text }) => {
      if (ownerName && repositoryName && rating) {
        try {
          const { data } = await createReview({
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          });
          console.log('🔵', data);
          navigate(`/${data.createReview.repositoryId}`);
        } catch (error) {
          console.error('🟠', error.message);
        }
      }
    },
  });

  //console.log(formik);
  return <ReviewFormContainer formik={formik} />;
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

export default ReviewForm;
