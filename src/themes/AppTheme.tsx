import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    alignItemsCenter: {
        alignItems: 'center'
    },
    bigTitle: {
        color: "#FFFFFF",
        fontSize: 60,
        textAlign: "center"
    },
    body: {
        color: '#2F2F2F',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20,
        marginBottom: 5,
        marginTop: 20
    },
    bodySmall: {
        color: '#2F2F2F',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.28,
        lineHeight: 20
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#207CFD',
        borderRadius: 8,
        padding: 10,
        width: '100%'
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 50
    },
    buttonImagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 25
    },
    buttonReturn: {
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginEnd: 320,
        marginStart: 20,
        marginTop: 30
    },
    buttonSkip: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 100
    },
    buttonTransparent: {
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    buttonText: {
        color: 'rgba(250, 250, 250, 0.98)',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
        letterSpacing: -0.32
    },
    caption: {
        color: '#101F11',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 15,
        letterSpacing: -0.26
    },
    captionLink: {
        color: '#207CFD',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 15,
        letterSpacing: -0.26
    },
    companiesNameMargins: {
        marginEnd: 5,
        marginTop: -75
    },
    createAccountButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 38,
        marginTop: 32
    },
    decisionContainer: {
        flex: 1,
        marginHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flexDirectionRowTinyMarginTop: {
        flexDirection: 'row',
        marginTop: 5
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 30,
        marginTop: 12
    },
    formContainer: {
        flex: 2,
        paddingHorizontal: 30,
        marginTop: 10
    },
    footnote: {
        color: '#081023',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: -0.24
    },
    h4: {
        color: '#2F2F2F',
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: -0.4,
        lineHeight: 28
    },
    hoursDropdownContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5
    },
    hoursDropdown: {
        borderColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 2,
        flex: 2,
        height: 25,
        marginHorizontal: 5,
        marginTop: 25,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    inputField: {
        color: '#081023',
        fontSize: 12,
        letterSpacing: -0.24,
        lineHeight: 16,
        padding: 16
    },
    inputFieldContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
        borderColor: '#2F2F2F',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 16
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    label: {
        color: "#FFFFFF",
        fontWeight: "bold",
        marginTop: 25
    },
    largeMarginTop: {
        marginTop: 32
    },
    link: {
        color: '#5856D6',
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    linkWhite: {
        color: '#FFFFFF',
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    loginBackground: {
        backgroundColor: '#081023',
        borderBottomEndRadius: 16,
        borderBottomStartRadius: 16,
        height: 230,
        position: 'absolute',
        width: '100%'
    },
    loginButtonContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    loginButtonText: {
        color: '#207CFD',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.26,
        lineHeight: 20
    },
    loginFormContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 35,
        marginHorizontal: 20,
        marginTop: 74,
        minHeight: 720,
        paddingHorizontal: 22
    },
    mainLogo: {
        height: 107,
        marginVertical: 40,
        width: 239
    },
    mediumMarginBottom: {
        marginBottom: 20
    },
    mediumTitle: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    newUserButtonContainer: {
        alignItems: 'flex-end',
        marginBottom: 20,
        marginEnd: 10
    },
    pillsContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 10,
        marginEnd: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    plainMediumText: {
        color: '#081023',
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20
    },
    plainMediumTextLink: {
        color: '#207CFD',
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 15
    },
    registerFormContainer: {
        paddingHorizontal: 30,
        marginTop: 10
    },
    rowHeaderStyle: {
        height: 40
    },
    rowTextStyle: {
        color: '#FFFFFF',
        margin: 6
    },
    scrollViewBackground: {
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
        paddingBottom: 40
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Nunito-Bold',
        textAlign: 'center'
    },
    tableStyle: {
        borderColor: '#FFFFFF',
        borderWidth: 2
    },
    tempPhoto: {
        alignSelf: 'center',
        marginTop: 25,
        height: 170,
        width: '40%'
    },
    tinyButtonSize: {
        flex: 0.01
    },
    tinyMarginBottom: {
        marginBottom: 5
    },
    tinyMarginEnd: {
        marginEnd: 3
    },
    tinyMarginStart: {
        marginStart: 3
    },
    warningBorder: {
        borderColor: '#D13232',
        borderWidth: 1
    },
    warningIconMargins: {
        marginEnd: 5,
        marginTop: 3
    },
    warningTopMargin: {
        marginTop: 4
    },
    warningText: {
        color: '#D13232',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20
    },
    white: {
        color: '#FFFFFF'
    }
});

export default styles;