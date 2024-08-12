import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image} from 'react-native';
import Style from "../Styles/CredentialsStyle";
import {COLORS} from "../Constants/Constants";
import imageLogo from "../assets/LogoParkEasyTrans.png";
import ForgetPassForm from "./ForgetPassForm";

const LoginForm = ({ navigation }) => {

    const [email, setEmail] = React.useState(''); // this is used to keep the block empty to add emails
    const [password, setPassword] = React.useState(''); // this is used to keep the password

    // testing with console log

    function handleLogin(){
        console.log("Email: ", email);
        console.log("Password: ", password);
    }

    return (
        <SafeAreaView>
            <View style={Style.loginPageContainer}>
                {/*<Text style={loginStyle.mainTitle}>ParkEasy</Text>*/}

                <Image source={imageLogo} style={Style.imageLogo} />


                <View style={Style.loginBoxContainer}>

                    {/* This is the email input */}

                    <TextInput
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChangeText={setEmail}
                        style={Style.input}
                        placeholderTextColor={COLORS.Grey}
                        autoFocus={true}
                        autoCapitalize="none"
                    />

                    {/* This is the Password Input */}

                    <TextInput
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChangeText={setPassword}
                        style={Style.input}
                        placeholderTextColor={COLORS.Grey}
                        secureTextEntry
                        autoFocus={true}
                        autoCapitalize="none"
                    />

                    {/* Login Button */}

                    <TouchableOpacity onPress={handleLogin} style={Style.button}>
                        <Text style={Style.buttonText}>Login</Text>
                    </TouchableOpacity>

                    {/* Forgot Password and Sign Up Links */}
                </View>

                {/* Links Container */}
                <View style={Style.linksContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Forget Password')} >
                        <Text style={Style.bottomLinks}>Forgot Password</Text>
                    </TouchableOpacity>

                    {/*TODO once the sign up page is done we can add it to the stack navigation*/}
                    <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                        <Text style={Style.bottomLinks}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default LoginForm;
