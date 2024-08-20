import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableWithoutFeedback, Keyboard
} from 'react-native';
import Style from "../Styles/CredentialsStyle";
import globalStyles from '../Styles/GlobalStyle';
import {COLORS} from "../Constants/Constants";
import { ICONS } from "../Constants/icons";
import imageLogo from "../assets/LogoParkEasyTrans.png";
import ForgetPassForm from "./ForgetPassForm";
import GlobalStyle from "../Styles/GlobalStyle";

const LoginForm = ({ navigation }) => {

    const [email, setEmail] = React.useState(''); // this is used to keep the block empty to add emails
    const [password, setPassword] = React.useState(''); // this is used to keep the password

    // testing with console log

    function handleLogin(){
        console.log("Email: ", email);
        console.log("Password: ", password);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={Style.fullPageContainer}>
                <View style={Style.loginPageContainer}>

                    <Image source={imageLogo} style={Style.imageLogo} />

                    <View style={Style.credentialsContainer}>

                        <Text style={Style.mainTitle}>Login</Text>

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
                        <TouchableOpacity onPress={() => navigation.navigate('Forget Password')} >
                            <Text style={Style.bottomLinks}>Forgot Password?</Text>
                        </TouchableOpacity>

                        {/*TODO once the sign up page is done we can add it to the stack navigation*/}
                        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                            <Text style={Style.bottomLinks}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
        );
    };

export default LoginForm;
