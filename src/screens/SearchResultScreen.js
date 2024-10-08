import React, { useState, useContext, useEffect, useRef } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, useWindowDimensions } from 'react-native';
import { MD3Colors, Text } from 'react-native-paper';
import HighlightText from '../components/HighlightText';
import { ReadContext } from '../contexts';
import VerseCard from '../components/VerseCard';

const SearchResultScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [verses, setVerses] = useState([]);
  const flatListRef = useRef();

  const { query } = route.params;

  const { read, dispatch } = useContext(ReadContext);

  const layout = useWindowDimensions();

  const apiHost = process.env.EXPO_PUBLIC_API_HOST;

  useEffect(() => {
    loadData();
    if (flatListRef.current && total > 0) {
      flatListRef.current.scrollToIndex({
        index: 0,
        animated: false,
      });
    }

    navigation.setOptions({
      headerTitle: `'${query}' 검색결과`,
      headerTitleStyle: {
        fontSize: 22,
        fontFamily: 'MaruBuri-SemiBold',
      },
      headerTintColor: MD3Colors.neutral0,
    });
  }, [navigation]);

  const loadData = () => {
    setLoading(true);
    let apiUrl = `${apiHost}/search/bible_krv?query=${query}`;
    console.log(`Search request: ${apiUrl}`);
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .catch(err => {
        console.error(err);
      })
      .then(res => {
        const { total, docs } = res;
        setTotal(total);
        setVerses(docs);

        console.log(`query=${query}, total=${total}`);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1, height: layout.height, paddingVertical: 20 }}>
      <FlashList
        ref={flatListRef}
        data={verses}
        renderItem={({
          item: { book, title, chapter, chapter_idx, verse, highlight },
        }) => (
          <View>
            <Text style={titleStyle}>
              • {book} {title} {chapter}:{verse}
            </Text>
            <VerseCard
              content={<HighlightText>{highlight}</HighlightText>}
              onPress={() => {
                dispatch({ ...read, chapterIdx: chapter_idx });
                navigation.navigate('Read', { verse });
              }}
            />
          </View>
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
    </View>
  );
};

const titleStyle = {
  marginTop: 10,
  marginBottom: 3,
  marginLeft: 6,
  fontFamily: 'MaruBuri-Regular',
  fontSize: 15,
};

export default SearchResultScreen;
