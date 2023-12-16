import React, { useEffect, useContext, useRef, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { loadBibleKrvByChapterIdx } from '../utils/db';
import { ReadContext } from '../contexts';
import VerseCard from '../components/VerseCard';
import BibleHeader from '../components/BibleHeader';
import Panel from '../components/Panel';
import * as Speech from 'expo-speech';
import { MD3Colors } from 'react-native-paper';

const ReadScreen = ({ navigation, route }) => {
  const flatListRef = useRef();
  const { read, dispatch } = useContext(ReadContext);

  const [verses, setVerses] = useState([]);
  const [ttsIdx, setTtsIdx] = useState(0);

  const layout = useWindowDimensions();

  useEffect(() => {
    navigation.setOptions({
      header: () => <BibleHeader navigation={navigation} />,
    });

    loadBibleKrvByChapterIdx(read.chapterIdx)
      .then(verses => {
        setVerses(verses);
      })
      .catch(err => {
        console.error(err);
      });
  }, [read.chapterIdx]);

  useEffect(() => {
    scrollToIndex(0);

    if (read.isTtsPlaying && ttsIdx === 0) {
      playTts(verses[0].text);
    } else {
      setTtsIdx(0);
    }

    return () => {
      Speech.isSpeakingAsync().then(res => {
        if (res) {
          Speech.stop().then(() => {});
        }
      });
    };
  }, [verses]);

  useEffect(() => {
    if (read.isTtsPlaying && verses.length > 0) {
      scrollToIndex(ttsIdx);
      playTts(verses[ttsIdx].text);
    }
  }, [read.isTtsPlaying, ttsIdx]);

  const scrollToIndex = (index = 0) => {
    if (flatListRef.current && verses.length > 0) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  const playTts = text => {
    Speech.speak(text, {
      volume: 1.0,
      pitch: 1.0,
      onDone: () => {
        if (ttsIdx === verses.length - 1) {
          dispatch({
            ...read,
            chapterIdx: read.chapterIdx + 1,
          });
        } else {
          setTtsIdx(prev => prev + 1);
        }
      },
    });
  };

  const handlePrevPress = () => {
    Speech.isSpeakingAsync().then(res => {
      if (res) {
        Speech.stop()
          .then(() => {
            dispatch({
              ...read,
              chapterIdx: read.chapterIdx - 1,
            });
          })
          .catch(err => console.error(err));
      } else {
        dispatch({
          ...read,
          chapterIdx: read.chapterIdx - 1,
        });
      }
    });

    console.log(`Go to chapterIdx=${read.chapterIdx - 1}`);
  };

  const handleNextPress = () => {
    Speech.isSpeakingAsync().then(res => {
      if (res) {
        Speech.stop()
          .then(() => {
            dispatch({
              ...read,
              chapterIdx: read.chapterIdx + 1,
            });
          })
          .catch(err => console.error(err));
      } else {
        dispatch({
          ...read,
          chapterIdx: read.chapterIdx + 1,
        });
      }
    });

    console.log(`Go to chapterIdx=${read.chapterIdx + 1}`);
  };

  const handlePlayPress = () => {
    if (read.isTtsPlaying) {
      Speech.stop().then(() => {
        dispatch({
          ...read,
          isTtsPlaying: false,
        });
      });
    } else {
      dispatch({
        ...read,
        isTtsPlaying: true,
      });
    }
  };

  const handleCardPress = index => {
    if (read.isTtsPlaying && ttsIdx !== index) {
      Speech.stop().then(() => {
        setTtsIdx(index);
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        height: layout.height,
        backgroundColor: MD3Colors.primary95,
      }}
    >
      <View style={{ flex: 88 }}>
        <FlashList
          ref={flatListRef}
          data={verses}
          extraData={{ read, ttsIdx }}
          renderItem={({ item: { verse, text }, index }) => (
            <VerseCard
              title={verse}
              content={text}
              onPress={() => {
                handleCardPress(index);
              }}
              isPlaying={read.isTtsPlaying && index === ttsIdx}
            />
          )}
          estimatedItemSize={120}
        />
      </View>
      <View style={{ flex: 12 }}>
        <Panel
          prevDisabled={read.chapterIdx == 0}
          nextDisabled={read.chapterIdx == 1188}
          onPrevPress={handlePrevPress}
          onNextPress={handleNextPress}
          onPlayPress={handlePlayPress}
          isTtsPlaying={read.isTtsPlaying}
        />
      </View>
    </View>
  );
};

export default ReadScreen;
