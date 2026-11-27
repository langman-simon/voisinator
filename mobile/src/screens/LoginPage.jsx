import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function LoginPage(){
    //Page created with AI, will be used to understand well how  to make our next pages.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        //does not hide the important spaces on the phone (battery, navbar, ...)
        <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>Voisinator</Text>
          <Text style={styles.subtitle}>Connectez-vous à votre quartier</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="vous@exemple.be"
            placeholderTextColor={colors.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false} //disable the autocorrect on the phone for the label
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={colors.placeholder}
            secureTextEntry // doesn t show the password
            autoCapitalize="none" //Auto set for capital letters
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          //onPress={handleLogin} --> need to link with the API
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

//Made by AI

const colors = {
  background: '#FCF8F5',
  primary: '#D16255',
  text: '#1F1F1F',
  subtitle: '#4A4A4A',
  border: '#EDE6E1',
  placeholder: '#8A8A8A',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { flex: 1, paddingHorizontal: 24, paddingTop: 48 },
  header: { marginBottom: 40 },
  title: { fontSize: 36, fontWeight: '700', color: colors.primary },
  subtitle: { fontSize: 16, color: colors.subtitle, marginTop: 4 },
  field: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { alignItems: 'center', marginTop: 20 },
  linkText: { color: colors.primary, fontSize: 15, fontWeight: '600' },
});