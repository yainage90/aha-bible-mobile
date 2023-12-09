import React, { useState, useContext, useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { ReadContext } from '../contexts';
import { getTitleAndChapterByChapterIdx } from '../utils/db';

const BibleHeader = ({ navigation }) => {
  const { chapterIdx } = useContext(ReadContext);

  const [headerTitle, setHeaderTitle] = useState('');

  useEffect(() => {
    getTitleAndChapterByChapterIdx(chapterIdx).then(({ title, chapter }) => {
      const headerTitle = `${title} ${chapter}장`;
      setHeaderTitle(headerTitle);
    });
  }, [chapterIdx]);

  return (
    <Appbar.Header
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Appbar.Content
        title={headerTitle}
        titleStyle={{
          fontFamily: 'NanumGothic-Bold',
        }}
      />
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
