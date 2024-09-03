import React from 'react';
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
import GlobalStyle from "../Styles/GlobalStyle";
import Style from "../Styles/CredentialsStyle";
import {COLORS} from "../Constants/Constants";
import imageLogo from "../assets/LogoParkEasyTrans.png";
import {ICONS} from "../Constants/icons";
import globalStyle from "../Styles/GlobalStyle";
import globalStyles from "../Styles/GlobalStyle";

const ForgetPassForm = ({ navigation }) => {
    const [error, setError] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isCodeSent, setIsCodeSent] = React.useState(false);
    const [code, setCode] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');

    const handleResetPasswordRequest = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/reset-password', {
                email,
            });
            setIsCodeSent(true);
        } catch (err) {
            console.error('Error during password reset:', err.response ? err.response.data.message : err.message);
            setError(err.response ? err.response.data.message : 'Password reset failed. Please try again.');
        }
    };

    const handleResetPasswordCompletion = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/new-password', {
                code,
                email,
                newPassword,
            });
            navigation.navigate('Login');
        } catch (err) {
            console.error('Error during password reset:', err.response ? err.response.data.message : err.message);
            setError(err.response ? err.response.data.message : 'Password reset failed. Please try again.');
        }
    };

    const resetField = () => {
        setEmail('');
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
                            <Text style={globalStyle.Text}>
                                {isCodeSent ? "Your code has been sent" : "Don't worry! It happens to all of us. Let's get your account back!"}
                            </Text>
                        </View>

                        {/* Display error message if any */}
                        {error ? (
                            <Text style={globalStyles.errorText}>
                                {error}
                            </Text>
                        ) : null}

                        {!isCodeSent ? (
                            <>
                                <View style={Style.fieldCredential}>
                                    <Image source={ICONS.email} style={globalStyle.icons} />
                                    <TextInput
                                        placeholder="Email"
                                        value={email}
                                        onChangeText={setEmail}
                                        style={GlobalStyle.input}
                                        placeholderTextColor={COLORS.Grey}
                                        autoCapitalize={false}
                                    />
                                </View>
                                <TouchableOpacity onPress={handleResetPasswordRequest} style={Style.button}>
                                    <Text style={Style.buttonText}>Send Code</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <View style={Style.fieldCredential}>
                                    <TextInput
                                        placeholder="Verification Code"
                                        value={code}
                                        onChangeText={setCode}
                                        style={GlobalStyle.input}
                                        placeholderTextColor={COLORS.Grey}
                                    />
                                </View>
                                <View style={Style.fieldCredential}>
                                    <TextInput
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChangeText={setNewPassword}
                                        style={GlobalStyle.input}
                                        placeholderTextColor={COLORS.Grey}
                                        secureTextEntry
                                    />
                                </View>
                                <TouchableOpacity onPress={handleResetPasswordCompletion} style={Style.button}>
                                    <Text style={Style.buttonText}>Reset Password</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>

                    <View style={Style.linksContainer}>
                        <TouchableOpacity onPress={() => {
                            resetField();
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

export default ForgetPassForm;
