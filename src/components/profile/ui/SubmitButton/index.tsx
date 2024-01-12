import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

interface Props {
    loading: boolean;
    value: string;
    onPress: () => void;
}

const SubmitButton = ({ loading, value, onPress }: Props) => {
    return (
        <View style={styles.buttonContainerMarginTop}>
            <TouchableOpacity activeOpacity={1.0} style={styles.button} disabled={loading} onPress={onPress}>
                <Text style={styles.buttonText}>
                    {loading ? <ActivityIndicator size={22} color='#FFFFFF' /> : value}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SubmitButton;