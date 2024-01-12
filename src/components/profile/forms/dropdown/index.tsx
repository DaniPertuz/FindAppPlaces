import React from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { categories } from '../../../../utils';
import { styles } from './styles';

interface Props {
    field: string;
    handlePlaceCategory: (value: string) => void;
}

const DropdownCategory = ({ field, handlePlaceCategory }: Props) => {
    return (
        <View style={styles.inputFieldContainerWhite}>
            <Dropdown
                data={categories}
                labelField={'category'}
                valueField={'category'}
                placeholder='Categoría'
                placeholderStyle={styles.caption}
                mode='modal'
                showsVerticalScrollIndicator={false}
                containerStyle={styles.categoriesDropdownContainerStyle}
                itemTextStyle={styles.caption}
                selectedTextStyle={styles.caption}
                style={styles.categoriesDropdown}
                onChange={(item) => { handlePlaceCategory(item.category); }}
                value={field}
            />
        </View>
    );
};

export default DropdownCategory;