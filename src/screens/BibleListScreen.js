import { FlatList, View, useWindowDimensions } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { loadTitleList, loadChapterList } from '../utils/db';
import { List, MD3Colors } from 'react-native-paper';
import { ReadContext } from '../contexts';
import { useTheme } from 'react-native-paper';

const BibleListScreen = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [titles, setTitles] = useState([]);
  const [chapters, setChapters] = useState([]);

  const theme = useTheme();

  const { dispatch } = useContext(ReadContext);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'title', title: '제목' },
    { key: 'chapter', title: '장' },
  ]);

  useEffect(() => {
    loadTitleList().then(titles => {
      setTitles(titles);
    });
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
                  fontSize: 20,
                  fontFamily: 'NanumGothic-Regular',
                }}
                onPress={() => {
                  loadChapterList(title).then(chapters => {
                    setChapters(chapters);
                  });
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
                fontSize: 20,
                fontFamily: 'NanumGothic-Regular',
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
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{
            backgroundColor: theme.colors.outline,
          }}
          labelStyle={{
            fontSize: 18,
            fontFamily: 'NanumGothic-ExtraBold',
            color: theme.colors.onSurfaceVariant,
          }}
          style={{
            backgroundColor: theme.colors.surfaceVariant,
          }}
        />
      )}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default BibleListScreen;
