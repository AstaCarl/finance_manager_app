import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { CategoryStackScreen, EntriesStackScreen } from "./StackNavigation";
import ProfileScreen from "../user/ProfileScreen";
import EntriesScreen from "../entries/EntriesScreen"

export type RootTabParamList = {
    navigate(arg0: string): void;
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
    Categories: undefined;
    Entries: undefined;
    Profile: undefined;
  };

const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabsNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoryStackScreen} />
      <Tab.Screen name="Entries" component={EntriesStackScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};