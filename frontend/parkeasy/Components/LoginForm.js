import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { useState } from 'react';
import LoginStyle from '../Styles/LoginStyle';
import loginStyle from "../Styles/LoginStyle";
import {COLORS} from "../Constants/Constants";

const LoginForm = (props) => {

    const [email, setEmail] = React.useState(''); // this is used to keep the block empty to add emails
    const [password, setPassword] = React.useState(''); // this is used to keep the password

    // testing with console log

    function handleLogin(){
        console.log("Email: " ,email);
        console.log("Password: " ,password);
    }

    return (
        <SafeAreaView>
            <View style={loginStyle.loginPageContainer}>
                <Text style={loginStyle.mainTitle}>ParkEasy</Text>
                <View style = {loginStyle.loginBoxContainer}>
                    <Text style={
                        loginStyle.mainTitleFont
                    }>Login</Text>

                    {/*This is the email input*/}
                    <TextInput
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChangeText={setEmail}
                        style={loginStyle.input}
                        placeholderTextColor={COLORS.Grey}
                        // onChange={(e) => setEmail(e.target.value)}
                    />

                    {/*This is the Password Input*/}
                    <TextInput
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChangeText={setPassword}
                        style={loginStyle.input}
                        placeholderTextColor={COLORS.Grey}
                        // onChange={(e) => setEmail(e.target.value)}
                    />

                </View>
            </View>


        </SafeAreaView>

    )


}

export default LoginForm;

// send the info to the server (connection between frontend and backend)


