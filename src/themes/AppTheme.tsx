import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    addImagesButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        borderColor: '#858585',
        borderRadius: 100,
        borderWidth: 1,
        marginHorizontal: 15,
        marginVertical: 40,
        padding: 10
    },
    addImagesNoImagesButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        borderColor: '#858585',
        borderRadius: 100,
        borderWidth: 1,
        padding: 10
    },
    alignItemsBaseline: {
        alignItems: 'baseline'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    alignJustifyCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButtonMargins: {
        marginBottom: 22,
        marginEnd: 2,
        marginTop: 2
    },
    backButtonText: {
        color: '#207CFD',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: -0.24,
        lineHeight: 20
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
    bodySmallBlack: {
        color: '#081023',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.28,
        lineHeight: 20
    },
    bodySmallGray: {
        color: '#858585',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.28,
        lineHeight: 20
    },
    bodySmallWhite: {
        color: '#FAFAFA',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: -0.28,
        lineHeight: 20
    },
    bodyText: {
        color: '#1F273A',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: -0.32,
        lineHeight: 22
    },
    bottomTabNavigatorItem: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    bottomTabNavigatorItemFont: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: -0.28,
        lineHeight: 20
    },
    bottomTabNavigatorLabStyle: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: -0.28
    },
    bottomTabNavigatorMinHeight: {
        minHeight: 62
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#207CFD',
        borderRadius: 8,
        padding: 10,
        width: '100%'
    },
    buttonAddProduct: {
        alignItems: 'center',
        backgroundColor: '#207CFD',
        borderRadius: 8,
        padding: 10
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 50
    },
    buttonContainerMarginTop: {
        marginTop: 30
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
    buttonAddProductText: {
        color: 'rgba(250, 250, 250, 0.98)',
        fontSize: 12,
        fontWeight: '700',
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
    captionWarning: {
        color: '#D13232',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 15,
        letterSpacing: -0.26
    },
    captionTwo: {
        color: '#858585',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: -0.24
    },
    captionTwoBlack: {
        color: '#1F273A',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: -0.24
    },
    categoriesDropdown: {
        flex: 1,
        height: 45
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
    editProfileButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        marginStart: 6,
        padding: 5
    },
    editProfileGalleryButton: {
        borderColor: 'rgba(133, 133, 133, 0.25)',
        borderRadius: 30,
        borderWidth: 1,
        padding: 10
    },
    editProfileIconMargins: {
        marginEnd: 6,
        marginTop: 2
    },
    editProfileModal: {
        backgroundColor: 'rgba(250, 250, 250, 0.98)',
        height: '45%',
        top: '180%',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    editProfileModalBackButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    editProfilePhotoButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        marginStart: -40,
        marginTop: 65,
        maxHeight: 40,
        padding: 5
    },
    extraSmallMarginTop: {
        marginTop: 8
    },
    flexDirectionRow: {
        flexDirection: 'row'
    },
    flexDirectionRowAlignCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    flexDirectionRowJustifyAround: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    flexDirectionRowJustifyCenter: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    flexDirectionRowJustifyFlexEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    flexDirectionRowJustifySpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flexDirectionRowTinyMarginTop: {
        flexDirection: 'row',
        marginTop: 5
    },
    flexOne: {
        flex: 1
    },
    flexOneAlignJustifyCenter: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    flexThree: {
        flex: 3
    },
    flexTwo: {
        flex: 2
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
    footnoteGray: {
        color: '#858585',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: -0.24
    },
    footnoteLink: {
        color: '#207CFD',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: -0.24
    },
    footnoteWhite: {
        color: '#FAFAFA',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: -0.24
    },
    h3: {
        color: '#081023',
        fontSize: 24,
        fontWeight: '500',
        letterSpacing: -0.48,
        lineHeight: 28
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
        borderColor: '#081023',
        borderRadius: 8,
        borderWidth: 1,
        flex: 2,
        height: 25,
        marginHorizontal: 5,
        marginTop: 25,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    imageFromGallery: {
        borderRadius: 8,
        height: 100,
        marginEnd: 15,
        width: 100
    },
    inputField: {
        color: '#081023',
        fontSize: 12,
        letterSpacing: -0.24,
        lineHeight: 16,
        padding: 16
    },
    inputFieldBlack: {
        color: '#1F273A',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 12,
        letterSpacing: -0.24,
        marginStart: 16,
        marginVertical: 12,
        width: '90%'
    },
    inputFieldBlackDescription: {
        color: '#1F273A',
        fontSize: 12,
        fontWeight: '500',
        height: 82,
        lineHeight: 16,
        letterSpacing: -0.24
    },
    inputFieldGray: {
        color: '#9A9A9A',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: -0.24,
        paddingHorizontal: 16
    },
    inputFieldContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(104, 110, 222, 0.1)',
        borderColor: '#2F2F2F',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 5,
        paddingHorizontal: 16
    },
    inputFieldDescriptionContainerWhite: {
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 1)',
        borderColor: '#081023',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 5,
        paddingHorizontal: 16,
        paddingVertical: 10
    },
    inputFieldContainerGray: {
        alignItems: 'center',
        backgroundColor: '#DEDEDE',
        borderColor: '#081023',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 5,
        padding: 16
    },
    inputFieldContainerWhite: {
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 1)',
        borderColor: '#081023',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 5,
        paddingHorizontal: 16
    },
    inputFieldContainerWhiteOther: {
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 1)',
        borderColor: '#081023',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 16
    },
    itemIcon: {
        borderRadius: 8,
        height: 42,
        width: 42
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    justifyContentFlexStart: {
        justifyContent: 'flex-start'
    },
    largeItem: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginHorizontal: 8,
        minWidth: 90,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    largeMarginTop: {
        marginTop: 32
    },
    linearGradient: {
        alignItems: 'center',
        borderRadius: 999,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 3
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
    mainContainer: {
        marginHorizontal: 20,
        marginTop: 50
    },
    mainLogo: {
        height: 107,
        marginVertical: 40,
        width: 239
    },
    mediumMarginBottom: {
        marginBottom: 20
    },
    mediumMarginTop: {
        marginTop: 20
    },
    mediumMarginStart: {
        marginStart: 10
    },
    mediumPaddingVertical: {
        paddingVertical: 25
    },
    mediumTitle: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    minusButton: {
        alignSelf: 'flex-end',
        marginBottom: -10,
        marginEnd: 5,
        zIndex: 999
    },
    modalBackButtonMargins: {
        marginEnd: 10,
        marginTop: 10
    },
    newPasswordInputTextSize: {
        flex: 2
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
    placePhoto: {
        borderRadius: 32,
        height: 62,
        width: 62
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
    productDetailsButton: {
        backgroundColor: '#207CFD',
        borderRadius: 4,
        justifyContent: 'center',
        padding: 5
    },
    productDetailsButtonContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    productDetailsNameContainer: {
        flex: 3,
        justifyContent: 'center',
        paddingEnd: 10
    },
    productItemContainer: {
        backgroundColor: '#FAFAFA',
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    rateItemContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 24,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    registerFormContainer: {
        paddingHorizontal: 30,
        marginTop: 10
    },
    reviewsModal: {
        backgroundColor: 'rgba(250, 250, 250, 1)',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        height: '95%',
        top: '13%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
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
    smallMediumMarginStart: {
        marginStart: 12
    },
    smallMediumMarginTop: {
        marginTop: 12
    },
    smallMediumMarginBottom: {
        marginBottom: 10
    },
    subheadline: {
        color: '#081023',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18
    },
    subscribeButton: {
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#207CFD',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 12,
        paddingHorizontal: 14,
        paddingVertical: 10
    },
    subscriptionItemContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 20,
        padding: 15
    },
    subscriptionOptionsContainer: {
        marginTop: 20,
        paddingBottom: 120
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
        flex: 0.2
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
    tinyMarginTop: {
        marginTop: 6
    },
    tinyMarginVertical: {
        marginVertical: 3
    },
    titleMarginTopContainer: {
        marginTop: 36
    },
    warningBorder: {
        borderColor: '#D13232',
        borderWidth: 1
    },
    warningButton: {
        alignItems: 'center',
        backgroundColor: '#D13232',
        borderRadius: 8,
        padding: 10
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