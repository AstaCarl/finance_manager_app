import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigation';
import CustomButton from '../components/CustomButton';
import { useQuery } from '@tanstack/react-query';
import { useDeleteCategory, useGetCategories } from './categoryQueries';


type CategoryListProps = { CategoryTitle: string; onPress: () => void; };

const CategoryList = ({ CategoryTitle, onPress }: CategoryListProps) => (

  <View style={styles.categoryContainer}>
    <Text style={styles.categoryItem}>{CategoryTitle}</Text>
        <CustomButton
          variant="tertiary"
          onPress={onPress}
          title="Delete"
        />
  </View>
);


export default function CategoryListScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: categories, isLoading, isError, error } = useGetCategories();

if (isLoading) return <Text>Loading...</Text>
if (isError) return <Text>Error: {error.message}</Text>

console.log("categories", categories);


  const handleDeleteCategory = (id: number) => {
    deleteCategory(id, {
      onSuccess: () => {
        console.log("deleted category with id", id);
      },
      onError: (error) => {
        console.error("Error deleting category:", error)
      }
    });

  };


  return (
    <>
    <View style={styles.container}>
    <View style={styles.wrapper}>
      <Text style={styles.title}>Your Categories</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id ? item.id.toString() : ''}
          renderItem={({ item }) => (
            <CategoryList
              onPress={() => handleDeleteCategory(item.id ? item.id : 0)}
              CategoryTitle={item.title}
            />
          )}
        />
      </View>
    <CustomButton variant='primary' onPress={() => navigation.navigate('AddCategoriesScreen')} title="Add Category" />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 30,
    gap: 20,
  },
  wrapper: {
    gap: 10,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    minWidth: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  categoryItem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryContainer: {
    backgroundColor: '#eeeeee',
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    alignItems: 'center',
    borderRadius: 12,
  },
});