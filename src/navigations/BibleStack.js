import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ReadScreen,
  SearchScreen,
  SearchResultScreen,
  BibleListScreen,
} from '../screens';
import BibleHeader from '../components/BibleHeader';
import { useTheme } from 'react-native-paper';
import { SearchContext } from '../contexts';

const Stack = createStackNavigator();

const BibleStack = ({ navigation, route }) => {
  const theme = useTheme();
  const {
    search: { query },
  } = useContext(SearchContext);

  return (
    <Stack.Navigator
      initialRouteName="Read"
      screenOptions={{
        headerTintColor: theme.colors.onSurface,
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="Read"
        component={ReadScreen}
        options={{
          header: () => <BibleHeader navigation={navigation} route={route} />,
        }}
      />
      <Stack.Screen name="BibleList" component={BibleListScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: '검색',
        }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{
          headerTitle: `${query} 검색결과`,
        }}
      />
    </Stack.Navigator>
  );
};

export default BibleStack;
