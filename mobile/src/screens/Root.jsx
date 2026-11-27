import { StyleSheet, Text, View } from "react-native";

export default function RootNavigator() {
  return (
    <View style={styles.container}>
      <Text>Root Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
});
