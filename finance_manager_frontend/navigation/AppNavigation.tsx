import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { TabsNavigation } from './Tabs';
import { AuthTabs } from '../navigation/AuthTabs';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reloadJwtFromStorage } from '../user/UserSlice';


const AppNavigation = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => !!state.user.token);
  console.log("Is logged in:", isLoggedIn);
  console.log("Token:", useSelector((state: RootState) => state.user.token));

  useEffect(() => {
    async function getValueFor() {
      const token = JSON.parse(await SecureStore.getItemAsync('jwt') || '')
      console.log("userObj", token);
      dispatch(reloadJwtFromStorage(token)) // in my code, I have no token
      // Instead, do the login functionality and save the token instead of the user.
    }
    getValueFor()
  }, [])

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabsNavigation /> : <AuthTabs />}
    </NavigationContainer>
  );
};

export default AppNavigation;
