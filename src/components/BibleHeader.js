import React, { useState, useContext, useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { ReadContext } from '../contexts';
import { setHeaderTitleByChapterIdx } from '../utils/db';

const BibleHeader = ({ navigation }) => {
  const { chapterIdx } = useContext(ReadContext);

  const [headerTitle, setHeaderTitle] = useState('');

  useEffect(() => {
    setHeaderTitleByChapterIdx({ chapterIdx, setHeaderTitle });
  }, [chapterIdx]);

  return (
    <Appbar.Header
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Appbar.Content title={headerTitle} />
      <Appbar.Action
        icon="view-list-outline"
        onPress={() => {
          navigation.navigate('BibleList');
        }}
      />
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
