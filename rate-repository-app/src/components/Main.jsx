import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import RepositoryItem from "./RepositoryList/RepositoryItem";
import SignIn from "./SignIn";
import ReviewForm from "./ReviewForm";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackgroundColor,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="repositories/:id" element={<RepositoryItem />} exact />
        <Route path="create-review" element={<ReviewForm />} exact />
      </Routes>
    </View>
  );
};

export default Main;
