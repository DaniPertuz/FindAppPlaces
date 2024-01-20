import React from 'react';
import { Text, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import { styles } from './styles';

interface Props {
    customized: boolean;
    onClick: () => void;
}

const SchedulerCheckBox = ({ customized, onClick }: Props) => {
    return (
        <View style={{ ...styles.flexDirectionRow, ...styles.tinyMarginTop }}>
            <CheckBox style={styles.justifyContentCenter} checkBoxColor='#081023' isChecked={customized} onClick={onClick} />
            <View style={styles.tinyMarginTop}>
                <Text style={styles.caption}>Personalizado</Text>
            </View>
        </View>
    );
};

export default SchedulerCheckBox;