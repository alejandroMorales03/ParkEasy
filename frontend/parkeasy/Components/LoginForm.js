import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image} from 'react-native';
import loginStyle from "../Styles/LoginStyle";
import {COLORS} from "../Constants/Constants";
import imageLogo from "../assets/LogoParkEasyTrans.png";

const LoginForm = (props) => {

    const [email, setEmail] = React.useState(''); // this is used to keep the block empty to add emails
    const [password, setPassword] = React.useState(''); // this is used to keep the password

    // testing with console log

    function handleLogin(){
        console.log("Email: ", email);
        console.log("Password: ", password);
    }

    return (
        <SafeAreaView>
            <View style={loginStyle.loginPageContainer}>
                {/*<Text style={loginStyle.mainTitle}>ParkEasy</Text>*/}

                <Image source={imageLogo} style={loginStyle.imageLogo} />


                <View style={loginStyle.loginBoxContainer}>

                    {/* This is the email input */}

                    <TextInput
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChangeText={setEmail}
                        style={loginStyle.input}
                        placeholderTextColor={COLORS.Grey}
                    />

                    {/* This is the Password Input */}

                    <TextInput
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChangeText={setPassword}
                        style={loginStyle.input}
                        placeholderTextColor={COLORS.Grey}
                    />

                    {/* Login Button */}

                    <TouchableOpacity onPress={handleLogin} style={loginStyle.button}>
                        <Text style={loginStyle.buttonText}>Login</Text>
                    </TouchableOpacity>

                    {/* Forgot Password and Sign Up Links */}
                </View>

                {/* Links Container */}
                <View style={loginStyle.linksContainer}>
                    <TouchableOpacity>
                        <Text style={loginStyle.bottomLinks}>Forgot Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={loginStyle.bottomLinks}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default LoginForm;
