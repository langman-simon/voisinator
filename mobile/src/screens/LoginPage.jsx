import {StyleSheet, Text, View} from 'react-native';

export default function LoginPage(){
    return (
        <View style={styles.container}>
            <Text>Login Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
});