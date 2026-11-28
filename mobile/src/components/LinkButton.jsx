import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

export default function LinkButton({ title, onPress }) {
  return (
    <Pressable style={styles.link} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: { alignItems: 'center', marginTop: 20 },
  text: { color: colors.primary, fontSize: 15, fontWeight: '600' },
});