import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import loginStyle from '../Styles/loginStyle';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../Constants/constants';




const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        
        console.log('Email:', email);
        console.log('Password:', password);
      };
    
  return (
    <LinearGradient colors={['#23443B', '#11665F', '#50DACB', '#BCABAE', '#C9C5CB', '#C8D4EC']} style={loginStyle.container}>
        <View style={loginStyle.form}>
            <View style={loginStyle.inputConatiner}>
                <TextInput style={loginStyle.input}
                           placeholder='Email Address'
                           keyboardType='email-address'
                           autoCapitalize='none'
                           autoCorrect={false}
                           onChange={setEmail}
                           value={email}>
                
                            
                </TextInput>
            </View>
            <View style={loginStyle.inputConatiner}>
                <TextInput style={loginStyle.input}
                           placeholder='Password'
                           secureTextEntry={true}
                           onChange={setPassword}
                           value={password}>
                    
                </TextInput>
            </View>

            <View>
                <TouchableOpacity style={loginStyle.button}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>


        </View>

    </LinearGradient>
    
  );
};

export default LoginForm;
