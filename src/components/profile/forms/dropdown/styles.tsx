import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    caption: {
        color: '#101F11',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 15,
        letterSpacing: -0.26
    },
    categoriesDropdown: {
        flex: 1,
        height: 45
    },
    categoriesDropdownContainerStyle: {
        alignSelf: 'center',
        marginVertical: 100,
        width: 310
    },
    inputFieldContainerWhite: {
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 1)',
        borderColor: '#081023',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row',
        height: 60,
        marginTop: 5,
        paddingHorizontal: 16
    }
});