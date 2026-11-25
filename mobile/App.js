import {StyleSheet} from 'react-native';
import LoginPage from './src/screens/LoginPage';
import RootNavigator from './src/screens/Root';
import { NavigationContainer } from '@react-navigation/native'; // allow to navigate beteween screens
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // allow to create a bottom bar with buttons for navigation

const BottomBar = createBottomTabNavigator();

export default function App(){
    return(
        <NavigationContainer>
            <BottomBar.Navigator initialRouteName="LoginPage" screenOption={{headerShown: false}}>
                <BottomBar.Screen name="LoginPage" component={LoginPage}/>
                <BottomBar.Screen name="Root" component={RootNavigator}/>
            </BottomBar.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
});