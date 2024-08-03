import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { useState } from 'react';
import LoginStyle from '../Styles/LoginStyle';
import loginStyle from "../Styles/LoginStyle";

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
            <View style={loginStyle.container}>
                <View style = {loginStyle.loginBoxContainer}>
                    <Text style={
                        loginStyle.mainTitleFont
                    }>Login</Text>

                    {/*This is the email input*/}
                    <TextInput
                        placeholder="Email"
                        type="email"
                        value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                    />

                    {/*This is the Password Input*/}
                    <TextInput
                        placeholder="Password"
                        type="password"
                        value={password}
                        // onChange={(e) => setEmail(e.target.value)}
                    />

                </View>
            </View>


        </SafeAreaView>

    )


}

export default LoginForm;

// send the info to the server (connection between frontend and backend)


