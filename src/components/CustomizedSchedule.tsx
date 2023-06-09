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
            `Lunes ${mondayOpeningHour} - ${mondayClosingHour}`,
            `Martes ${tuesdayOpeningHour} - ${tuesdayClosingHour}`,
            `Miércoles ${wednesdayOpeningHour} - ${wednesdayClosingHour}`,
            `Jueves ${thursdayOpeningHour} - ${thursdayClosingHour}`,
            `Viernes ${fridayOpeningHour} - ${fridayClosingHour}`,
            `Sábado ${saturdayOpeningHour} - ${saturdayClosingHour}`,
            `Domingo ${sundayOpeningHour} - ${sundayClosingHour}`
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
                        <Text style={{ ...styles.label, flex: 1 }}>
                            Lun
                        </Text>
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Abre'
                            placeholderStyle={styles.white}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.white}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#FFFFFF' }}
                            onChange={(item) => { setMondayOpeningHour(item.hour); }}
                            value={mondayOpeningHour}
                        />
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Cierra'
                            placeholderStyle={styles.white}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.white}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#FFFFFF' }}
                            onChange={(item) => { setMondayClosingHour(item.hour); }}
                            value={mondayClosingHour}
                        />
                    </View>
                    <View style={styles.hoursDropdownContainer}>
                        <Text style={{ ...styles.label, flex: 1 }}>
                            Mar
                        </Text>
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Abre'
                            placeholderStyle={styles.white}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.white}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#FFFFFF' }}
                            onChange={(item) => { setTuesdayOpeningHour(item.hour); }}
                            value={tuesdayOpeningHour}
                        />
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Cierra'
                            placeholderStyle={styles.white}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.white}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#FFFFFF' }}
                            onChange={(item) => { setTuesdayClosingHour(item.hour); }}
                            value={tuesdayClosingHour}
                        />
                    </View>
                    <View style={styles.hoursDropdownContainer}>
                        <Text style={{ ...styles.label, flex: 1 }}>
                            Mié
                        </Text>
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Abre'
                            placeholderStyle={styles.white}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.white}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#FFFFFF' }}
                            onChange={(item) => { setWednesdayOpeningHour(item.hour); }}
                            value={wednesdayOpeningHour}
                        />
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Cierra'
                            placeholderStyle={styles.white}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.white}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#FFFFFF' }}
                            onChange={(item) => { setWednesdayClosingHour(item.hour); }}
                            value={wednesdayClosingHour}
                        />
                    </View>
                    <View style={styles.hoursDropdownContainer}>
                        <Text style={{ ...styles.label, flex: 1 }}>
                            Jue
                        </Text>
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Abre'
                            placeholderStyle={styles.white}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.white}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#FFFFFF' }}
                            onChange={(item) => { setThursdayOpeningHour(item.hour); }}
                            value={thursdayOpeningHour}
                        />
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Cierra'
                            placeholderStyle={styles.white}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.white}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#FFFFFF' }}
                            onChange={(item) => { setThursdayClosingHour(item.hour); }}
                            value={thursdayClosingHour}
                        />
                    </View>
                    <View style={styles.hoursDropdownContainer}>
                        <Text style={{ ...styles.label, flex: 1 }}>
                            Vie
                        </Text>
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Abre'
                            placeholderStyle={styles.white}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.white}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#FFFFFF' }}
                            onChange={(item) => { setFridayOpeningHour(item.hour); }}
                            value={fridayOpeningHour}
                        />
                        <Dropdown data={hoursData.map(({ hour }) => {
                            return { hour };
                        })}
                            labelField={'hour'}
                            valueField={'hour'}
                            placeholder='Cierra'
                            placeholderStyle={styles.white}
                            showsVerticalScrollIndicator={false}
                            selectedTextStyle={styles.white}
                            style={styles.hoursDropdown}
                            iconStyle={{ tintColor: '#FFFFFF' }}
                            onChange={(item) => { setFridayClosingHour(item.hour); }}
                            value={fridayClosingHour}
                        />
                    </View>
                    {(everyday === true) &&
                        <>
                            <View style={styles.hoursDropdownContainer}>
                                <Text style={{ ...styles.label, flex: 1 }}>
                                    Sáb
                                </Text>
                                <Dropdown data={hoursData.map(({ hour }) => {
                                    return { hour };
                                })}
                                    labelField={'hour'}
                                    valueField={'hour'}
                                    placeholder='Abre'
                                    placeholderStyle={styles.white}
                                    showsVerticalScrollIndicator={false}
                                    selectedTextStyle={styles.white}
                                    style={styles.hoursDropdown}
                                    iconStyle={{ tintColor: '#FFFFFF' }}
                                    onChange={(item) => { setSaturdayOpeningHour(item.hour); }}
                                    value={saturdayOpeningHour}
                                />
                                <Dropdown data={hoursData.map(({ hour }) => {
                                    return { hour };
                                })}
                                    labelField={'hour'}
                                    valueField={'hour'}
                                    placeholder='Cierra'
                                    placeholderStyle={styles.white}
                                    showsVerticalScrollIndicator={false}
                                    selectedTextStyle={styles.white}
                                    style={styles.hoursDropdown}
                                    iconStyle={{ tintColor: '#FFFFFF' }}
                                    onChange={(item) => { setSaturdayClosingHour(item.hour); }}
                                    value={saturdayClosingHour}
                                />
                            </View>
                            <View style={styles.hoursDropdownContainer}>
                                <Text style={{ ...styles.label, flex: 1 }}>
                                    Dom
                                </Text>
                                <Dropdown data={hoursData.map(({ hour }) => {
                                    return { hour };
                                })}
                                    labelField={'hour'}
                                    valueField={'hour'}
                                    placeholder='Abre'
                                    placeholderStyle={styles.white}
                                    showsVerticalScrollIndicator={false}
                                    selectedTextStyle={styles.white}
                                    style={styles.hoursDropdown}
                                    iconStyle={{ tintColor: '#FFFFFF' }}
                                    onChange={(item) => { setSundayOpeningHour(item.hour); }}
                                    value={sundayOpeningHour}
                                />
                                <Dropdown data={hoursData.map(({ hour }) => {
                                    return { hour };
                                })}
                                    labelField={'hour'}
                                    valueField={'hour'}
                                    placeholder='Cierra'
                                    placeholderStyle={styles.white}
                                    showsVerticalScrollIndicator={false}
                                    selectedTextStyle={styles.white}
                                    style={styles.hoursDropdown}
                                    iconStyle={{ tintColor: '#FFFFFF' }}
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
                            <Text style={styles.linkWhite}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            }
            {(schedule.length !== 0) &&
                <View style={{ flex: 1 }}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#FFFFFF' }}>
                        <Row data={['Día', 'Abre', 'Cierra']} style={{ height: 40 }} textStyle={{ color: '#FFFFFF', margin: 6 }} />
                        <Rows data={tableData} textStyle={{ color: '#FFFFFF', margin: 6 }} />
                    </Table>
                </View>
            }
        </>
    );
};

export default CustomizedSchedule;