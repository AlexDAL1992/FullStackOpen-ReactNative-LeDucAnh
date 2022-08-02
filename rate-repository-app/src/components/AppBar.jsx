import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link, useNavigate } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import Constants from "expo-constants";

import useAuthStorage from "../hooks/useAuthStorage";
import Text from "./Text";
import theme from "../theme";
import { GET_USER } from "../graphql/queries";

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
  const navigate = useNavigate();

  const { data } = useQuery(GET_USER);
  const user = data?.me;
  console.log(user);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
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
        {user ? (
          <>
            <Link to="/create-review" style={styles.scrollItems}>
              <Text style={styles.text}>Craete a review</Text>
            </Link>
            <Pressable to="/" style={styles.scrollItems} onPress={signOut}>
              <Text style={styles.text}>Sign out</Text>
            </Pressable>
          </>
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
