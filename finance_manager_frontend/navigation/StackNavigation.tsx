import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryListScreen from "../categories/CategoryList";
import AddCategory from "../categories/AddCategory";
import AddEntry from "../entries/AddEntry";
import EntriesScreen from "../entries/EntriesScreen";

export type RootStackParamList = {
    Categories: undefined;
    AddCategoriesScreen: undefined;
    EntriesList: undefined;
    AddEntry: undefined;
  };

const Stack = createNativeStackNavigator<RootStackParamList>();

export const CategoryStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Categories" component={CategoryListScreen} />
      <Stack.Screen name="AddCategoriesScreen" component={AddCategory} />
    </Stack.Navigator>
  );
};

export const EntriesStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }}  name="EntriesList" component={EntriesScreen} />
      <Stack.Screen name="AddEntry" component={AddEntry} />
    </Stack.Navigator>
  );
};