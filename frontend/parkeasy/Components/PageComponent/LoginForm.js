import React, {useState} from 'react';
//TEST TEST TEST
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Style from "../../Styles/CredentialsStyle";
import globalStyles from '../../Styles/GlobalStyle';
import axios from 'axios';
import LogoPinColor from '../../assets/logos/logo_pin_color.svg';
import EmailIcon from '../../assets/icons/input_mail.svg';
import PasswordIcon from '../../assets/icons/pass.svg';
import CredentialsStyle from "../../Styles/CredentialsStyle";

import InputField from "../BasicComponents/InputField";
import PrimaryButton from "../BasicComponents/PrimaryButton";
import BottomLink from "../BasicComponents/BottomLink";
import ErrorDialog from "../BasicComponents/ErrorDialog";

//////////////////////////////////// MAIN COMPONENT ////////////////////////////////////

const LoginForm = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({}); // this will hold the error use this as a parameter for the message

    // field clean up
    function resetField(){
        setEmail('');
        setPassword('');
        setError({});
    }

    async function handleLogin(){
        
        try{
            const response = await axios.post('http://192.168.0.24:8000/api/auth/login', {
                email,
                password
            });
            navigation.navigate("Sign Up");
        }catch (err) {
                
                setError(err.response.data.error);
                console.log(err.response.data.error);
            }
    }

    return (

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={Style.fullPageContainer}>
                    <View style={Style.loginPageContainer}>

                        {/*This is the logo image*/}
                        
                        <LogoPinColor style={CredentialsStyle.imageLogo}/>
                        {/*<EmailIcon style={CredentialsStyle.imageLogo}/>*/}
                        
                        {/*Credential section*/}
                        <View style={Style.credentialsContainer}>
                            <Text style={Style.mainTitle}>Login</Text>

                            {/*component to display errors*/}
                            <ErrorDialog error={error.message? error.message: null}/>
                           

                            {/* This is the email input */}
                            <InputField placeholder="Email" keyboardType="email-address" onChange={setEmail} value={email} hasIcon= "true" SideIcon = {EmailIcon} errorTray = {error.email? error.email.message : null}/>
                            {/* This is the Password Input */}
                            <InputField placeholder="Password" onChange={setPassword} value={password}  hasIcon= "true" SideIcon = {PasswordIcon} secureTextEntry="true" errorTray = {error.password? error.password.message : null}/>
                            {/* Login Button */}
                            <PrimaryButton onPressButton ={handleLogin} InsideText ="Login"/>

                        </View>

                            {/* Forgot Password and Sign Up Links */}
                        <View style={Style.linksContainer}>

                            {/* Link to Forget Password Page */}
                            <BottomLink navigation = {navigation} text="Forget Password?" navigateTo= "ForgetPassword" resetField={resetField}/>
                            {/* Link for Sign Up Page*/}
                            <BottomLink navigation = {navigation} text="Sign Up" navigateTo= "Sign Up" resetField={resetField} fontWeight='bold'/>

                        </View>

                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
    );
};

export default LoginForm;
