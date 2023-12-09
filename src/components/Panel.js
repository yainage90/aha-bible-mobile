import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper';

const Panel = () => {
  return (
    <View style={panelContainerStyle}>
      <View style={buttonContainer}>
        <IconButton
          icon="skip-previous"
          iconColor={MD3Colors.neutral0}
          size={50}
        />
        <IconButton
          icon="play-circle"
          iconColor={MD3Colors.neutral0}
          size={50}
        />
        <IconButton icon="skip-next" iconColor={MD3Colors.neutral0} size={50} />
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
