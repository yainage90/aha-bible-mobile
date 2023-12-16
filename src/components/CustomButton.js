import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { MD3Colors, TouchableRipple } from 'react-native-paper';

const CustomButton = ({
  name,
  size = 32,
  onPress = () => {},
  disabled = false,
}) => {
  return (
    <View style={buttonContainerStyle}>
      <TouchableRipple onPress={onPress} rippleColor="rgba(0, 0, 0, .32)">
        <Ionicons
          name={name}
          size={size}
          disabled={disabled}
          style={{
            color: disabled ? MD3Colors.neutral80 : MD3Colors.neutral20,
          }}
        />
      </TouchableRipple>
    </View>
  );
};

buttonContainerStyle = StyleSheet.create({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'ffffff00',
});

export default CustomButton;
