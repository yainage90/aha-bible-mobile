import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen, BibleScreen } from '../screens';
import BibleStack from './BibleStack';

const Tab = createMaterialBottomTabNavigator();

export default MainTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bible"
        component={BibleStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? 'book-open-page-variant'
                  : 'book-open-page-variant-outline'
              }
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
