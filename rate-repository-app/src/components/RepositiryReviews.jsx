import { Text, View, FlatList, StyleSheet } from 'react-native';
import useRepositoryReviews from '../hooks/useRepositoryReviews';
import ReviewItem from './ReviewItem';

const RepositoryReviews = ({ repositoryId }) => {
  const { data, loading } = useRepositoryReviews(repositoryId);
  if (loading) return <Text>Loading...</Text>;
  if (!data || !data.repository) return <Text>Reviews not found</Text>;

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
