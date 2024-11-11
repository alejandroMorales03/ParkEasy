
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
import InputField from "./BasicComponents/InputField";
import Style from "../Styles/CredentialsStyle";
import globalStyles from '../Styles/GlobalStyle';
import { COLORS } from "../Constants/Constants";

//////////////////////////////////// API Configuration ////////////////////////////////////

const API = axios.create({
    baseURL: 'http://localhost:8000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

//////////////////////////////////// COMPONENTS ////////////////////////////////////

const ErrorMessage = ({ error }) => (
    error ? <Text style={globalStyles.errorText}>{error}</Text> : null
);

//////////////////////////////////// MAIN COMPONENT ////////////////////////////////////

const SignUpForm = ({ navigation }) => {
    // State variables

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [confirmCode, setConfirmCode] = useState('');


    // Reset all input fields
    const resetFields = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setConfirmPassword('');
        setConfirmCode('');
    };

    // Handle sign-up submission
    const handleSignUp = async () => {
        setError('');

        // Validate input fields
        if (!email || !firstName || !lastName || !password || !confirmPassword) {
            setError('Please fill out all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await API.post('/signup', { email, firstName, lastName, password });
            console.log(response.data);
            setIsCodeSent(true);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Sign-up failed. Please try again.');
            resetFields(); // cleans fields when there is an error

            console.error('Error during sign-up:', err.response ? err.response.data.message : err.message);
        }
    };

    // Handle confirmation code submission
    const handleConfirmCode = async () => {
        if (!confirmCode) {
            setError('Please enter the confirmation code sent to your email.');
            return;
        }

        try {
            const response = await API.post('/verify-signup', { email, code: confirmCode });
            console.log(response.data);
            navigation.navigate('Login');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Verification failed. Please try again.');
            console.error('Error verifying code:', err.response ? err.response.data.message : err.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={Style.fullPageContainer}>
                <View style={Style.loginPageContainer}>
                    <Text style={Style.mainTitle}>Sign Up</Text>

                    {!isCodeSent ? (
                        // page view when code is not sent!

                        <SignUpFormNotCodeSent
                            {...{ email, setEmail, firstName, setFirstName, lastName, setLastName, password, setPassword, confirmPassword, setConfirmPassword, handleSignUp, error }}
                        />

                    ) : (
                        // page view when code is sent!

                        <SignUpFormCodeSent
                            {...{ confirmCode, setConfirmCode, handleConfirmCode, error }}
                        />
                    )}

                    <View style={Style.linksContainer}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Login'); resetFields(); }}>
                            <Text style={Style.bottomLinks}>Back</Text>
                        </TouchableOpacity>
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
        <Text style={globalStyles.Text}>Let's make you part of this!</Text>

        {/*This is the error space */}
        <ErrorMessage error={error} />

        {/*Setting input fields for each variable*/}
        <InputField placeholder="First Name"  onChange={setFirstName} value={firstName} />
        <InputField placeholder="Last Name" value={lastName} onChange={setLastName} />
        <InputField placeholder="Email" value={email} onChange={setEmail} />
        <InputField placeholder="Password" value={password} onChange={setPassword} secureTextEntry/>
        <InputField placeholder="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} secureTextEntry />

        <TouchableOpacity onPress={handleSignUp} style={Style.button}>
            <Text style={Style.buttonText}>Sign Up</Text>
        </TouchableOpacity>
    </>
);


const SignUpFormCodeSent = ({ confirmCode, setConfirmCode, handleConfirmCode, error }) => (
    <>
        <Text style={globalStyles.Text}>Your code has been sent! Please check your email.</Text>
        {/*This is the error space */}
        <ErrorMessage error={error} />

        {/*Setup Input Fields*/}
        <InputField placeholder="Enter confirmation code" value={confirmCode} onChangeText={setConfirmCode} />

        <TouchableOpacity onPress={handleConfirmCode} style={Style.button}>
            <Text style={Style.buttonText}>Submit Code</Text>
        </TouchableOpacity>

        <View style={Style.linksContainer}>
            <TouchableOpacity onPress={handleConfirmCode}>
                <Text style={Style.bottomLinks}>Resend Code</Text>
            </TouchableOpacity>
        </View>
    </>
);

export default SignUpForm;
