import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackgroundColor,
    height: "13%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20
  },
  text: {
    color: theme.colors.appBarTextColor,
    fontSize: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
