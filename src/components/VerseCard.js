import { Card, MD3Colors, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

const VerseCard = ({ onPress, title, content, isPlaying = false }) => {
  const theme = useTheme();

  return (
    <Card
      style={{
        backgroundColor: isPlaying
          ? MD3Colors.tertiary90
          : MD3Colors.neutral100,
        marginHorizontal: 4,
        marginVertical: 2,
      }}
      onPress={onPress}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {title && (
            <Text variant="titleMedium" style={titleStyle}>
              {title}
            </Text>
          )}
          <Text variant="bodyLarge" style={contentTextStyle}>
            {content}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const titleStyle = {
  marginRight: 4,
  fontFamily: 'MaruBuri-Bold',
  fontSize: 12,
};

const contentTextStyle = {
  fontFamily: 'MaruBuri-Light',
  fontSize: 16,
};

export default VerseCard;
