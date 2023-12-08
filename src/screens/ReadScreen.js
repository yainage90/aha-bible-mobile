import React, { useEffect, useContext, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import PaginationButton from '../components/PaginationButton';
import { useTheme } from 'react-native-paper';
import { readBibleKrvByChapterIdx } from '../utils/db';
import { ReadContext } from '../contexts';

const ReadScreen = ({ route }) => {
  const theme = useTheme();
  const flatListRef = useRef();
  const { chapterIdx, dispatch } = useContext(ReadContext);

  const [verses, setVerses] = useState([]);

  useEffect(() => {
    readBibleKrvByChapterIdx(chapterIdx, setVerses);
    if (flatListRef.current && verses.length > 0) {
      flatListRef.current.scrollToIndex({
        index: 0,
        animated: false,
      });
    }
  }, [chapterIdx]);

  const handlePrevPress = () => {
    readBibleKrvByChapterIdx(chapterIdx - 1, setVerses);
    dispatch({
      chapterIdx: chapterIdx - 1,
    });
    console.log(`Go to chapterIdx=${chapterIdx - 1}`);
  };

  const handleNextPress = () => {
    readBibleKrvByChapterIdx(chapterIdx + 1, setVerses);
    dispatch({
      chapterIdx: chapterIdx + 1,
    });
    console.log(`Go to chapterIdx=${chapterIdx + 1}`);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={verses}
        renderItem={({ item: { idx, title, chapter, verse, text } }) => (
          <Card
            style={{
              margin: 3,
              backgroundColor: theme.colors.onPrimary,
            }}
          >
            <Card.Content style={cardContentrStyle}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text variant="titleMedium" style={titleStyle}>
                  {verse}
                </Text>
                <Text variant="bodyLarge">{text}</Text>
              </View>
            </Card.Content>
          </Card>
        )}
        keyExtractor={item => item.idx}
        ListFooterComponent={
          <View
            style={{
              height: 80,
            }}
          />
        }
      />
      <PaginationButton
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
