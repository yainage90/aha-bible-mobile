import React, { useState, useContext, useEffect } from 'react';
import { Appbar, MD3Colors } from 'react-native-paper';
import { ReadContext } from '../contexts';
import { getTitleAndChapterByChapterIdx } from '../utils/db';
import * as Speech from 'expo-speech';
import CustomButton from './CustomButton';
import { View } from 'react-native';

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
        backgroundColor: MD3Colors.primary95,
      }}
    >
      <Appbar.Content
        title={headerTitle}
        titleStyle={{
          fontFamily: 'MaruBuri-SemiBold',
        }}
      />
      <View
        style={{
          flex: 0.4,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <CustomButton
          name="list"
          size={24}
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
        <CustomButton
          name="search"
          size={24}
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
      </View>
    </Appbar.Header>
  );
};

export default BibleHeader;
