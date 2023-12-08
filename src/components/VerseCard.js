import { Card, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

const VerseCard = ({ onPress, title, content }) => {
  const theme = useTheme();

  return (
    <Card
      style={{
        ...cardStyle,
        backgroundColor: theme.colors.onPrimary,
      }}
      onPress={onPress}
    >
      <Card.Content style={cardContentrStyle}>
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
          <Text variant="bodyLarge">{content}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const cardStyle = {
  marginHorizontal: 5,
  marginVertical: 2,
};

const cardContentrStyle = {
  marginRight: 20,
};

const titleStyle = {
  marginRight: 10,
  fontSize: 12,
  fontWeight: '200',
};

export default VerseCard;
