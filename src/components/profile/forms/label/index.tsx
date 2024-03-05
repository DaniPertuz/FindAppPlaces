import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

interface Props {
    value: string;
}

const FormLabel = ({ value }: Props) => <Text style={styles.captionTwoBlack}>{value}</Text>;

export default FormLabel;