import React from 'react';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import UpdateProfileInputs from '../../../components/profile/update-profile/UpdateProfileInputs';
import { RootStackParams } from '../../../navigation/MainNavigator';

import BackButton from '../../../components/ui/BackButton';
import HeaderTitle from '../../../components/profile/ui/HeaderTitle';

import { styles } from './styles';

interface Props extends StackScreenProps<RootStackParams, 'UpdateProfileScreen'> { };

const UpdateProfileScreen = ({ route, navigation }: Props) => {

    const { place } = route.params;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.flexOneAlignJustifyCenter}>
                    <BackButton onPress={() => navigation.goBack()} />
                </View>
                <View style={styles.headerAlignment}>
                    <HeaderTitle />
                </View>
            </View>
            <View style={styles.containerMargins}>
                <UpdateProfileInputs place={place} />
            </View>
        </View>
    );
};

export default UpdateProfileScreen;