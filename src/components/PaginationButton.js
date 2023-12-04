import { View } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const PaginationButton = ({
  prevVisible = true,
  onPrevPress,
  nextVisible = true,
  onNextPress,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
      }}
    >
      <FAB
        visible={prevVisible}
        style={{
          ...styles.fab_prev,
          backgroundColor: theme.colors.onPrimary,
        }}
        size="medium"
        icon="skip-previous-outline"
        onPress={onPrevPress}
      />
      <FAB
        visible={nextVisible}
        style={{
          ...styles.fab_next,
          backgroundColor: theme.colors.onPrimary,
        }}
        size="medium"
        icon="skip-next-outline"
        onPress={onNextPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab_prev: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 20,
  },
  fab_next: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 20,
  },
});

export default PaginationButton;
