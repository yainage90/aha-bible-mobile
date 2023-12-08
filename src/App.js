import React, { useEffect, useCallback } from 'react';
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
    'NanumGothic-Bold': require('../assets/fonts/NanumGothic-Bold.ttf'),
    'NanumGothic-ExtraBold': require('../assets/fonts/NanumGothic-ExtraBold.ttf'),
    'NanumGothic-Regular': require('../assets/fonts/NanumGothic-Regular.ttf'),
    'NanumMyeongjo-Bold': require('../assets/fonts/NanumMyeongjo-Bold.ttf'),
    'NanumMyeongjo-ExtraBold': require('../assets/fonts/NanumMyeongjo-ExtraBold.ttf'),
    'NanumMyeongjo-Regular': require('../assets/fonts/NanumMyeongjo-Regular.ttf'),
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
