import { render, fireEvent, waitFor } from "@testing-library/react-native";

import { SignInContainer } from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const login = jest.fn();

      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={login} />
      );

      fireEvent.changeText(getByPlaceholderText("Username"), "elina");
      fireEvent.changeText(getByPlaceholderText("Password"), "password");
      fireEvent.press(getByText("Sign In"));

      await waitFor(() => {
        expect(login).toHaveBeenCalledTimes(1);

        expect(login.mock.calls[0][0]).toEqual({
          username: "elina",
          password: "password",
        });
      });
    });
  });
});
