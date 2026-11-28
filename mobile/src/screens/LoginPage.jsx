import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FieldInput from "../components/FieldInput";
import { colors } from "../theme/colors";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>Voisinator</Text>
          <Text style={styles.subtitle}>Connectez-vous à votre quartier</Text>
        </View>

        <FieldInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="vous@exemple.be"
          keyboardType="email-address"
        />

        <FieldInput
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>

        <Pressable style={styles.link}>
          <Text style={styles.linkText}>Créer un compte</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { flex: 1, paddingHorizontal: 24, paddingTop: 48 },
  header: { marginBottom: 40 },
  title: { fontSize: 36, fontWeight: "700", color: colors.primary },
  subtitle: { fontSize: 16, color: colors.subtitle, marginTop: 4 },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { alignItems: "center", marginTop: 20 },
  linkText: { color: colors.primary, fontSize: 15, fontWeight: "600" },
});
