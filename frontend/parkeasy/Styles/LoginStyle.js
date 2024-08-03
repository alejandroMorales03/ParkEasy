import { StyleSheet } from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS } from '../Constants/Constants'

const LoginStyle = StyleSheet.create({
    loginPageContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    loginBoxContainer: {

        borderRadius: 30,
        padding: 40,
        width: '75%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: CONTAINERS.PrimaryColorContainer,
    },

    mainTitleFont: {

        fontSize: SIZES.medium,
        fontWeight: 'bold',
        color: COLORS.White
    },

    input: {
        height: 40,
        width: '100%',
        borderColor: COLORS.Black,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        color: COLORS.Black,
        backgroundColor: COLORS.White,

    }
})

export default LoginStyle;