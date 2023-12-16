import { View, StyleSheet } from 'react-native';
import { MD3Colors, IconButton } from 'react-native-paper';

const Panel = ({
  prevDisabled = false,
  onPrevPress,
  nextDisabled = false,
  onNextPress,
  onPlayPress,
  isTtsPlaying = false,
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
          icon={isTtsPlaying ? 'pause-circle' : 'play-circle'}
          iconColor={MD3Colors.neutral0}
          size={50}
          onPress={onPlayPress}
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
