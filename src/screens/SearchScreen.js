import React, { useContext, useEffect, useState } from 'react';
import { MD3Colors, Searchbar } from 'react-native-paper';
import { View, useColorScheme } from 'react-native';
import { SearchContext } from '../contexts';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const { dispatch } = useContext(SearchContext);

  const onSearch = () => {
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
