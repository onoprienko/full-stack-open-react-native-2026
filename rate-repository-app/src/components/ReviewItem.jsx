import { Text, View, StyleSheet } from 'react-native';
import theme from '../theme';
import { format } from 'date-fns';

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.review}>
        <Text style={styles.rating}>{review.rating}</Text>
        <View style={styles.content}>
          <View style={styles.head}>
            <Text style={styles.name}>{review.user.username}</Text>
            <Text>{format(new Date(review.createdAt), 'dd MMM yyyy')}</Text>
          </View>
          <Text>{review.text}</Text>
        </View>
      </View>
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
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 0,
    fontWeight: theme.fontWeights.bold,
  },
});

export default ReviewItem;
