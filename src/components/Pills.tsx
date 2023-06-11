import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from '../themes/AppTheme';

interface Props {
    items: string[];
}

const Pills = ({ items }: Props) => {
    return (
        <ScrollView horizontal contentContainerStyle={{ flexWrap: 'wrap', width: '100%' }} showsHorizontalScrollIndicator={false}>
            {items.map((item, index) => (
                <View key={index} style={styles.pillsContainer}>
                    <Text style={{ color: '#000000' }}>{item}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

export default Pills;