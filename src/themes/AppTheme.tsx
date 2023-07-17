import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bigTitle: {
        color: "#FFFFFF",
        fontSize: 60,
        textAlign: "center"
    },
    button: {
        borderColor: "#FFFFFF",
        borderRadius: 100,
        borderWidth: 2,
        paddingHorizontal: 15,
        paddingVertical: 5
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
        color: "#FFFFFF",
        fontSize: 18
    },
    decisionContainer: {
        flex: 1,
        marginHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    formContainer: {
        flex: 2,
        paddingHorizontal: 30,
        marginTop: 10
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
        color: "#FFFFFF",
        fontSize: 20
    },
    inputFieldIOS: {
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    label: {
        color: "#FFFFFF",
        fontWeight: "bold",
        marginTop: 25
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
    loginFormContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 40
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
    white: {
        color: '#FFFFFF'
    }
});

export default styles;