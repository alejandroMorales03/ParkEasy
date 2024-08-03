// src/App.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LoginForm from '../Components/LoginForm';

import { useState } from 'react';


const App = () => {
    return (
        <View>
            <Text>Welcome to ParkEasy</Text>
            <LoginForm />
        </View>
    );
}
export default App;

