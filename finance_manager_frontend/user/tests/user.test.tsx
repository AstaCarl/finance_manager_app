// import React from "react";
// import { fireEvent, render, waitFor } from "@testing-library/react-native";
// import LogInScreen from "../LogInScreen";
// import { beforeEach, describe, it, expect } from "node:test";

// describe("LogInScreen", () => {
//   beforeEach(() => {
//     fetchMock.resetMocks();
//   });
// });

// it('fills in username and password, and logs in', async () => {
//     const { getByPlaceholderText, getByText } = render(<LogInScreen />);
  
//     fireEvent.changeText(getByPlaceholderText('Username'), 'student1');
//     fireEvent.changeText(getByPlaceholderText('Password'), 'mypassword123');
  
//     fireEvent.press(getByText('Login'));
  
//     // Expect that the login dispatch was called
//     expect(mockDispatch).toHaveBeenCalledWith(login({
//       username: 'student1',
//       password: 'mypassword123',
//     }));
//   });
