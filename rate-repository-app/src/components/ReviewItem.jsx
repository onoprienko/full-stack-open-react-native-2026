import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import theme from '../theme';
import { format } from 'date-fns';
import * as Linking from 'expo-linking';
import useDeleteReview from '../hooks/useDeleteReview';

const ReviewItem = ({ review, userReview }) => {
  const [deleteReview] = useDeleteReview();

  const openURL = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReviewAction = async () => {
    try {
      const { data } = await deleteReview({ id: review.id });
      console.log('🔵', data);
    } catch (error) {
      console.error('🟠', error.message);
    }
  };

  const showDeleteReviewAlert = () => {
    const message = 'Are you sure you want to delete this review?';
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(message);
      if (confirmed) deleteReviewAction();
      return;
    }
    Alert.alert('Delete review', message, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: deleteReviewAction,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.review}>
        <Text style={styles.rating}>{review.rating}</Text>
        <View style={styles.content}>
          <View style={styles.head}>
            <Text style={styles.name}>
              {userReview ? review.repository.fullName : review.user.username}
            </Text>
            <Text>{format(new Date(review.createdAt), 'dd MMM yyyy')}</Text>
          </View>
          <Text>{review.text}</Text>
        </View>
      </View>
      {userReview ? (
        <View style={styles.buttonsRow}>
          <Pressable
            onPress={() => {
              openURL(review.repository.url);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable
            onPress={showDeleteReviewAlert}
            style={[styles.button, { backgroundColor: theme.colors.error }]}
          >
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textLight,
    padding: 20,
    maxWidth: 640,
    marginTop: 12,
    display: 'flex',
    gap: 12,
  },
  review: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  name: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  head: {
    display: 'flex',
    gap: 4,
  },
  content: {
    display: 'flex',
    gap: 8,
    flex: 1,
  },
  rating: {
    width: 68,
    height: 68,
    fontSize: theme.fontSizes.rating,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    borderRadius: 68,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 68,
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
  },
  buttonsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    flex: 1,
  },
  buttonText: {
    color: theme.colors.textLight,
    fontWeight: theme.fontWeights.bold,
  },
});

export default ReviewItem;
