import { useNavigation, NavigationProp, Link } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@react-navigation/elements";
import CustomButton from "../components/CustomButton";
// import { RootTabParamList } from "../navigation/Tabs";
import { RootTabParamList } from "../navigation/Tabs";
import { signup } from "./UserSlice";

export default function SignUpScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RootTabParamList>();

  const handleUsernameChange = (text: string) => {
    // console.log(text);
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  // const handleSignUp = async () => {
  //   const newUser = { username, password };
  //   try {
  //     const response = await dispatch(signup(newUser));
  //     console.log("Response: from page", response);
  //     if (response.payload.id) {
  //       navigation.navigate("Login");
  //       Alert.alert(
  //         "Sign up complete",
  //         "You need to login to get access to the finance manger app",
  //         [{ text: "OK", onPress: () => navigation.navigate("Login") }]
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSignUp = async () => {
    const newUser = { username, password };
    try {
      const response = await dispatch(signup(newUser));
      console.log("Response: from page", response);
  
      if (response.payload?.id) {
        // Successful signup
        navigation.navigate("Login");
        Alert.alert(
          "Sign up complete",
          "You need to login to get access to the finance manager app",
          [{ text: "OK", onPress: () => navigation.navigate("Login") }]
        );
      } else if (response.payload?.statusCode === 409) {
        // User already exists
        Alert.alert(
          "Sign up failed",
          "User already exists. Please try a different username.",
          [{ text: "OK" }]
        );
      } else {
        // Other errors
        Alert.alert(
          "Sign up failed",
          "An unexpected error occurred. Please try again later.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Sign up failed",
        "An unexpected error occurred. Please try again later.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the finance manager app!</Text>
      <Text style={styles.subtitle}>New Here? sign up to become a user</Text>
      <View style={styles.inputGroup}>
        <Label>Type your username</Label>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={handleUsernameChange}
        />
      </View>
      <View style={styles.inputGroup}>
        <Label>Type your Password</Label>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.group}>
        <Text>Already a user?</Text>
        <CustomButton
          title="Login here"
          variant="secondary"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <CustomButton title="Sign Up" variant="primary" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 100, 
    gap: 20,
  },
  wrapper: {
    gap: 10,
  },
  inputGroup: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
  },
  input: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  group: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
  },
  categoryItem: {},
  categoryContainer: {
    backgroundColor: "#eeeeee",
    marginVertical: 8,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
  },
  iconButton: {
    width: 20,
    height: 20,
  },
});
