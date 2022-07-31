import { StyleSheet, TextInput as NativeTextInput } from "react-native";

const styles = StyleSheet.create({
  errorBox: {
    borderColor: "#d73a4a",
  },
});

const TextInput = ({ style, ...props }) => {
  const textInputStyle = props.error ? [style, styles.errorBox] : [style];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
