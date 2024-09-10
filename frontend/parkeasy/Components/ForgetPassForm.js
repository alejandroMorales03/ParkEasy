import React, { useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import Style from "../Styles/CredentialsStyle";
import GlobalStyle from "../Styles/GlobalStyle";
import { COLORS } from "../Constants/Constants";
import imageLogo from "../assets/LogoParkEasyTrans.png";
import { ICONS } from "../Constants/icons";

//////////////////////////////////// API Configuration ////////////////////////////////////

const API = axios.create({
    baseURL: 'http://localhost:8000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

//////////////////////////////////// COMPONENTS ////////////////////////////////////

const InputField = ({ placeholder, value, onChangeText, secureTextEntry = false, icon }) => (
    <View style={Style.fieldCredential}>
        {icon && <Image source={icon} style={GlobalStyle.icons} />}
        <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={GlobalStyle.input}
            placeholderTextColor={COLORS.Grey}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
        />
    </View>
);

const ErrorMessage = ({ error }) => (
    error ? <Text style={GlobalStyle.errorText}>{error}</Text> : null
);

//////////////////////////////////// MAIN COMPONENT ////////////////////////////////////

const ForgetPassForm = ({ navigation }) => {
    // State variables
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    // Reset all input fields
    const resetFields = () => {
        setEmail('');
        setCode('');
        setNewPassword('');
    };

    // Handle sending password reset code
    const handleResetPasswordRequest = async () => {
        try {
            await API.post('/reset-password', { email });
            setIsCodeSent(true);
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Password reset failed. Please try again.');
            console.error('Error during password reset:', err.response ? err.response.data.message : err.message);
        }
    };

    // Handle submitting the verification code and new password
    const handleResetPasswordCompletion = async () => {
        try {
            await API.post('/new-password', { code, email, newPassword });
            navigation.navigate('Login');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Password reset failed. Please try again.');
            console.error('Error during password reset:', err.response ? err.response.data.message : err.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={Style.fullPageContainer}>
                <View style={Style.loginPageContainer}>
                    <Image source={imageLogo} style={Style.imageLogo} />

                    <View style={Style.credentialsContainer}>
                        <View style={Style.textContainerFB}>
                            <Text style={Style.mainTitleAlter}>
                                {isCodeSent ? "Enter Verification Code" : "Forgot Password?"}
                            </Text>
                            <Text style={GlobalStyle.Text}>
                                {isCodeSent ? "Your code has been sent" : "Don't worry! It happens to all of us. Let's get your account back!"}
                            </Text>
                        </View>

                        <ErrorMessage error={error} />

                        {!isCodeSent ? (
                            <ForgotPasswordRequest
                                email={email}
                                setEmail={setEmail}
                                handleResetPasswordRequest={handleResetPasswordRequest}
                            />
                        ) : (
                            <ForgotPasswordCompletion
                                code={code}
                                setCode={setCode}
                                newPassword={newPassword}
                                setNewPassword={setNewPassword}
                                handleResetPasswordCompletion={handleResetPasswordCompletion}
                            />
                        )}
                    </View>

                    <View style={Style.linksContainer}>
                        <TouchableOpacity onPress={() => {
                            resetFields();
                            navigation.navigate('Login');
                        }}>
                            <Text style={Style.bottomLinks}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

//////////////////////////////////// SUB-COMPONENTS ////////////////////////////////////

const ForgotPasswordRequest = ({ email, setEmail, handleResetPasswordRequest }) => (
    <>
        <InputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            icon={ICONS.email}
        />
        <TouchableOpacity onPress={handleResetPasswordRequest} style={Style.button}>
            <Text style={Style.buttonText}>Send Code</Text>
        </TouchableOpacity>
    </>
);

const ForgotPasswordCompletion = ({
                                      code, setCode,
                                      newPassword, setNewPassword,
                                      handleResetPasswordCompletion
                                  }) => (
    <>
        <InputField
            placeholder="Verification Code"
            value={code}
            onChangeText={setCode}
        />
        <InputField
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
        />
        <TouchableOpacity onPress={handleResetPasswordCompletion} style={Style.button}>
            <Text style={Style.buttonText}>Reset Password</Text>
        </TouchableOpacity>
    </>
);

export default ForgetPassForm;
