import { View, useWindowDimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import React, { useState, useContext, useEffect } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { loadTitleList, loadChapterList } from '../utils/db';
import { List, MD3Colors } from 'react-native-paper';
import { ReadContext } from '../contexts';
import { useTheme } from 'react-native-paper';
import { getTitleAndChapterByChapterIdx } from '../utils/db';

const BibleListScreen = ({ navigation }) => {
  const [titles, setTitles] = useState([]);
  const [chapters, setChapters] = useState([]);

  const theme = useTheme();

  const { chapterIdx, dispatch } = useContext(ReadContext);

  const [currentTitle, setCurrentTitle] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'title', title: '제목' },
    { key: 'chapter', title: '장' },
  ]);

  const layout = useWindowDimensions();

  useEffect(() => {
    loadTitleList().then(titles => {
      setTitles(titles);
    });

    if (currentTitle) {
      loadChapterList(currentTitle).then(chapters => {
        setChapters(chapters);
      });
    }

    if (currentTitle === null && currentChapter === null) {
      getTitleAndChapterByChapterIdx(chapterIdx).then(({ title, chapter }) => {
        setCurrentTitle(title);
        setCurrentChapter(chapter);
      });
    }

    navigation.setOptions({
      headerTitle: '목차',
      headerTitleStyle: {
        fontSize: 22,
        fontFamily: 'NanumGothic-ExtraBold',
      },
      headerTintColor: MD3Colors.neutral0,
    });
  }, [currentTitle, navigation]);

  const TitleRoute = () => {
    return (
      <View style={{ flex: 1, height: layout.height }}>
        <FlashList
          data={titles}
          estimatedItemSize={100}
          renderItem={({ item: { title } }) => (
            <List.Item
              title={title}
              style={{
                marginVertical: 10,
                backgroundColor:
                  title === currentTitle ? MD3Colors.primary95 : null,
              }}
              right={
                title === currentTitle
                  ? props => (
                      <List.Icon
                        {...props}
                        icon="check"
                        color={MD3Colors.primary50}
                      />
                    )
                  : null
              }
              titleStyle={{
                fontSize: 18,
                fontFamily: 'NanumGothic-Regular',
              }}
              onPress={() => {
                setCurrentChapter(null);
                loadChapterList(title).then(chapters => {
                  setCurrentTitle(title);
                  setChapters(chapters);
                  setIndex(prev => prev + 1);
                });
              }}
            />
          )}
          keyExtractor={({ idx }) => idx}
        />
      </View>
    );
  };

  const ChapterRoute = () => {
    return (
      <View style={{ flex: 1, height: layout.height }}>
        <FlashList
          data={chapters}
          estimatedItemSize={100}
          renderItem={({ item: { chapter, chapterIdx } }) => (
            <List.Item
              title={`${chapter} 장`}
              style={{
                marginVertical: 10,
                backgroundColor:
                  chapter === currentChapter ? MD3Colors.primary95 : null,
              }}
              right={
                chapter === currentChapter
                  ? props => (
                      <List.Icon
                        {...props}
                        icon="check"
                        colors={MD3Colors.primary50}
                      />
                    )
                  : null
              }
              titleStyle={{
                fontSize: 18,
                fontFamily: 'NanumGothic-Regular',
              }}
              onPress={() => {
                dispatch({ chapterIdx });
                setCurrentChapter(chapter);
                navigation.navigate('Read', { chapterIdx });
              }}
            />
          )}
          keyExtractor={({ chapter }) => chapter}
        />
      </View>
    );
  };

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
            backgroundColor: MD3Colors.neutral70,
          }}
          labelStyle={{
            fontSize: 18,
            fontFamily: 'NanumGothic-Bold',
            color: theme.colors.onSurfaceVariant,
            color: MD3Colors.neutral30,
          }}
          style={{
            backgroundColor: MD3Colors.primary95,
          }}
        />
      )}
      initialLayout={{ width: layout.width, height: layout.height }}
    />
  );
};

export default BibleListScreen;
