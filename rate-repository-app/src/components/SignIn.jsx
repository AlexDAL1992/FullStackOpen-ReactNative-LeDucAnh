import { useNavigate } from "react-router-dom";
import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters!")
    .required("Username is required!"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters!")
    .required("Password is required!"),
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
  let navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
