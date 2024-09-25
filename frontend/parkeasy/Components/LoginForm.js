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
import Style from "../Styles/CredentialsStyle";
import globalStyles from '../Styles/GlobalStyle';
import {COLORS} from "../Constants/Constants";
import { ICONS } from "../Constants/icons";
import imageLogo from "../assets/LogoParkEasyTrans.png";
import GlobalStyle from "../Styles/GlobalStyle";
import axios from 'axios';

//////////////////////////////////// MAIN COMPONENT ////////////////////////////////////

const LoginForm = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
                        <Image source={imageLogo} style={Style.imageLogo} />

                        {/*Credential section*/}
                        <View style={Style.credentialsContainer}>
                            <Text style={Style.mainTitle}>Login</Text>

                            {error ? (
                                <Text style={globalStyles.errorText}>
                                    {error}
                                </Text>
                            ) : null}

                            {/* This is the email input */}
                            <View style={Style.fieldCredential}>
                                <Image source={ICONS.email} style={GlobalStyle.icons}></Image>
                                <TextInput
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={globalStyles.input}
                                    placeholderTextColor={COLORS.Grey}
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* This is the Password Input */}
                            <View style={Style.fieldCredential}>
                                <Image source={ICONS.password} style={globalStyles.icons}></Image>
                                <TextInput
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChangeText={setPassword}
                                    style={globalStyles.input}
                                    placeholderTextColor={COLORS.Grey}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity onPress={handleLogin} style={Style.button}>
                                <Text style={Style.buttonText}>Login</Text>
                            </TouchableOpacity>

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
