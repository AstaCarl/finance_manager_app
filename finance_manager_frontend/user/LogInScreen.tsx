import { useNavigation, NavigationProp, Link } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@react-navigation/elements";
import { RootTabParamList } from "../navigation/Tabs";
import CustomButton from "../components/CustomButton";
import { login } from "./UserSlice";
const selectToken = (state: RootState) => state.user.token;


export default function LogInScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RootTabParamList>();;

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogIn = () => {  
    const user = {username, password};
    dispatch(login(user));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Text style={styles.subtitle}>Login to continue</Text>
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
            <Text>Not a user yet?</Text>
            <CustomButton title="Sign up here" variant="secondary" onPress={() => navigation.navigate("SignUp")}/>
            </View>
      <CustomButton title="Login" variant="primary" onPress={handleLogIn}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 40,
    paddingTop: 40,
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
  group: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
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
