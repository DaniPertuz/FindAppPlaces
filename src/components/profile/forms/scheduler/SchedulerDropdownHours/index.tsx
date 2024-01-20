import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { hoursData } from '../../../../../utils';
import { styles } from './styles';

interface Props {
    hour: string;
    placeholder: string;
    onChange: (value: { hour: string; }) => void;
}

const SchedulerDropdownHours = ({ hour, placeholder, onChange }: Props) => {
    return (
        <Dropdown data={hoursData.map(({ hour }) => {
            return { hour };
        })}
            labelField={'hour'}
            valueField={'hour'}
            placeholder={placeholder}
            placeholderStyle={styles.caption}
            mode='modal'
            containerStyle={styles.dropdownHourMargin}
            showsVerticalScrollIndicator={false}
            selectedTextStyle={styles.caption}
            style={styles.hoursDropdown}
            iconStyle={styles.dropdownHourStyle}
            onChange={onChange}
            value={hour}
        />
    );
};

export default SchedulerDropdownHours;