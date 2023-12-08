import React, { useEffect, useContext, useRef, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import PaginationButton from '../components/PaginationButton';
import { useTheme, Text } from 'react-native-paper';
import { loadBibleKrvByChapterIdx } from '../utils/db';
import { ReadContext } from '../contexts';
import VerseCard from '../components/VerseCard';

const ReadScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const flatListRef = useRef();
  const { chapterIdx, dispatch } = useContext(ReadContext);

  const [verses, setVerses] = useState([]);

  const layout = useWindowDimensions();

  const scrollToIndex = () => {
    if (flatListRef.current && verses.length > 0) {
      let index = 0;
      if (route.params && route.params.verse) {
        index = route.params.verse - 1;
      }

      flatListRef.current.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  useEffect(() => {
    loadBibleKrvByChapterIdx(chapterIdx)
      .then(verses => {
        setVerses(verses);
        scrollToIndex();
      })
      .catch(err => {
        console.error(err);
      });
  }, [chapterIdx]);

  const handlePrevPress = () => {
    dispatch({
      chapterIdx: chapterIdx - 1,
    });
    navigation.navigate('Read', { chapterIdx: chapterIdx - 1 });
    console.log(`Go to chapterIdx=${chapterIdx - 1}`);
  };

  const handleNextPress = () => {
    dispatch({
      chapterIdx: chapterIdx + 1,
    });
    navigation.navigate('Read', { chapterIdx: chapterIdx + 1 });
    console.log(`Go to chapterIdx=${chapterIdx + 1}`);
  };

  return (
    <View style={{ flex: 1, height: layout.height }}>
      <FlashList
        ref={flatListRef}
        data={verses}
        renderItem={({ item: { idx, title, chapter, verse, text } }) => (
          <VerseCard
            title={verse}
            content={
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontFamily: 'NanumGothic-Regular',
                }}
              >
                {text}
              </Text>
            }
          />
        )}
        estimatedItemSize={120}
        ListFooterComponent={
          <View
            style={{
              height: 80,
            }}
          />
        }
      />
      <PaginationButton
        style={{
          flex: 1,
        }}
        prevVisible={chapterIdx > 0}
        onPrevPress={handlePrevPress}
        nextVisible={chapterIdx < 1188}
        onNextPress={handleNextPress}
      />
    </View>
  );
};

const cardContentrStyle = {
  marginRight: 10,
};

const titleStyle = {
  marginRight: 10,
};

export default ReadScreen;
