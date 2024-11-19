import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoginForm from '../Components/LoginForm';
import ForgetPassForm from '../Components/ForgetPassForm';
import SignUpForm from "../Components/SignUpForm";
import MainPage from '../Components/MainPage';
import MapView from '../Components/MapTest';
import Splash from '../Components/Splash';
const Stack = createStackNavigator();

// This is used to create the stack navigation
const CredentialsStack = () => {
    return (

        // this stack navigator is only for the credentials

        <Stack.Navigator initialRouteName="Login"
                         screenOptions={{
                             headerShown: false,
                             ...TransitionPresets.ScaleFromCenterAndroid // Apply fade transition (selected by method)
                         }}>

            <Stack.Screen name="Login" component={LoginForm}
                          options={{ headerShown: false}} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassForm}
                          options={{ headerShown: false}} />
            <Stack.Screen name="Sign Up" component={SignUpForm}
                          options={{ headerShown: false}} />
        </Stack.Navigator>
    );
};

const App = () => {
    return (
        <NavigationContainer independent={true}>
            <CredentialsStack />
        </NavigationContainer>
        // <Splash/>
    );
};

export default App;
