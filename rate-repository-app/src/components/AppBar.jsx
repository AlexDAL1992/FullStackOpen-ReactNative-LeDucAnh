import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import Constants from "expo-constants";

import useAuthStorage from "../hooks/useAuthStorage";
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
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const token = authStorage.getAccessToken();

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

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
        {token ? (
          <View>
            <Link to="/" style={styles.scrollItems} onClick={signOut}>
              <Text style={styles.text}>Sign out</Text>
            </Link>
          </View>
        ) : (
          <Link to="/signin" style={styles.scrollItems}>
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
