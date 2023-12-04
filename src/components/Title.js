import { IconButton, List, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const BibleTitle = ({ text }) => {
  const theme = useTheme();
  return (
    <List.Subheader style={headerStyle}>
      <Text>{text}</Text>
    </List.Subheader>
  );
};
export default BibleTitle;

const headerStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: 24,
};
