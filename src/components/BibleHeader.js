import React, { useContext } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { ReadContext } from '../contexts';

const BibleHeader = ({ navigation, route, options }) => {
  const {
    read: { title, chapter },
  } = useContext(ReadContext);

  let headerTitle = null;
  if (route.name === 'Bible') {
    headerTitle = `${title} ${chapter}장`;
  } else if (route.name === 'Search') {
    headerTitle = '검색';
  } else if (route.name === 'SearchResult') {
    headerTitle = `${route.query} 검색결과`;
  }

  return (
    <Appbar.Header
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Appbar.Content title={headerTitle} style={{}} />
      <Appbar.Action icon="view-list-outline" />
      <Appbar.Action
        icon="magnify"
        onPress={() => {
          navigation.navigate('Search');
        }}
      />
    </Appbar.Header>
  );
};

export default BibleHeader;
