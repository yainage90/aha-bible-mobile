import React, { useEffect } from 'react';
import { ReadProvider } from './contexts/Read';
import { SearchProvider } from './contexts/Search';
import { init_bible_krv, read_bible_krv_by_chapter_idx } from './utils/db';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import Navigation from './navigations';
import 'react-native-gesture-handler';

export default App = () => {
  useEffect(() => {
    init_bible_krv();
  }, []);
  return (
    <PaperProvider theme={DefaultTheme}>
      <ReadProvider>
        <SearchProvider>
          <Navigation />
        </SearchProvider>
      </ReadProvider>
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);
