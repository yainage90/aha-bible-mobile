import React, { useContext, useEffect, useState } from 'react';
import { MD3Colors, Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { ReadContext, SearchContext } from '../contexts';
import * as Speech from 'expo-speech';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const { dispatch } = useContext(SearchContext);
  const { read, dispatch: readDispatch } = useContext(ReadContext);

  const onSearch = () => {
    Speech.stop().then(() => {
      readDispatch({
        ...read,
        isTtsPlaying: false,
      });
    });
    dispatch({ query });
    navigation.navigate('SearchResult', { query });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '검색',
      headerTitleStyle: {
        fontSize: 22,
        fontFamily: 'NanumGothic-Bold',
      },
      headerTintColor: MD3Colors.neutral0,
    });
  }, [navigation]);

  return (
    <View>
      <Searchbar
        placeholder="검색어를 입력하세요"
        value={query}
        onChangeText={text => {
          setQuery(text);
        }}
        onSubmitEditing={onSearch}
        onIconPress={onSearch}
        style={{
          margin: 10,
        }}
      />
    </View>
  );
};

export default SearchScreen;
