import { Card, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

const VerseCard = ({ onPress, title, content }) => {
  const theme = useTheme();

  return (
    <Card
      style={{
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

const cardContentrStyle = {
  marginRight: 10,
};

const titleStyle = {
  marginRight: 10,
};

export default VerseCard;
