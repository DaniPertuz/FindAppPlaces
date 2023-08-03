import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import UpdateProfileInputs from '../../../components/UpdateProfileInputs';
import { useIcons } from '../../../hooks';
import { RootStackParams } from '../../../navigation/MainNavigator';

import styles from '../../../themes/AppTheme';

interface Props extends StackScreenProps<RootStackParams, 'UpdateProfileScreen'> { };

const UpdateProfileScreen = ({ route, navigation }: Props) => {

    const { place } = route.params;

    return (
        <View style={styles.mainContainer}>
            <View style={{ ...styles.flexDirectionRow, ...styles.smallMediumMarginBottom }}>
                <View style={styles.flexOneAlignJustifyCenter}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => navigation.goBack()}
                    >
                        {useIcons('Back', 20, 20)}
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 200, ...styles.alignJustifyCenter }}>
                    <Text style={styles.captionTwoBlack}>Editar Perfil</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 15 }}>
                <UpdateProfileInputs place={place} />
            </View>
        </View>
    );
};

export default UpdateProfileScreen;