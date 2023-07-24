import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import { Dropdown } from 'react-native-element-dropdown';
import { Row, Rows, Table } from 'react-native-reanimated-table';

import { hoursData } from '../utils';

import styles from '../themes/AppTheme';
import CustomizedSchedule from './CustomizedSchedule';

interface Props {
    everyday: boolean;
    sendSchedule: (schedule: string[]) => void;
}

const BusinessDaysSchedule = ({ everyday, sendSchedule }: Props) => {

    const [customized, setCustomized] = useState(false);
    const [schedule, setSchedule] = useState<string[]>([]);
    const [tableData, setTableData] = useState<[string[], string[], string[], string[], string[], string[], string[]]>([[''], [''], [''], [''], [''], [''], ['']]);
    const [openingHour, setOpeningHour] = useState('');
    const [closingHour, setClosingHour] = useState('');

    const headers: string[] = ['Día', 'Abre', 'Cierra'];

    const setScheduleArr = () => {
        setSchedule([
            `Lunes ${openingHour} - ${closingHour}`,
            `Martes ${openingHour} - ${closingHour}`,
            `Miércoles ${openingHour} - ${closingHour}`,
            `Jueves ${openingHour} - ${closingHour}`,
            `Viernes ${openingHour} - ${closingHour}`,
            (everyday === false) ? `Sábado Cerrado` : `Sábado ${openingHour} - ${closingHour}`,
            (everyday === false) ? `Domingo Cerrado` : `Domingo ${openingHour} - ${closingHour}`
        ]);
        setTableData([
            ['Lunes', openingHour, closingHour],
            ['Martes', openingHour, closingHour],
            ['Miércoles', openingHour, closingHour],
            ['Jueves', openingHour, closingHour],
            ['Viernes', openingHour, closingHour],
            ['Sábado', (everyday === false) ? 'Cerrado' : openingHour, (everyday === false) ? 'Cerrado' : closingHour],
            ['Domingo', (everyday === false) ? 'Cerrado' : openingHour, (everyday === false) ? 'Cerrado' : closingHour],
        ]);
    };

    useEffect(() => {
        sendSchedule(schedule);
    }, [schedule]);

    return (
        <>
            <View style={{ display: (schedule.length !== 0) ? 'none' : 'flex' }}>
                <View style={{ ...styles.flexDirectionRow, ...styles.tinyMarginTop }}>
                    <CheckBox
                        style={{ justifyContent: 'center' }}
                        checkBoxColor='#081023'
                        isChecked={customized}
                        onClick={() => setCustomized(!customized)}
                    />
                    <View style={styles.tinyMarginTop}>
                        <Text style={styles.caption}>Personalizado</Text>
                    </View>
                </View>
            </View>
            <View style={styles.hoursDropdownContainer}>
                {(customized === false)
                    ?
                    <>
                        {(schedule.length === 0) &&
                            <View style={styles.flexDirectionRow}>
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
                                    onChange={(item) => { setOpeningHour(item.hour); }}
                                    value={openingHour}
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
                                    onChange={(item) => { setClosingHour(item.hour); }}
                                    value={closingHour}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                                    <TouchableOpacity
                                        activeOpacity={1.0}
                                        style={styles.alignJustifyCenter}
                                        onPress={() => { setScheduleArr(); }}
                                    >
                                        <Text style={styles.captionLink}>Guardar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        {(schedule.length !== 0) &&
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <Table borderStyle={{ borderWidth: 2, borderColor: '#081023' }}>
                                    <Row data={headers} style={{ height: 40 }} textStyle={{ ...styles.caption, ...styles.tinyMarginStart }} />
                                    <Rows data={tableData} textStyle={{ ...styles.caption, margin: 6 }} />
                                </Table>
                            </View>
                        }
                    </>
                    : <CustomizedSchedule everyday={everyday} />
                }
            </View>
        </>
    );
};

export default BusinessDaysSchedule;