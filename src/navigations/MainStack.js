import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ReadScreen,
  SearchScreen,
  SearchResultScreen,
  BibleListScreen,
} from '../screens';
import BibleHeader from '../components/BibleHeader';
import { MD3LightTheme } from 'react-native-paper';
import { SearchContext } from '../contexts';

const Stack = createStackNavigator();

const MainStack = () => {
  const {
    search: { query },
  } = useContext(SearchContext);

  return (
    <Stack.Navigator
      initialRouteName="Read"
      screenOptions={{
        headerTintColor: MD3LightTheme.colors.background,
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: MD3LightTheme.colors.background,
        },
      }}
    >
      <Stack.Screen name="Read" component={ReadScreen} />
      <Stack.Screen name="BibleList" component={BibleListScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
    </Stack.Navigator>
  );
};

const containerStyle = StyleSheet.create({
  flex: 85,
});

const panelStyle = StyleSheet.create({
  flex: 15,
});

export default MainStack;
