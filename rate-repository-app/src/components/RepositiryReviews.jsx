import { Text, View, FlatList, StyleSheet } from 'react-native';
import useRepositoryReviews from '../hooks/useRepositoryReviews';
import ReviewItem from './ReviewItem';

const RepositoryReviews = ({ repositoryId }) => {
  const { data, loading, fetchMore } = useRepositoryReviews({
    repositoryId,
    first: 2,
  });

  if (!data || !data.repository) {
    if (loading) return <Text>Loading...</Text>;
    return <Text>Reviews not found</Text>;
  }

  const reviewsNodes =
    data.repository.reviews.edges.map((edge) => edge.node) || [];

  return (
    <View style={styles.container} testID="repository-reviews-container">
      <FlatList
        data={reviewsNodes}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
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

export default RepositoryReviews;
