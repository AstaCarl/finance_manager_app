import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import "./global.css";
import { useEffect, useState } from "react";

type Category = { id: number; title: string };

type CategoryListProps = { CategoryTitle: string; onPress: () => void; };

const CategoryList = ({ CategoryTitle, onPress }: CategoryListProps) => (
  <View style={styles.categoryContainer}>
    <Text style={styles.categoryItem}>{CategoryTitle}</Text>
    <Button onPress={onPress} title="delete" />
  </View>
);

export default function App() {
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  const getData = async () => {
    try {
      const response = await fetch("http://192.168.0.19:3000/categories");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data);
      console.log("Data fetched:", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const postData = async () => {
    try {
      const response = await fetch("http://192.168.0.19:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: category }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newCategory = await response.json();
      console.log("Data posted:", newCategory);
      setCategories([...categories, newCategory]);
      setCategory("");
    } catch (error) {
      console.error("There was a problem with the post operation:", error);
    }
  };

  const deleteData = async (id: number) => {
    try {
      const response = await fetch(`http://192.168.0.19:3000/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const deletedCategory = await response.json();
      console.log("Data posted:", deletedCategory);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("There was a problem with the post operation:", error);
    }
  };

  const handleCategoryChange = (text: string) => {
    setCategory(text);
    console.log("Category changed:", text);
  };

  const handleAddCategory = () => {
    postData();
  };

  const handleDeleteCategory = (id: number) => {
    console.log("Category deleted:", id);
    deleteData(id);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welsome to the finance manager app!</Text>
      <Text style={styles.subtitle}>Please add a fitting category</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the name of a category"
        value={category}
        onChangeText={handleCategoryChange}
      />
      <Button onPress={handleAddCategory} title="Add Category" />
      {/* <StatusBar style="auto" /> */}
      <View style={styles.wrapper}>
        <Text style={styles.subtitle}>Categories:</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <CategoryList
                onPress={() => handleDeleteCategory(item.id)}
                CategoryTitle={item.title}
              />
            </>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 40,
    gap: 20,
  },
  wrapper: {
    gap: 10,
  },
  input: {
    borderColor: "£000",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    minWidth: 200,
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
