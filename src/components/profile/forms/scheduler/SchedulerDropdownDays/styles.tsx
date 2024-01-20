import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    categoriesDropdown: {
        flex: 1,
        height: 45
    },
    caption: {
        color: '#101F11',
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: -0.26,
        lineHeight: 15
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 1)',
        borderColor: '#081023',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        height: 60,
        marginTop: 5,
        paddingHorizontal: 16
    },
    dropdownContainerStyle: {
        alignSelf: 'center',
        width: 310
    },
    dropdownIconStyle: {
        tintColor: '#858585'
    }
});