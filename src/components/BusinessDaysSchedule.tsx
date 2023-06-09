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
            <View style={{ display: (schedule.length !== 0) ? 'none' : 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-start' }}>
                <CheckBox
                    style={{ justifyContent: 'center', marginTop: 25, marginEnd: 5 }}
                    checkBoxColor='#FFFFFF'
                    isChecked={customized}
                    onClick={() => setCustomized(!customized)}
                />
                <Text style={styles.label}>Personalizado</Text>
            </View>
            <View style={styles.hoursDropdownContainer}>
                {(customized === false)
                    ?
                    <>
                        {(schedule.length === 0) &&
                            <View style={{ flexDirection: 'row' }}>
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
                                    onChange={(item) => { setOpeningHour(item.hour); }}
                                    value={openingHour}
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
                                    onChange={(item) => { setClosingHour(item.hour); }}
                                    value={closingHour}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.buttonTransparent}
                                        onPress={() => { setScheduleArr(); }}
                                    >
                                        <Text style={styles.linkWhite}>Guardar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        {(schedule.length !== 0) &&
                            <View style={{ flex: 1 }}>
                                <Table borderStyle={styles.tableStyle}>
                                    <Row data={headers} style={styles.rowHeaderStyle} textStyle={styles.rowTextStyle} />
                                    <Rows data={tableData} textStyle={styles.rowTextStyle} />
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