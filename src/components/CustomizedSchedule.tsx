import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { hoursData } from '../utils';

import styles from '../themes/AppTheme';
import { Row, Rows, Table } from 'react-native-reanimated-table';

interface Props {
    everyday: boolean;
}

const CustomizedSchedule = ({ everyday }: Props) => {

    const [schedule, setSchedule] = useState<string[]>([]);
    const [tableData, setTableData] = useState<[string[], string[], string[], string[], string[], string[], string[]]>([[''], [''], [''], [''], [''], [''], ['']]);

    const [mondayOpeningHour, setMondayOpeningHour] = useState('');
    const [tuesdayOpeningHour, setTuesdayOpeningHour] = useState('');
    const [wednesdayOpeningHour, setWednesdayOpeningHour] = useState('');
    const [thursdayOpeningHour, setThursdayOpeningHour] = useState('');
    const [fridayOpeningHour, setFridayOpeningHour] = useState('');
    const [saturdayOpeningHour, setSaturdayOpeningHour] = useState('');
    const [sundayOpeningHour, setSundayOpeningHour] = useState('');

    const [mondayClosingHour, setMondayClosingHour] = useState('');
    const [tuesdayClosingHour, setTuesdayClosingHour] = useState('');
    const [wednesdayClosingHour, setWednesdayClosingHour] = useState('');
    const [thursdayClosingHour, setThursdayClosingHour] = useState('');
    const [fridayClosingHour, setFridayClosingHour] = useState('');
    const [saturdayClosingHour, setSaturdayClosingHour] = useState('');
    const [sundayClosingHour, setSundayClosingHour] = useState('');

    const setScheduleArr = () => {
        setSchedule([
            `Lunes ${mondayOpeningHour} ${mondayClosingHour}`,
            `Martes ${tuesdayOpeningHour} ${tuesdayClosingHour}`,
            `Miércoles ${wednesdayOpeningHour} ${wednesdayClosingHour}`,
            `Jueves ${thursdayOpeningHour} ${thursdayClosingHour}`,
            `Viernes ${fridayOpeningHour} ${fridayClosingHour}`,
            `Sábado ${saturdayOpeningHour} ${saturdayClosingHour}`,
            `Domingo ${sundayOpeningHour} ${sundayClosingHour}`
        ]);
        setTableData([
            ['Lunes', mondayOpeningHour, mondayClosingHour],
            ['Martes', tuesdayOpeningHour, tuesdayClosingHour],
            ['Miércoles', wednesdayOpeningHour, wednesdayClosingHour],
            ['Jueves', thursdayOpeningHour, thursdayClosingHour],
            ['Viernes', fridayOpeningHour, fridayClosingHour],
            ['Sábado', saturdayOpeningHour, saturdayClosingHour],
            ['Domingo', sundayOpeningHour, sundayClosingHour],
        ]);
    };

    useEffect(() => {

    }, [schedule]);

    return (
        <>
            {(schedule.length === 0) &&
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.hoursDropdownContainer}>
                        <Text style={{ ...styles.caption, flex: 1 }}>
                            Lun
                        </Text>
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Abre'
                            placeholderStyle={styles.caption}
                            mode='modal'
                            containerStyle={{ marginVertical: 100 }}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.caption}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#081023' }}
                            onChange={(item) => { setMondayOpeningHour(item.hour); }}
                            value={mondayOpeningHour}
                        />
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Cierra'
                            placeholderStyle={styles.caption}
                            mode='modal'
                            containerStyle={{ marginVertical: 100 }}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.caption}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#081023' }}
                            onChange={(item) => { setMondayClosingHour(item.hour); }}
                            value={mondayClosingHour}
                        />
                    </View>
                    <View style={styles.hoursDropdownContainer}>
                        <Text style={{ ...styles.caption, flex: 1 }}>
                            Mar
                        </Text>
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Abre'
                            placeholderStyle={styles.caption}
                            mode='modal'
                            containerStyle={{ marginVertical: 100 }}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.caption}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#081023' }}
                            onChange={(item) => { setTuesdayOpeningHour(item.hour); }}
                            value={tuesdayOpeningHour}
                        />
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Cierra'
                            placeholderStyle={styles.caption}
                            mode='modal'
                            containerStyle={{ marginVertical: 100 }}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.caption}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#081023' }}
                            onChange={(item) => { setTuesdayClosingHour(item.hour); }}
                            value={tuesdayClosingHour}
                        />
                    </View>
                    <View style={styles.hoursDropdownContainer}>
                        <Text style={{ ...styles.caption, flex: 1 }}>
                            Mié
                        </Text>
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Abre'
                            placeholderStyle={styles.caption}
                            mode='modal'
                            containerStyle={{ marginVertical: 100 }}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.caption}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#081023' }}
                            onChange={(item) => { setWednesdayOpeningHour(item.hour); }}
                            value={wednesdayOpeningHour}
                        />
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Cierra'
                            placeholderStyle={styles.caption}
                            mode='modal'
                            containerStyle={{ marginVertical: 100 }}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.caption}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#081023' }}
                            onChange={(item) => { setWednesdayClosingHour(item.hour); }}
                            value={wednesdayClosingHour}
                        />
                    </View>
                    <View style={styles.hoursDropdownContainer}>
                        <Text style={{ ...styles.caption, flex: 1 }}>
                            Jue
                        </Text>
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Abre'
                            placeholderStyle={styles.caption}
                            mode='modal'
                            containerStyle={{ marginVertical: 100 }}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.caption}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#081023' }}
                            onChange={(item) => { setThursdayOpeningHour(item.hour); }}
                            value={thursdayOpeningHour}
                        />
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Cierra'
                            placeholderStyle={styles.caption}
                            mode='modal'
                            containerStyle={{ marginVertical: 100 }}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.caption}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#081023' }}
                            onChange={(item) => { setThursdayClosingHour(item.hour); }}
                            value={thursdayClosingHour}
                        />
                    </View>
                    <View style={styles.hoursDropdownContainer}>
                        <Text style={{ ...styles.caption, flex: 1 }}>
                            Vie
                        </Text>
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Abre'
                            placeholderStyle={styles.caption}
                            mode='modal'
                            containerStyle={{ marginVertical: 100 }}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.caption}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#081023' }}
                            onChange={(item) => { setFridayOpeningHour(item.hour); }}
                            value={fridayOpeningHour}
                        />
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Cierra'
                            placeholderStyle={styles.caption}
                            mode='modal'
                            containerStyle={{ marginVertical: 100 }}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.caption}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#081023' }}
                            onChange={(item) => { setFridayClosingHour(item.hour); }}
                            value={fridayClosingHour}
                        />
                    </View>
                    {(everyday === true) &&
                        <>
                            <View style={styles.hoursDropdownContainer}>
                                <Text style={{ ...styles.caption, flex: 1 }}>
                                    Sáb
                                </Text>
                                <Dropdown data={hoursData.map(({ hour }) => {
                                    return { hour };
                                })}
                                    labelField={'hour'}
                                    valueField={'hour'}
                                    placeholder='Abre'
                                    placeholderStyle={styles.caption}
                                    mode='modal'
                                    containerStyle={{ marginVertical: 100 }}
                                    showsVerticalScrollIndicator={false}
                                    selectedTextStyle={styles.caption}
                                    style={styles.hoursDropdown}
                                    iconStyle={{ tintColor: '#081023' }}
                                    onChange={(item) => { setSaturdayOpeningHour(item.hour); }}
                                    value={saturdayOpeningHour}
                                />
                                <Dropdown data={hoursData.map(({ hour }) => {
                                    return { hour };
                                })}
                                    labelField={'hour'}
                                    valueField={'hour'}
                                    placeholder='Cierra'
                                    placeholderStyle={styles.caption}
                                    mode='modal'
                                    containerStyle={{ marginVertical: 100 }}
                                    showsVerticalScrollIndicator={false}
                                    selectedTextStyle={styles.caption}
                                    style={styles.hoursDropdown}
                                    iconStyle={{ tintColor: '#081023' }}
                                    onChange={(item) => { setSaturdayClosingHour(item.hour); }}
                                    value={saturdayClosingHour}
                                />
                            </View>
                            <View style={styles.hoursDropdownContainer}>
                                <Text style={{ ...styles.caption, flex: 1 }}>
                                    Dom
                                </Text>
                                <Dropdown data={hoursData.map(({ hour }) => {
                                    return { hour };
                                })}
                                    labelField={'hour'}
                                    valueField={'hour'}
                                    placeholder='Abre'
                                    placeholderStyle={styles.caption}
                                    mode='modal'
                                    containerStyle={{ marginVertical: 100 }}
                                    showsVerticalScrollIndicator={false}
                                    selectedTextStyle={styles.caption}
                                    style={styles.hoursDropdown}
                                    iconStyle={{ tintColor: '#081023' }}
                                    onChange={(item) => { setSundayOpeningHour(item.hour); }}
                                    value={sundayOpeningHour}
                                />
                                <Dropdown data={hoursData.map(({ hour }) => {
                                    return { hour };
                                })}
                                    labelField={'hour'}
                                    valueField={'hour'}
                                    placeholder='Cierra'
                                    placeholderStyle={styles.caption}
                                    mode='modal'
                                    containerStyle={{ marginVertical: 100 }}
                                    showsVerticalScrollIndicator={false}
                                    selectedTextStyle={styles.caption}
                                    style={styles.hoursDropdown}
                                    iconStyle={{ tintColor: '#081023' }}
                                    onChange={(item) => { setSundayClosingHour(item.hour); }}
                                    value={sundayClosingHour}
                                />
                            </View>
                        </>
                    }
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.buttonTransparent}
                            onPress={setScheduleArr}
                        >
                            <Text style={styles.captionLink}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            }
            {(schedule.length !== 0) &&
                <View style={{ flex: 1, marginTop: 10 }}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#081023' }}>
                        <Row data={['Día', 'Abre', 'Cierra']} style={{ height: 40 }} textStyle={{ ...styles.caption, ...styles.tinyMarginStart }} />
                        <Rows data={tableData} textStyle={{...styles.caption, margin: 6 }} />
                    </Table>
                </View>
            }
        </>
    );
};

export default CustomizedSchedule;