import React, { useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { View, SafeAreaView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import HighlightText from '../components/HighlightText';

const SearchResultScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [verses, setVerses] = useState([]);
  const theme = useTheme();
  const flatListRef = useRef();

  const { query } = route.params;

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
    console.log('hi');
    etch(apiUrl)
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
    <SafeAreaView
      style={{
        paddingVertical: 20,
      }}
    >
      <FlatList
        ref={flatListRef}
        data={verses}
        renderItem={({ item: { book, title, chapter, verse, highlight } }) => (
          <>
            <Text variant="titleMedium" style={titleStyle}>
              {book} {title} {chapter}장 {verse}절
            </Text>
            <Card
              style={{
                margin: 3,
                backgroundColor: theme.colors.onPrimary,
              }}
            >
              <Card.Content style={cardContentrStyle}>
                <Text variant="bodyLarge" style={titleStyle}>
                  <HighlightText>{highlight}</HighlightText>
                </Text>
              </Card.Content>
            </Card>
          </>
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
    </SafeAreaView>
  );
};

const cardContentrStyle = {
  marginRight: 10,
};

const titleStyle = {
  marginRight: 10,
};

export default SearchResultScreen;
