import { View, StyleSheet } from "react-native";
import { format } from "date-fns";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryCardBackgroundColor,
    padding: 10,
    display: "flex",
    flexDirection: "row",
  },
  left: {
    marginRight: 10,
  },
  rating: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 25,
    borderStyle: "solid",
  },
  ratingText: {
    fontWeight: "bold",
    color: theme.colors.primary,
    fontSize: 20,
  },

  right: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 20,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 10,
    fontSize: 12,
  },
});

const ReviewCard = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>
          {format(new Date(review.createdAt), "dd/MM/yyyy HH.mm")}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;
