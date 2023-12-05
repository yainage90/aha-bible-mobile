import React, { useEffect, useContext, useRef } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card } from 'react-native-paper';
import PaginationButton from '../components/PaginationButton';
import { useTheme } from 'react-native-paper';
import { readBibleKrvByChapterIdx } from '../utils/db';
import { ReadContext } from '../contexts';

const ReadScreen = () => {
  const theme = useTheme();
  const flatListRef = useRef();
  const {
    read: { chapterIdx, title, chapter, verses },
    dispatch,
  } = useContext(ReadContext);

  const apiHost = process.env.EXPO_PUBLIC_API_HOST;

  const setPage = (chapterIdx, title, chapter, verses) => {
    dispatch({
      chapterIdx,
      title,
      chapter,
      verses,
    });
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: 0,
        animated: false,
      });
    }
  };

  useEffect(() => {
    readBibleKrvByChapterIdx(chapterIdx, setPage);
  }, [chapterIdx]);

  return (
    <SafeAreaView>
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
        onPrevPress={() => {
          readBibleKrvByChapterIdx(chapterIdx - 1, setPage);
          console.log(`go to chapterIdx=${chapterIdx - 1}`);
        }}
        nextVisible={chapterIdx < 1188}
        onNextPress={() => {
          readBibleKrvByChapterIdx(chapterIdx + 1, setPage);
          console.log(`Go to chapterIdx=${chapterIdx + 1}`);
        }}
      />
    </SafeAreaView>
  );
};

const cardContentrStyle = {
  marginRight: 10,
};

const titleStyle = {
  marginRight: 10,
};

export default ReadScreen;
