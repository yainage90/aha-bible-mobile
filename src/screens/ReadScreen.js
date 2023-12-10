import React, { useEffect, useContext, useRef, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { loadBibleKrvByChapterIdx } from '../utils/db';
import { ReadContext } from '../contexts';
import VerseCard from '../components/VerseCard';
import BibleHeader from '../components/BibleHeader';
import Panel from '../components/Panel';

const ReadScreen = ({ navigation, route }) => {
  const flatListRef = useRef();
  const {
    read: { chapterIdx, verseIdx, isTtsPlaying, mode },
    dispatch,
  } = useContext(ReadContext);

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

    navigation.setOptions({
      header: () => <BibleHeader navigation={navigation} />,
    });
  }, [chapterIdx, navigation]);

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
      <View style={{ flex: 85 }}>
        <FlashList
          ref={flatListRef}
          data={verses}
          renderItem={({ item: { verse, text } }) => (
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
        />
      </View>
      <View style={{ flex: 15 }}>
        <Panel
          prevDisabled={chapterIdx == 0}
          nextDisabled={chapterIdx == 1188}
          onPrevPress={handlePrevPress}
          onNextPress={handleNextPress}
        />
      </View>
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
