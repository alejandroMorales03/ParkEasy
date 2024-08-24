import React from 'react';
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
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isCodeSent, setIsCodeSent] = React.useState(false);
    const [confirmCode, setConfirmCode] = React.useState('');

    // Function to handle sign-up
    function handleSignUp() {
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

        // If all checks pass, proceed to send code logic
        setIsCodeSent(true);

        console.log("Email: ", email);
        console.log("Password: ", password);
        console.log("First Name: ", firstName);
        console.log("Last Name: ", lastName);

        // Simulate sending the confirmation code
        console.log("Sending confirmation code to email: ", email);
    }

    // Function to handle confirmation code submission
    function handleConfirmCode() {
        if (!confirmCode) {
            setError('Please enter the confirmation code sent to your email.');
            return;
        }

        console.log("Confirmation Code: ", confirmCode);

        // Navigate to login or other appropriate screen after successful confirmation
        navigation.navigate('Login');
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

                            {/* Submit Confirmation Code Button */}
                            <TouchableOpacity onPress={handleConfirmCode} style={Style.button}>
                                <Text style={Style.buttonText}>Submit Code</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {/* Back Button */}
                    <View style={Style.linksContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={Style.bottomLinks}>Back</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SignUpForm;
