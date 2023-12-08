import { Card, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

const VerseCard = ({ onPress, title, content }) => {
  const theme = useTheme();

  return (
    <Card
      style={{
        backgroundColor: theme.colors.onPrimary,
        marginHorizontal: 6,
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
  fontSize: 12,
  fontFamily: 'NanumGothic-Bold',
};

const contentTextStyle = {
  fontFamily: 'NanumGothic-Regular',
  fontSize: 16,
};

export default VerseCard;
