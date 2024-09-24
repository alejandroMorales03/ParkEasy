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
    TouchableWithoutFeedback
} from 'react-native';
import Style from "../Styles/CredentialsStyle";
import globalStyles from '../Styles/GlobalStyle';
import {COLORS} from "../Constants/Constants";
import GlobalStyle from "../Styles/GlobalStyle";

const SignUpForm = ({ navigation }) => {
    //TODO: Get users location via longitude and latitude

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [confirmCode, setConfirmCode] = useState('');


    // field clean up

    function resetField(){
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setConfirmPassword('');
    }

   

    // Function to handle sign-up
    async function handleSignUp() {
        // Reset error message
        setError('');
    
        // Check if all fields are filled
        if (!email || !firstName || !lastName || !password || !confirmPassword) {
            setError('Please fill out all fields.');
            return;
        }
    
        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
    
        try {
            // Send data to the backend

            //Use localhost if running simulator, IP from computer if using external device like your phone
            const response = await axios.post('http://localhost:8000/api/auth/signup', {
                email,
                firstName,
                lastName,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            

            console.log(response.data);
    
            // If all checks pass, proceed to send code logic
            setIsCodeSent(true);
    
        } catch (err) {
            // Print and display actual error message from the response
            console.error('Error during sign-up:', err.response ? err.response.data.message : err.message);
            setError(err.response ? err.response.data.message : 'Sign-up failed. Please try again.');
            resetField(); // cleans fields when there is an error
        }
    }

    // Function to handle confirmation code submission
    async function handleConfirmCode() {
        if (!confirmCode) {
            setError('Please enter the confirmation code sent to your email.');
            return;
        }
    
        try {
            // Send the confirmation code to the backend for verification
            //Use localhost if running simulator, IP from computer if using external device like your phone
            const response = await axios.post('http://localhost:8000/api/auth/verify-signup', {
                email,
                code: confirmCode
            });
    
            console.log(response.data);
    

     
            // Navigate to the Login page or other appropriate screen after successful confirmation
            navigation.navigate('Login');
    
        } catch (err) {
            console.error('Error verifying code:', err.response ? err.response.data : err.message);
            setError(err.response? err.response.data.message : 'Verification failed. Please try again.');
        }
    }
    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={Style.fullPageContainer}>
                <View style={Style.loginPageContainer}>

                    {/* Title of page */}
                    <Text style={Style.mainTitle}>Sign Up</Text>

                    {!isCodeSent ? (
                        <>
                            {/* Page Text */}
                            <Text style={globalStyles.Text}>Let's make you part of this!</Text>

                            {/* Display error message if any */}
                            {error ? (
                                <Text style={globalStyles.errorText}>
                                    {error}
                                </Text>
                            ) : null}


                            {/* First Name Input */}
                            <View style={Style.fieldCredential}>
                                <TextInput
                                    placeholder="First Name"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    style={globalStyles.input}
                                    placeholderTextColor={COLORS.Grey}
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Last Name Input */}
                            <View style={Style.fieldCredential}>
                                <TextInput
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChangeText={setLastName}
                                    style={globalStyles.input}
                                    placeholderTextColor={COLORS.Grey}
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Email Input */}
                            <View style={Style.fieldCredential}>
                                <TextInput
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={globalStyles.input}
                                    placeholderTextColor={COLORS.Grey}
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Password Input */}
                            <View style={Style.fieldCredential}>
                                <TextInput
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    style={globalStyles.input}
                                    placeholderTextColor={COLORS.Grey}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Confirm Password Input */}
                            <View style={Style.fieldCredential}>
                                <TextInput
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    style={globalStyles.input}
                                    placeholderTextColor={COLORS.Grey}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Sign Up Button */}
                            <TouchableOpacity onPress={handleSignUp} style={Style.button}>
                                <Text style={Style.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            {/* Confirmation Code Message */}
                            <Text style={globalStyles.Text}>Your code has been sent! Please check your email.</Text>

                            {/* Display error message if any */}
                            {error ? (
                                <Text style={globalStyles.errorText}>
                                    {error}
                                </Text>
                            ) : null}

                            {/* Confirmation Code Input */}
                            <View style={Style.fieldCredential}>
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Enter confirmation code"
                                    value={confirmCode}
                                    onChangeText={setConfirmCode}
                                    placeholderTextColor={COLORS.Grey}
                                />
                            </View>
                            {/*TODO fix the distance of the link buttons*/}
                            {/* Submit Confirmation Code Button */}
                            <TouchableOpacity onPress={handleConfirmCode} style={Style.button}>
                                <Text style={Style.buttonText}>Submit Code</Text>
                            </TouchableOpacity>



                            <View style={Style.linksContainer}>

                            {/* Resent Password */}

                            <TouchableOpacity onPress={handleSignUp}>
                                <Text style={Style.bottomLinks}>Resend Code</Text>
                            </TouchableOpacity>

                             {/* Back Button */}

                             <TouchableOpacity onPress={() => {
                                 navigation.navigate('Login');
                                 resetField();
                             }}>
                                 <Text style={Style.bottomLinks}>Back</Text>
                             </TouchableOpacity>
                            </View>
                    </>

                    )}

                     {/* Resend Code Button */}




                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SignUpForm;
