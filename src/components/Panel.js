import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper';
import * as Speech from 'expo-speech';

const Panel = ({
  prevDisabled = false,
  onPrevPress,
  nextDisabled = false,
  onNextPress,
}) => {
  return (
    <View style={panelContainerStyle}>
      <View style={buttonContainer}>
        <IconButton
          icon="skip-previous"
          iconColor={MD3Colors.neutral0}
          size={50}
          onPress={onPrevPress}
          disabled={prevDisabled}
        />
        <IconButton
          icon="play-circle"
          iconColor={MD3Colors.neutral0}
          size={50}
          onPress={() => {
            Speech.getAvailableVoicesAsync()
              .then(res => {
                const voices = res
                  .filter(r => r.language === 'ko-KR')
                  .map(r => r.identifier);
                console.log(voices);
              })
              .catch(err => {
                console.error(err);
              });
            Speech.speak(
              '태초에 하나님이 천지를 창조하시니라',
              (options = {
                volume: 1.0,
                pitch: 0.8,
                voice: 'ko-kr-x-koc-network',
              }),
            );
          }}
        />
        <IconButton
          icon="skip-next"
          iconColor={MD3Colors.neutral0}
          size={50}
          onPress={onNextPress}
          disabled={nextDisabled}
        />
      </View>
    </View>
  );
};

export default Panel;

const panelContainerStyle = StyleSheet.create({
  flex: 1,
  width: '100%',
  justifyContent: 'center',
  backgroundColor: MD3Colors.primary95,
});

const buttonContainer = StyleSheet.create({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-evenly',
});
