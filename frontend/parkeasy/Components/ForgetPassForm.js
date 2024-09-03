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

const ForgetPassForm = ({ navigation }) => {
    const [error, setError] = React.useState('')
    const [email, setEmail] = React.useState('');
    const [isCodeSent, setIsCodeSent] = React.useState(false);
    const [code, setCode] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');


    const handleSendCode = () => {

        // reset fields
        function resetField() {
            setEmail('');
        }

        async function handleResetPasswordRequest() {


            try {
                const response = await axios.post('http://192.168.1.70:8000/api/auth/reset-password', {
                    email,
                })
                setIsCodeSent(true);
            } catch (err) {
                // Print and display actual error message from the response
                console.error('Error during password reset:', err.response ? err.response.data.message : err.message);
                setError(err.response ? err.response.data.message : 'Password reset failed. Please try again.');
            }

        };

        async function handleResetPasswordCompletion() {
            console.log("Code:", code);
            console.log("New Password:", newPassword);
            console.log(email)

            try {
                const response = await axios.post('http://192.168.1.70:8000/api/auth/new-password', {
                    code,
                    email,
                    newPassword,
                })
                navigation.navigate('Login');
            } catch (err) {
                // Print and display actual error message from the response
                console.error('Error during password reset:', err.response ? err.response.data.message : err.message);
                setError(err.response ? err.response.data.message : 'Password reset failed. Please try again.');
            }


        };

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={Style.fullPageContainer}>
                    <View style={Style.loginPageContainer}>

                        <Image source={imageLogo} style={Style.imageLogo}/>

                        {/*Title change condition*/}

                        {/*Credentials */}

                        <View style={Style.credentialsContainer}>

                            <View style={Style.textContainerFB}>
                                <Text style={Style.mainTitleAlter}>
                                    {isCodeSent ? "Enter Verification Code" : "Forgot Password?"}
                                </Text>
                                <Text style={globalStyle.Text}>
                                    {isCodeSent ? "Your code has been sent" : "Dont worry! It happens to all of us. Let's get your account back!"}
                                </Text>
                            </View>
                            {!isCodeSent ? (
                                <>
                                    <View style={Style.fieldCredential}>

                                        <Image source={ICONS.email} style={globalStyle.icons}></Image>

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

                        {/*Buttons and Links*/}

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
    }
};

export default ForgetPassForm;
