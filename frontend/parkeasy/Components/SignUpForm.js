import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image} from 'react-native';
import Style from "../Styles/CredentialsStyle";
import globalStyles from '../Styles/GlobalStyle';
import {COLORS} from "../Constants/Constants";
import imageLogo from "../assets/LogoParkEasyTrans.png";
import ForgetPassForm from "./ForgetPassForm";

const SignUpForm = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>This is the Sign Up Page</Text>

            {/*Back Button*/}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={Style.bottomLinks}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SignUpForm;

