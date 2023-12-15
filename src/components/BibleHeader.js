import React, { useState, useContext, useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { ReadContext } from '../contexts';
import { getTitleAndChapterByChapterIdx } from '../utils/db';
import * as Speech from 'expo-speech';

const BibleHeader = ({ navigation }) => {
  const { read, dispatch } = useContext(ReadContext);

  const [headerTitle, setHeaderTitle] = useState('');

  useEffect(() => {
    getTitleAndChapterByChapterIdx(read.chapterIdx).then(
      ({ title, chapter }) => {
        const headerTitle = `${title} ${chapter}장`;
        setHeaderTitle(headerTitle);
      },
    );
  }, [read.chapterIdx]);

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
          Speech.stop().then(() => {
            dispatch({
              ...read,
              isTtsPlaying: false,
            });
          });
        }}
      />
      <Appbar.Action
        icon="magnify"
        onPress={() => {
          navigation.navigate('Search');
          Speech.stop().then(() => {
            dispatch({
              ...read,
              isTtsPlaying: false,
            });
          });
        }}
      />
    </Appbar.Header>
  );
};

export default BibleHeader;
