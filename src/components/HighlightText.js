import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const HighlightText = ({ children }) => {
  const theme = useTheme();
  const tokens = children.split(/<[a-z]>|<\/[a-z]>/);
  str_or_components = tokens.map((val, idx) => {
    if (idx % 2 === 1) {
      return (
        <Text
          key={idx}
          style={{ fontWeight: 'bold', color: theme.colors.error }}
        >
          {val}
        </Text>
      );
    } else {
      return val;
    }
  });
  return str_or_components;
};

const style = StyleSheet.create({
  fontWeight: 'bold',
});

export default HighlightText;
