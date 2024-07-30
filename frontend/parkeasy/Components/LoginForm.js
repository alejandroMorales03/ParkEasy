import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import loginCSS from '../Styles/loginCSS';
import { useState } from 'react';

// import LinearGradient from 'react-native-linear-gradient'; //TODO check this gradient
// import { COLORS } from '../Constants/Constants';

function LoginForm(props) {

    const [email, setEmail] = React.useState(''); // this is used to keep the block empty to add a emails
    const [password, setPassword] = React.useState(''); // this is used to keep the password

    // testing with console log

    function handleLogin(){
        console.log("Email: " ,email);
        console.log("Password: " ,password);
    }


    return (
        <View className ="LoginBox" >

        </View>
    )


}

// send the info to the server (connection between frontend and backend)


