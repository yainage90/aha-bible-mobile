import React, { useEffect, useContext, useRef, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { loadBibleKrvByChapterIdx } from '../utils/db';
import { ReadContext } from '../contexts';
import VerseCard from '../components/VerseCard';
import BibleHeader from '../components/BibleHeader';
import Panel from '../components/Panel';
import * as Speech from 'expo-speech';

const ReadScreen = ({ navigation, route }) => {
  const flatListRef = useRef();
  const { read, dispatch } = useContext(ReadContext);

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

  const speech = (texts, startIdx) => {
    Speech.speak(
      texts
        .slice(startIdx)
        .map(v => v.text)
        .join('\n'),
      {
        volume: 1.0,
        pitch: 0.8,
        voice: 'ko-kr-x-koc-network',
        onDone: () => {
          Speech.stop().then(() => {});
          dispatch({
            ...read,
            chapterIdx: read.chapterIdx + 1,
          });
        },
      },
    );
  };

  useEffect(() => {
    loadBibleKrvByChapterIdx(read.chapterIdx)
      .then(verses => {
        setVerses(verses);

        if (!read.isTtsPlaying) {
          scrollToIndex();
        }

        if (read.isTtsPlaying) {
          speech(verses, 0);
        }
      })
      .catch(err => {
        console.error(err);
      });

    navigation.setOptions({
      header: () => <BibleHeader navigation={navigation} />,
    });
  }, [read.chapterIdx, navigation, read.isTtsPlaying]);

  const handlePrevPress = () => {
    Speech.stop().then(() => {});
    dispatch({
      ...read,
      chapterIdx: read.chapterIdx - 1,
    });
    console.log(`Go to chapterIdx=${read.chapterIdx - 1}`);
  };

  const handleNextPress = () => {
    Speech.stop().then(() => {});
    dispatch({
      ...read,
      chapterIdx: read.chapterIdx + 1,
    });

    console.log(`Go to chapterIdx=${read.chapterIdx + 1}`);
  };

  const handlePlayPress = () => {
    if (read.isTtsPlaying) {
      Speech.stop().then(() => {});
    } else {
      speech(verses, 0);
    }

    dispatch({
      ...read,
      isTtsPlaying: !read.isTtsPlaying,
    });
  };

  const handleCardPress = index => {
    if (read.isTtsPlaying) {
      Speech.stop().then(() => {
        speech(verses, index);
      });
    }
  };

  return (
    <View style={{ flex: 1, height: layout.height }}>
      <View style={{ flex: 85 }}>
        <FlashList
          ref={flatListRef}
          data={verses}
          initialScrollIndex={0}
          renderItem={({ item: { verse, text }, index }) => (
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
              onPress={() => {
                handleCardPress(index);
              }}
            />
          )}
          estimatedItemSize={120}
        />
      </View>
      <View style={{ flex: 15 }}>
        <Panel
          prevDisabled={read.chapterIdx == 0}
          nextDisabled={read.chapterIdx == 1188}
          onPrevPress={handlePrevPress}
          onNextPress={handleNextPress}
          onPlayPress={handlePlayPress}
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
