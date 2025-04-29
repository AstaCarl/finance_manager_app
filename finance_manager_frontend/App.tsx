// Navigation and Screen Components Setup
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { TabsNavigation } from './navigation/Tabs';
import { AuthTabs } from './navigation/AuthTabs';
import AppNavigation from './navigation/AppNavigation';
import { store } from './store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
        <AppNavigation/>
    </Provider>
    </QueryClientProvider>
  );
};

export default App;
