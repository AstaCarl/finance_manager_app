import { Text } from "@react-navigation/elements";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CategoryEntity } from "./CategoryEntity";
import { RootStackParamList } from "../navigation/StackNavigation";
import CustomButton from "../components/CustomButton";
import { useCreateCategory } from "./categoryQueries";



export default function AddCategory() {
  const [title, setTitle] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { mutate: createCategory, status } = useCreateCategory();
  const isLoading = status === "pending"; // Derive loading state from status



  const handleCategoryChange = (text: string) => {
    setTitle(text);
  };

  const handleAddCategory = () => {
    const newCategory = new CategoryEntity(title);
    createCategory(newCategory, {
      onSuccess: () => {
        setTitle("");
        navigation.navigate("Categories");
      }
    });

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
      <CustomButton onPress={handleAddCategory} title={isLoading ? "Adding..." : "Add new category"} />
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
