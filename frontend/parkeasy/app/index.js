import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoginForm from '../Components/PageComponent/LoginForm';
import ForgetPassForm from '../Components/PageComponent/ForgetPassForm';
import SignUpForm from "../Components/PageComponent/SignUpForm";
import MainPage from '../Components/PageComponent/MainPage';
import MapView from '../Components/PageComponent/MapTest';
import Splash from '../Components/PageComponent/SplashPage';
import MenuPill from "../Components/BasicComponents/MenuPill";
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
        // <NavigationContainer independent={true}>
        //     <CredentialsStack />
        // </NavigationContainer>

        //TESTING PAGES

        // <MenuPill />
        // <Splash/>
        <MainPage />
    );
};

export default App;
