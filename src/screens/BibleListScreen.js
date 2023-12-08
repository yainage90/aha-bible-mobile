import { FlatList, View, useWindowDimensions } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Text } from 'react-native-paper';
import { loadTitleList, loadChapterList } from '../utils/db';
import { List, MD3Colors } from 'react-native-paper';
import { ReadContext } from '../contexts';

const BibleListScreen = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'title', title: 'Title' },
    { key: 'chapter', title: 'Chapter' },
  ]);

  const [titles, setTitles] = useState([]);
  const [chapters, setChapters] = useState([]);

  const { dispatch } = useContext(ReadContext);

  useEffect(() => {
    loadTitleList(setTitles);
  }, []);

  const TitleRoute = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <List.Section>
          <FlatList
            data={titles}
            renderItem={({ item: { title } }) => (
              <List.Item
                title={title}
                hi
                style={{
                  marginVertical: 10,
                }}
                titleStyle={{
                  fontSize: 24,
                }}
                onPress={() => {
                  loadChapterList(title, setChapters);
                  setIndex(prev => prev + 1);
                }}
              />
            )}
            keyExtractor={({ idx }) => idx}
          />
        </List.Section>
      </View>
    );
  };

  const ChapterRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <List.Section>
        <FlatList
          data={chapters}
          renderItem={({ item: { chapter, chapterIdx } }) => (
            <List.Item
              title={chapter}
              style={{
                marginVertical: 10,
              }}
              titleStyle={{
                fontSize: 24,
              }}
              onPress={() => {
                dispatch({ chapterIdx });
                navigation.navigate('Read', { chapterIdx });
              }}
            />
          )}
          keyExtractor={({ chapter }) => chapter}
        />
      </List.Section>
    </View>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        title: () => TitleRoute({ titles, navigation }),
        chapter: () => ChapterRoute(chapters),
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default BibleListScreen;
