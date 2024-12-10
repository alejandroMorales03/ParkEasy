import React, {useState} from 'react';
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
import Style from "../../Styles/CredentialsStyle";
import GlobalStyle from "../../Styles/GlobalStyle";
import CredentialsStyle from "../../Styles/CredentialsStyle";
import { COLORS } from "../../Constants/Constants";
import imageLogo from "../../assets/logos/logo_pin_color.svg";
import { ICONS } from "../../Constants/icons";

import LogoPinColor from '../../assets/logos/logo_pin_color.svg';
import EmailIcon from "../../assets/icons/input_mail.svg";

import PrimaryButton from "../BasicComponents/PrimaryButton";
import BottomLink from "../BasicComponents/BottomLink";
import ErrorDialog from "../BasicComponents/ErrorDialog";
import InputField from "../BasicComponents/InputField";


//////////////////////////////////// API Configuration ////////////////////////////////////

const API = axios.create({
    baseURL: 'http://localhost:8000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

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
            resetField()
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={Style.fullPageContainer}>
                <View style={Style.loginPageContainer}>
                   <LogoPinColor style={CredentialsStyle.imageLogo} />

                    <View style={Style.credentialsContainer}>
                        <View style={Style.textContainerFB}>
                            <Text style={Style.mainTitleAlter}>
                                {isCodeSent ? "Enter Verification Code" : "Forgot Password?"}
                            </Text>
                            <Text style={GlobalStyle.Text}>
                                {isCodeSent ? "Your code has been sent" : "Don't worry! It happens to all of us. Let's get your account back!"}
                            </Text>
                        </View>

                        <ErrorDialog error={error} />

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

                        <BottomLink navigation = {navigation} text="Back" navigateTo= "Login" resetField={resetFields} fontWeight='normal'/>
                        
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

//////////////////////////////////// SUB-COMPONENTS ////////////////////////////////////

const ForgotPasswordRequest = ({ email, setEmail, handleResetPasswordRequest }) => (
    <>
        <InputField placeholder="Email" keyboardType="email-address" onChange={setEmail} value={email} hasIcon= "true" SideIcon = {EmailIcon} />

        <PrimaryButton onPressButton ={handleResetPasswordRequest} InsideText ="Send Code"/>
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

        <PrimaryButton onPressButton ={handleResetPasswordCompletion} InsideText ="Reset Password"/>


    </>
);

export default ForgetPassForm;
