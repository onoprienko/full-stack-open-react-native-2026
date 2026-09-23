import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import * as Linking from 'expo-linking'; //

const RepositoryItem = ({ item, button }) => {
  const navigate = useNavigate();
  const thousandFormat = (number) => {
    if (number < 1000) return number;
    return Math.round(number / 100) / 10 + 'k';
  };

  const openURL = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Pressable
      onPress={() => navigate(`/${item.id}`)}
      testID="repositoryItem"
      key={item.id}
      style={styles.container}
    >
      <View style={styles.info}>
        <Image
          style={styles.image}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
        <View style={styles.infoText}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statItem.number}>
            {thousandFormat(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statItem.number}>
            {thousandFormat(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statItem.number}>
            {thousandFormat(item.reviewCount)}
          </Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statItem.number}>
            {thousandFormat(item.ratingAverage)}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>

      {!button || (
        <Pressable onPress={() => openURL(item.url)} style={styles.button}>
          <Text style={styles.button.text}>Open in GitHub</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textLight,
    padding: 20,
    maxWidth: 640,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
  },
  infoText: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-start',
  },
  name: { fontWeight: theme.fontWeights.bold },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textLight,
    padding: 8,
    paddingTop: 4,
    paddingBottom: 6,
    borderRadius: 4,
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
    number: {
      fontWeight: theme.fontWeights.bold,
    },
  },
  button: {
    marginTop: 20,
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

export default RepositoryItem;
