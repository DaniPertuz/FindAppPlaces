import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from '../themes/AppTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    items: string[];
    removeCategory: (i: number) => void;
}

const Pills = ({ items, removeCategory }: Props) => {
    return (
        <ScrollView
            contentContainerStyle={{ flexWrap: 'wrap', width: '100%' }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {items.map((item, index) => (
                <View key={index} style={styles.pillsContainer}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => removeCategory(index)}
                    >
                        <Text style={{ color: '#000000' }}>{item}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

export default Pills;