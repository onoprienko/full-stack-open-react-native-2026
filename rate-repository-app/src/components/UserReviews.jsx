import { Text, View, FlatList, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';

const UserReviews = ({ reviews }) => {
  console.log(reviews);
  if (!reviews) return <Text>No reviews</Text>;
  const reviewsNodes = reviews.edges.map((edge) => edge.node) || [];

  return (
    <View style={styles.container} testID="repository-reviews-container">
      <FlatList
        data={reviewsNodes}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => <ReviewItem review={item} userReview />}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 12,
  },
});

export default UserReviews;
