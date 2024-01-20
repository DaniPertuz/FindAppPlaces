import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import SchedulerDropdownHours from '../SchedulerDropdownHours';
import SchedulerTable from '../SchedulerTable';
import SaveScheduleTransparentButton from '../ui/SaveScheduleTransparentButton';
import SchedulerEditButton from '../ui/SchedulerEditButton';
import { daysOfWeekEnglish, daysOfWeekSpanish } from '../../../../../utils';

import { styles } from './styles';

interface Props {
    everyday: boolean;
    sendSchedule: (schedule: string[]) => void;
    handleScheduleUpdated: (value: boolean) => void;
}

const CustomizedSchedule = ({ everyday, sendSchedule, handleScheduleUpdated }: Props) => {
    const [schedule, setSchedule] = useState<string[]>([]);
    const [tableData, setTableData] = useState<[string, string, string][]>(Array(7).fill(['', '', '']));
    const [openingHours, setOpeningHours] = useState<{ [key: string]: string; }>({});
    const [closingHours, setClosingHours] = useState<{ [key: string]: string; }>({});

    const translateDayToSpanish = (day: string): string => {
        const index = daysOfWeekEnglish.indexOf(day);
        return daysOfWeekSpanish[index] || day;
    };

    const setOpeningAndClosingHour = (day: string, openingHour: string, closingHour: string) => {
        setOpeningHours((prev) => ({ ...prev, [day]: openingHour }));
        setClosingHours((prev) => ({ ...prev, [day]: closingHour }));
        updateTableData();
    };

    const updateTableData = () => {
        const newTableData: [string, string, string][] = daysOfWeekEnglish.map((day) => [
            translateDayToSpanish(day),
            openingHours[day] || '0:00',
            closingHours[day] || '0:00'
        ]);
        setTableData(newTableData);
    };

    const setScheduleArr = () => {
        const newSchedule = daysOfWeekEnglish.map(
            (day) => `${translateDayToSpanish(day)} ${openingHours[day]} ${closingHours[day]}`
        );
        setSchedule(newSchedule);
    };

    useEffect(() => {
        updateTableData();
        sendSchedule(schedule);
        handleScheduleUpdated(schedule.length !== 0);
    }, [openingHours, closingHours, schedule]);

    return (
        <>
            {schedule.length === 0 && (
                <ScrollView showsVerticalScrollIndicator={false} style={styles.fullWidth}>
                    {daysOfWeekEnglish.slice(0, -2).map((day) => (
                        <View key={day} style={styles.hoursDropdownContainer}>
                            <Text style={styles.textStyle}>{translateDayToSpanish(day).slice(0, 3)}</Text>
                            <SchedulerDropdownHours
                                hour={openingHours[day]}
                                placeholder='Abre'
                                onChange={(item) => setOpeningAndClosingHour(day, item.hour, closingHours[day] || '')}
                            />
                            <SchedulerDropdownHours
                                hour={closingHours[day]}
                                placeholder='Cierra'
                                onChange={(item) => setOpeningAndClosingHour(day, openingHours[day] || '', item.hour)}
                            />
                        </View>
                    ))}
                    {everyday && (
                        <>
                            <View style={styles.hoursDropdownContainer}>
                                <Text style={styles.textStyle}>Sáb</Text>
                                <SchedulerDropdownHours
                                    hour={openingHours['Saturday']}
                                    placeholder='Abre'
                                    onChange={(item) => setOpeningAndClosingHour('Saturday', item.hour, closingHours['Saturday'] || '')}
                                />
                                <SchedulerDropdownHours
                                    hour={closingHours['Saturday']}
                                    placeholder='Cierra'
                                    onChange={(item) => setOpeningAndClosingHour('Saturday', openingHours['Saturday'] || '', item.hour)}
                                />
                            </View>
                            <View style={styles.hoursDropdownContainer}>
                                <Text style={styles.textStyle}>Dom</Text>
                                <SchedulerDropdownHours
                                    hour={openingHours['Sunday']}
                                    placeholder='Abre'
                                    onChange={(item) => setOpeningAndClosingHour('Sunday', item.hour, closingHours['Sunday'] || '')}
                                />
                                <SchedulerDropdownHours
                                    hour={closingHours['Sunday']}
                                    placeholder='Cierra'
                                    onChange={(item) => setOpeningAndClosingHour('Sunday', openingHours['Sunday'] || '', item.hour)}
                                />
                            </View>
                        </>
                    )}
                    <SaveScheduleTransparentButton onPress={setScheduleArr} />
                </ScrollView>
            )}
            {(schedule.length !== 0) && (
                <ScrollView style={styles.fullWidth}>
                    <SchedulerTable displaySchedule={tableData} customHeaders={['Día', 'Abre', 'Cierra']} />
                    <SchedulerEditButton onPress={() => setSchedule([])} />
                </ScrollView>
            )}
        </>
    );
};

export default CustomizedSchedule;