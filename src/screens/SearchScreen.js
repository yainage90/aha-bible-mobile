import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { View } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const onSearch = () => {
    navigation.navigate('SearchResult', { query });
  };

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
