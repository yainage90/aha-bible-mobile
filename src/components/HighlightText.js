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
          style={{
            fontFamily: 'MaruBuri-Bold',
            color: theme.colors.error,
          }}
        >
          {val}
        </Text>
      );
    } else {
      return (
        <Text
          key={idx}
          style={{
            fontFamily: 'MaruBuri-Light',
          }}
        >
          {val}
        </Text>
      );
    }
  });
  return str_or_components;
};

export default HighlightText;
