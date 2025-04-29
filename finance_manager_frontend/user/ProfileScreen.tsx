import { useNavigation, NavigationProp, Link } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../components/CustomButton";
import { logout } from "./UserSlice";
import { RootTabParamList } from "../navigation/Tabs";

export default function ProfileScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RootTabParamList>();

  const handleLogout = async () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <CustomButton title="Log out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 40,
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
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    minWidth: 200,
  },
  title: {
    fontSize: 32,
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
