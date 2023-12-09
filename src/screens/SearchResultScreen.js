import React, { useState, useContext, useEffect, useRef } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import HighlightText from '../components/HighlightText';
import { ReadContext } from '../contexts';
import VerseCard from '../components/VerseCard';

const SearchResultScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [verses, setVerses] = useState([]);
  const theme = useTheme();
  const flatListRef = useRef();

  const { query } = route.params;

  const { dispatch } = useContext(ReadContext);

  const apiHost = process.env.EXPO_PUBLIC_API_HOST;

  useEffect(() => {
    loadData();
    if (flatListRef.current && total > 0) {
      flatListRef.current.scrollToIndex({
        index: 0,
        animated: false,
      });
    }
  }, []);

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
    <View style={{ paddingVertical: 20 }}>
      <FlashList
        ref={flatListRef}
        data={verses}
        renderItem={({
          item: { book, title, chapter, chapter_idx, verse, highlight },
        }) => (
          <View>
            <Text style={titleStyle}>
              • {book} {title} {chapter}장 {verse}절
            </Text>
            <VerseCard
              content={<HighlightText>{highlight}</HighlightText>}
              onPress={() => {
                dispatch({ chapterIdx: chapter_idx });
                navigation.navigate('Read', { verse });
              }}
            />
          </View>
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
    </View>
  );
};

const titleStyle = {
  marginTop: 12,
  marginBottom: 3,
  fontFamily: 'NanumGothic-Bold',
  fontSize: 16,
};

export default SearchResultScreen;
