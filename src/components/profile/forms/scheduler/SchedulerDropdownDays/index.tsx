import React from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { scheduleData } from '../../../../../utils';
import { styles } from './styles';

interface Props {
    days: string;
    onChange: (value: { days: string; }) => void;
}

const SchedulerDropdownDays = ({ days, onChange }: Props) => {
    return (
        <View style={styles.container}>
            <Dropdown data={scheduleData.map(({ days }) => {
                return { days };
            })}
                labelField={'days'}
                valueField={'days'}
                placeholder='Días de atención'
                placeholderStyle={styles.caption}
                showsVerticalScrollIndicator={false}
                iconStyle={styles.dropdownIconStyle}
                containerStyle={styles.dropdownContainerStyle}
                itemTextStyle={styles.caption}
                selectedTextStyle={styles.caption}
                style={styles.categoriesDropdown}
                onChange={onChange}
                value={days}
            />
        </View>
    );
};

export default SchedulerDropdownDays;