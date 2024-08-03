import { StyleSheet } from 'react-native';
import { COLORS , SIZES, FONT, CONTAINERS } from '../Constants/Constants'

const LoginStyle = StyleSheet.create({
    loginPageContainer: {
        height: '100%',
        width: '100%',
    },

    loginBoxContainer: {
        padding: 60,
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: CONTAINERS.PrimaryColorContainer,
    },

    mainTitleFont: {

        fontSize: SIZES.medium,
        fontWeight: 'bold',
        color: COLORS.White

    },

    loginFontContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: COLORS.White,

    }

})

export default LoginStyle;