import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  formView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
  },
  formField: {
    height: 40,
    width: 300,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: theme.colors.placeholderTextColor,
    marginVertical: 10,
    textAlignVertical: "center",
    paddingLeft: 10,
  },
  formButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.languageTextColor,
    padding: 7,
    textDecorationColor: "white",
    borderWidth: 0,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formView}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        placeholderTextColor={theme.colors.placeholderTextColor}
        style={styles.formField}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        placeholderTextColor={theme.colors.placeholderTextColor}
        secureTextEntry={true}
        style={styles.formField}
      />
      <Pressable
        onPress={onSubmit}
        style={[styles.formField, styles.formButton]}
      >
        <Text style={{ color: "white" }}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(`Username: ${values.username}\nPassword: ${values.password}`);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
