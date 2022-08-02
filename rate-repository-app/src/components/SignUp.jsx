import { useNavigate } from "react-router-dom";
import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { SIGNUP } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";
import theme from "../theme";

const initialValues = {
  username: "",
  password: "",
  doesMatch: "",
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
  doesMatch: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password confirmation must match!")
    .required("Password confirmation is required!"),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.formView}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        placeholderTextColor={theme.colors.placeholderTextColor}
        style={styles.formField}
      ></FormikTextInput>
      <FormikTextInput
        name="password"
        placeholder="Password"
        placeholderTextColor={theme.colors.placeholderTextColor}
        secureTextEntry={true}
        style={styles.formField}
      ></FormikTextInput>
      <FormikTextInput
        name="doesMatch"
        placeholder="Confirm password"
        placeholderTextColor={theme.colors.placeholderTextColor}
        secureTextEntry={true}
        style={styles.formField}
      ></FormikTextInput>
      <Pressable
        onPress={onSubmit}
        style={[styles.formField, styles.formButton]}
      >
        <Text style={{ color: "white" }}>Create new user</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signup] = useMutation(SIGNUP);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const newUser = {
      username: values.username,
      password: values.password,
    };

    try {
      await signup({ variables: { user: newUser } });
      await signIn(newUser);
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
