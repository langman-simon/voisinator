import { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RedButton from '../components/RedButton';
import InputField from '../components/InputField';
import LinkButton from '../components/LinkButton';
import { api } from '../services/apiService';


export default function LoginPage(){
    //Page created with AI, will be used to understand well how  to make our next pages.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleLogin() {
      setError(null);
      setLoading(true);
      try {
        const data = await api.post('/user/login', { email, password });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    return (
        //does not hide the important spaces on the phone (battery, navbar, ...)
        <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>Voisinator</Text>
          <Text style={styles.subtitle}>Connectez-vous à votre quartier</Text>
        </View>

        <InputField
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="vous@exemple.be"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}//disable the autocorrect on the phone for the label
        />

        <InputField
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry // doesn t show the password
          autoCapitalize="none" //Auto set for capital letters
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <RedButton title="Se connecter" onPress={handleLogin} loading={loading} />
        <LinkButton title="Créer un compte" onPress={() => {}} />

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
  error: { color: colors.primary, marginBottom: 8 },
});