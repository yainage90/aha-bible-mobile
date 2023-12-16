import { View, StyleSheet, Platform } from 'react-native';
import { MD3Colors, IconButton, MD2Colors } from 'react-native-paper';
import CustomButton from './CustomButton';

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
        <CustomButton
          name="play-skip-back-circle"
          size={50}
          onPress={onPrevPress}
          disabled={prevDisabled}
        />
        <CustomButton
          name={isTtsPlaying ? 'pause-circle' : 'play-circle'}
          size={50}
          onPress={onPlayPress}
        />
        <CustomButton
          name="play-skip-forward-circle"
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
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
});

const buttonContainer = StyleSheet.create({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
});
