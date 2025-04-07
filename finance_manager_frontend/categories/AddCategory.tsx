import { Text } from "@react-navigation/elements";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { CategoryEntity } from "./CategoryEntity";
import { createCategory } from "./CategorySlice";
import { RootStackParamList } from "../navigation/StackNavigation";
import CustomButton from "../components/CustomButton";


export default function AddCategory() {
  const [title, setTitle] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  const handleCategoryChange = (text: string) => {
    setTitle(text);
  };

  const handleAddCategory = () => {
    const newCategory = new CategoryEntity(title);
    dispatch(createCategory(newCategory))
    setTitle("");
      navigation.navigate("Categories");

  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Please add a fitting category</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the name of a category"
        value={title}
        onChangeText={handleCategoryChange}
      />
      <CustomButton onPress={handleAddCategory} title="Add new Category" />
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
