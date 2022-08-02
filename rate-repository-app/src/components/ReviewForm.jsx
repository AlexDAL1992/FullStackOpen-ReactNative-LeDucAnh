import { useNavigate } from "react-router-dom";
import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import { CREATE_REVIEW } from "../graphql/mutations";

const initialValues = {
  repository: "",
  username: "",
  rating: "",
  text: "",
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
  repository: yup
    .string()
    .min(3, "Repository name must be at least 3 characters!")
    .required("Repository name is required!"),
  username: yup
    .string()
    .min(3, "Repository owner username must be at least 3 characters!")
    .required("Repository owner username is required!"),
  rating: yup
    .number("Rating must be a number!")
    .min(0, "Rating must be from 0 to 100!")
    .max(100, "Rating must be from 0 to 100!")
    .required("Rating is required!"),
  text: yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.formView}>
      <FormikTextInput
        name="username"
        placeholder="Repository owner name"
        placeholderTextColor={theme.colors.placeholderTextColor}
        style={styles.formField}
      ></FormikTextInput>
      <FormikTextInput
        name="repository"
        placeholder="Repository name"
        placeholderTextColor={theme.colors.placeholderTextColor}
        style={styles.formField}
      ></FormikTextInput>
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        placeholderTextColor={theme.colors.placeholderTextColor}
        style={styles.formField}
      ></FormikTextInput>
      <FormikTextInput
        name="text"
        placeholder="Review"
        placeholderTextColor={theme.colors.placeholderTextColor}
        style={styles.formField}
        multiline
      ></FormikTextInput>
      <Pressable
        onPress={onSubmit}
        style={[styles.formField, styles.formButton]}
      >
        <Text style={{ color: "white" }}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    const results = await createReview({
      variables: {
        ...values,
        rating: parseInt(values.rating),
      },
    });

    if (results.data?.createReview) {
      navigate(`/repositories/${results.data.createReview.repositoryId}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default ReviewForm;
