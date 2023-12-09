import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper';

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
            alert('음성 재생 코드 추가');
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
