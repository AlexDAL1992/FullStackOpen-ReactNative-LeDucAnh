import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackgroundColor,
    height: "10%",
    paddingBottom: 5,
  },
  scrollViewStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollItems: {
    paddingLeft: 10,
  },
  text: {
    color: theme.colors.appBarTextColor,
    fontSize: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}
      >
        <Link to="/" style={styles.scrollItems}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin" style={styles.scrollItems}>
          <Text style={styles.text}>Signin</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
