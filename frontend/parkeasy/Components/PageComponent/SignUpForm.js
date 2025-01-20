
import React, {useState} from 'react';
import axios from 'axios'
// import config from '../../../backend/config/config';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import InputField from "../BasicComponents/InputField";
import Style from "../../Styles/CredentialsStyle";
import globalStyles from '../../Styles/GlobalStyle';
import { COLORS } from "../../Constants/Constants";
import PrimaryButton from "../BasicComponents/PrimaryButton";
import ErrorDialog from '../BasicComponents/ErrorDialog';
import BottomLink from '../BasicComponents/BottomLink';

//////////////////////////////////// API Configuration ////////////////////////////////////

const API = axios.create({
    baseURL: 'http://192.168.1.211:8000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

//////////////////////////////////// MAIN COMPONENT ////////////////////////////////////

const SignUpForm = ({ navigation }) => {
    // State variables

    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmed_password, setConfirmPassword] = useState('');
    const [error, setError] = useState({})
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [code, setConfirmCode] = useState('');



    // Reset all input fields
    const resetFields = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setConfirmPassword('');
        setConfirmCode('');
        setError({});
    };

    // Handle sign-up submission
    const handleSignUp = async () => {
       

        try {
            const response = await API.post('/signup', { email, first_name, last_name, password, confirmed_password});
            console.log(response.data);
            setIsCodeSent(true);
        } catch (err) {
            setError(err.response.data.error);
            console.log(err.response.data.error);
        }
    };

    // Handle confirmation code submission
    const handleConfirmCode = async () => {
        if (!code) {
            setError('Please enter the confirmation code sent to your email.');
            return;
        }

        try {
            const response = await API.post('/verify-signup', { email, code, first_name, last_name, password });
            console.log(response.data);
            navigation.navigate('Login');
        } catch (err) {
            setError(err.response.data.error);
            console.log(err.response.data.error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={Style.fullPageContainer}>
                <View style={Style.loginPageContainer}>
                    <View style={Style.topContainer}>
                        <Text style={Style.mainTitle}>Sign Up</Text>
                        {!isCodeSent ? (
                            <Text style={globalStyles.Text}>Let's make you part of this!</Text>
                        ) : (
                            <Text style={globalStyles.Text}>Your code has been sent! Please check your email.</Text>
                            )}

                    </View>

                    {!isCodeSent ? (
                        // page view when code is not sent!

                        <SignUpFormNotCodeSent
                            {...{ email,
                                setEmail,
                                firstName: first_name,
                                setFirstName,
                                lastName: last_name,
                                setLastName,
                                password,
                                setPassword,
                                confirmed_password,
                                setConfirmPassword,
                                handleSignUp,
                                error }}
                        />

                    ) : (
                        // page view when code is sent!

                        <SignUpFormCodeSent
                            {...{ confirmCode: code, setConfirmCode, handleConfirmCode, error }}
                        />
                    )}

                    <View style={Style.linksContainer}>
                            {isCodeSent && (
                                <BottomLink text="Resend Code" resetField={handleConfirmCode} fontWeight='bold'/>
                            )}

                             <BottomLink navigation = {navigation} text="Back" navigateTo= "Login" resetField={resetFields} fontWeight='normal'/>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

//////////////////////////////////// SUB-COMPONENTS ////////////////////////////////////

const SignUpFormNotCodeSent = ({
                                   email, setEmail,
                                   firstName, setFirstName,
                                   lastName, setLastName,
                                   password, setPassword,
                                   confirmPassword, setConfirmPassword,
                                   handleSignUp,
                                   error
                               }) => (
    <>
        {/*This is the error space */}
        <ErrorDialog error={error.message? error.message : null} /> 

        {/*Setting input fields for each variable*/}
        <InputField placeholder="First Name"  onChange={setFirstName} value={firstName} errorTray ={error.first_name? error.first_name.message : null} />
        <InputField placeholder="Last Name" value={lastName} onChange={setLastName} errorTray ={error.last_name? error.last_name.message : null}/>
        <InputField placeholder="Email" value={email} onChange={setEmail} errorTray ={error.email? error.email.message : null}/>

        {/** For this one (the password) you need to extract the message list because there is way more than one message so you can't 
         *   pass the string. Do  this Object.values(error.password.message) so u can pass a full array but in the case of this field u need to handle a way of printing the contents
         * 
         */}
        <InputField placeholder="Password" value={password} onChange={setPassword} secureTextEntry errorTray={error.password? Object.values(error.password.message) : null} password_input = {true}/>
        <InputField placeholder="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} secureTextEntry  errorTray={error.confirmed_password? error.confirmed_password.message: null}/>

        <PrimaryButton onPressButton ={handleSignUp} InsideText ="Sign Up"/>
    </>
);


const SignUpFormCodeSent = ({ confirmCode, setConfirmCode, handleConfirmCode, error }) => (
    <>

        {/*This is the error space */}
        <ErrorDialog error={error.message ? error.message : null} />

        {/*Setup Input Fields*/}
        <InputField placeholder="Enter confirmation code" value={confirmCode} onChange={setConfirmCode} />

        <PrimaryButton onPressButton ={handleConfirmCode} InsideText ="Submit Code"/>

        <View style={Style.linksContainer}>
            
        </View>
    </>
);

export default SignUpForm;

