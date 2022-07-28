import { View, Image, StyleSheet, Pressable } from "react-native";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.repositoryCardBackgroundColor,
    display: "flex",
  },
  upper: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 10,
  },
  upperLeft: {
    paddingRight: 10,
  },
  upperRight: {
    paddingRight: 10,
    flexDirection: "column",
    flexShrink: 1,
    alignItems: "flex-start",
  },
  upperRightItems: {
    marginVertical: 3,
  },
  lower: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  icons: {
    display: "flex",
    flexDirection: "column",
  },
  iconText: {
    alignSelf: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  languageButton: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.languageTextColor,
    padding: 7,
  },
  languageText: {
    color: "white",
  },
});

const RepositoryCard = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <View style={styles.upperLeft}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: `${repository.ownerAvatarUrl}` }}
          />
        </View>

        <View style={styles.upperRight}>
          <Text
            style={styles.upperRightItems}
            fontWeight="bold"
            fontSize="subheading"
          >
            {repository.fullName}
          </Text>
          <Text style={styles.upperRightItems} color="textSecondary">
            {repository.description}
          </Text>
          <Pressable style={[styles.languageButton, styles.upperRightItems]}>
            <Text style={styles.languageText}>{repository.language}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.lower}>
        <View style={styles.icons}>
          <View style={styles.iconText}>
            <Text fontWeight="bold">{repository.stargazersCount}</Text>
          </View>
          <View style={styles.iconText}>
            <Text color="textSecondary">Stars</Text>
          </View>
        </View>

        <View style={styles.icons}>
          <View style={styles.iconText}>
            <Text fontWeight="bold">{repository.forksCount}</Text>
          </View>
          <View style={styles.iconText}>
            <Text color="textSecondary">Forks</Text>
          </View>
        </View>

        <View style={styles.icons}>
          <View style={styles.iconText}>
            <Text fontWeight="bold">{repository.reviewCount}</Text>
          </View>
          <View style={styles.iconText}>
            <Text color="textSecondary">Reviews</Text>
          </View>
        </View>

        <View style={styles.icons}>
          <View style={styles.iconText}>
            <Text fontWeight="bold">{repository.ratingAverage}</Text>
          </View>
          <View style={styles.iconText}>
            <Text color="textSecondary">Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepositoryCard;
