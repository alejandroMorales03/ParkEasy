import React from 'react';
import {View, Text, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import Style from "../Styles/CredentialsStyle";
import {COLORS} from "../Constants/Constants";

const ForgetPassForm = ({ navigation }) => {
    const [email, setEmail] = React.useState(''); // State for email input
    const [isCodeSent, setIsCodeSent] = React.useState(false); // State to track if the code has been sent
    const [code, setCode] = React.useState(''); // State for verification code input
    const [newPassword, setNewPassword] = React.useState(''); // State for new password input

    // Function to handle sending the code
    const handleSendCode = () => {
        // TODO: Implement code sending logic
        setIsCodeSent(true); // Set the state to true to show the verification form
    };

    // Function to handle code verification and password reset
    const handleVerifyCodeAndResetPassword = () => {
        // TODO: Implement code verification and password reset logic
        console.log("Code:", code);
        console.log("New Password:", newPassword);
        // After successful password reset, navigate back to the login page
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView>
            <View style={Style.loginPageContainer}>
                <Text style={Style.mainTitle}>
                    {/*Condition of title when code is sent*/}
                    {isCodeSent ? "Enter Verification Code" : "Forgot Password"}

                </Text>
                <View style={Style.loginBoxContainer}>
                    {!isCodeSent ? ( // condition for the code sent
                        // Email input and send code button
                        <>
                            <TextInput
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                style={Style.input}
                                placeholderTextColor={COLORS.Grey}
                                autoFocus={true}
                            />
                            <TouchableOpacity onPress={handleSendCode} style={Style.button}>
                                <Text style={Style.buttonText}>Send Code</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        // Code verification and new password form
                        <>
                            <TextInput
                                placeholder="Verification Code"
                                value={code}
                                onChangeText={setCode}
                                style={Style.input}
                                placeholderTextColor={COLORS.Grey}
                                autoFocus={true}
                            />
                            <TextInput
                                placeholder="New Password"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                style={Style.input}
                                placeholderTextColor={COLORS.Grey}
                                secureTextEntry
                                autoFocus={true}
                            />
                            <TouchableOpacity onPress={handleVerifyCodeAndResetPassword} style={Style.button}>
                                <Text style={Style.buttonText}>Reset Password</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={Style.bottomLinks}>Back</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ForgetPassForm;
