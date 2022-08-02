import { View, Pressable, StyleSheet, FlatList } from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";

import RepositoryCard from "./RepositoryCard";
import Text from "../Text";
import theme from "../../theme";
import useRepository from "../../hooks/useRepository";
import useReview from "../../hooks/useReview";
import ReviewCard from "../ReviewCard";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    marginBottom: 10,
  },
  githubButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.languageTextColor,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 0,
  },
  githubText: {
    color: "white",
    fontWeight: "bold",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = ({ repository, onOpenGithub }) => {
  return (
    <View style={styles.container}>
      <RepositoryCard repository={repository} />
      {repository.url && (
        <Pressable style={styles.githubButton} onPress={onOpenGithub}>
          <Text style={styles.githubText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

const RepositoryItem = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);
  const { reviews } = useReview(id);

  const repo = repository ? repository : {};
  const rev = reviews ? reviews.map(({ node }) => node) : [];

  const onOpenGithub = () => {
    Linking.openURL(repo.url);
  };

  return (
    <FlatList
      data={rev}
      renderItem={({ item }) => <ReviewCard review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <Repository repository={repo} onOpenGithub={onOpenGithub} />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryItem;
