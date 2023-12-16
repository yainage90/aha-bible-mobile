import React, { useCallback } from 'react';
import { View } from 'react-native';
import { ReadProvider } from './contexts/Read';
import { SearchProvider } from './contexts/Search';
import { init_bible_krv } from './utils/db';
import { name as appName } from '../app.json';
import { AppRegistry } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import Navigation from './navigations';
import 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'MaruBuri-SemiBold': require('../assets/fonts/MaruBuri-SemiBold.ttf'),
    'MaruBuri-Bold': require('../assets/fonts/MaruBuri-Bold.ttf'),
    'MaruBuri-Regular': require('../assets/fonts/MaruBuri-Regular.ttf'),
    'MaruBuri-Light': require('../assets/fonts/MaruBuri-Light.ttf'),
    'MaruBuri-ExtraLight': require('../assets/fonts/MaruBuri-ExtraLight.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      init_bible_krv();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={DefaultTheme}>
      <ReadProvider>
        <SearchProvider>
          <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <Navigation />
          </View>
        </SearchProvider>
      </ReadProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
