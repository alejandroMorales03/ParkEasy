import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import InputField from "./BasicComponents/InputField";
import Style from "../Styles/CredentialsStyle";
import globalStyles from '../Styles/GlobalStyle';
import {COLORS} from "../Constants/Constants";
import {ICONS} from "../Constants/icons";
import {LOGOS} from "../Constants/logos";
import GlobalStyle from "../Styles/GlobalStyle";
import axios from 'axios';
import LogoPinColor from '../assets/logos/logo_pin_color.svg';
import EmailIcon from '../assets/icons/input_mail.svg';
import CredentialsStyle from "../Styles/CredentialsStyle";
import PrimaryButton from "./BasicComponents/PrimaryButton"; //IMPORT MAIN SVG FILE FROM ASSETS

//////////////////////////////////// MAIN COMPONENT ////////////////////////////////////

const LoginForm = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // this will hold the error use this as a parameter for the message

    // field clean up
    function resetField(){
        setEmail('');
        setPassword('');
        setError('');
    }

    async function handleLogin(){
        setError('');

        if(!email || !password){
            setError('Please fill out all fields.');
            return;
        }

        console.log("Email: ", email);
        console.log("Password: ", password);

        try{
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                email,
                password
            });
            navigation.navigate("Sign Up");
        }catch(err){
            console.error('Error during login:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : 'Login failed. Please try again.');
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

                            {error ? (
                                <Text style={globalStyles.errorText}>
                                    {error}
                                </Text>
                            ) : null}

                            {/* This is the email input */}

                            <InputField placeholder="Email" keyboardType="email-address" onChange={setEmail} value={email} hasIcon= "true" sideIcon = {EmailIcon} />

                            {/* This is the Password Input */}

                            <InputField placeholder="Password" onChange={setPassword} value={password} hasIcon = "true" secureTextEntry="true" />


                            {/* Login Button */}

                            <PrimaryButton onPressButton ={handleLogin} InsideText ="Login"/>

                            {/* Forgot Password and Sign Up Links */}
                        </View>

                        {/* Links Container */}
                        <View style={Style.linksContainer}>
                            <TouchableOpacity onPress={() => {
                                resetField(); // clear fields
                                navigation.navigate('Forget Password'); // move to forget password
                            }}>
                                <Text style={Style.bottomLinks}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                resetField(); // clear fields
                                navigation.navigate('Sign Up'); // moves to sign up
                            }}>
                                <Text style={Style.bottomLinks}>Sign Up</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
    );
};

export default LoginForm;
