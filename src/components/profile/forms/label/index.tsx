import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

interface Props {
    value: string;
}

const Label = ({ value }: Props) => <Text style={styles.captionTwoBlack}>{value}</Text>;

export default Label;