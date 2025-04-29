import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignUpScreen from "../user/SignUpScreen";
import LogInScreen from "../user/LogInScreen";

export type RootAuthTabParamList = {
    navigate(arg0: string): void;
    Login: undefined;
    SignUp: undefined;
  };

const Tab = createBottomTabNavigator<RootAuthTabParamList>();

export const AuthTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={LogInScreen} />
      <Tab.Screen name="SignUp" component={SignUpScreen} />
    </Tab.Navigator>
  );
};