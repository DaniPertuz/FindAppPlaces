import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import CustomizedSchedule from '../CustomizedSchedule';
import SchedulerTable from '../SchedulerTable';
import SaveScheduleButton from '../ui/SaveScheduleButton';
import SchedulerCheckBox from '../ui/SchedulerCheckBox';
import EditButton from '../../../../ui/EditButton';
import SchedulerDropdownHours from '../SchedulerDropdownHours';
import { daysOfWeekSpanish, formatHour } from '../../../../../utils';

import { styles } from './styles';

interface Props {
    everyday: boolean;
    sendSchedule: (schedule: string[]) => void;
    handleScheduleUpdated: (value: boolean) => void;
}

const BusinessDaysSchedule = ({ everyday, sendSchedule, handleScheduleUpdated }: Props) => {

    const [customized, setCustomized] = useState(false);
    const [schedule, setSchedule] = useState<string[]>([]);
    const [scheduleUpdated, setScheduleUpdated] = useState<boolean>(false);
    const [tableData, setTableData] = useState<[string, string, string][]>(Array(7).fill(['', '', '']));
    const [openingHour, setOpeningHour] = useState('');
    const [closingHour, setClosingHour] = useState('');

    const setScheduleArr = () => {
        setScheduleUpdated(true);

        const generateScheduleEntry = (day: string) => {
            const isOpen = everyday || (day !== 'Sábado' && day !== 'Domingo');
            const formattedOpeningHour = (isOpen ? openingHour : '0:00');
            const formattedClosingHour = (isOpen ? closingHour : '0:00');
            return isOpen ? `${day} ${formattedOpeningHour} ${formattedClosingHour}` : `${day} Cerrado`;
        };

        const generateTableEntry = (day: string) => {
            const isOpen = everyday || (day !== 'Sábado' && day !== 'Domingo');
            const formattedOpeningHour = formatHour(isOpen ? openingHour : 'Cerrado');
            const formattedClosingHour = formatHour(isOpen ? closingHour : 'Cerrado');
            return [day, formattedOpeningHour, formattedClosingHour] as [string, string, string];
        };

        const newSchedule = daysOfWeekSpanish.map(generateScheduleEntry);
        setSchedule(newSchedule);

        const newTableData = daysOfWeekSpanish.map(generateTableEntry);
        setTableData(newTableData);
    };

    const onEdit = () => {
        setSchedule([]);
        setScheduleUpdated(false);
    };

    const handleUpdateSchedule = (value: boolean) => {
        setScheduleUpdated(value);
        handleScheduleUpdated(value);
    };

    useEffect(() => {
        sendSchedule(schedule);
        handleScheduleUpdated(schedule.length !== 0);
    }, [schedule]);

    return (
        <View style={styles.fullWidth}>
            <View style={{ display: (scheduleUpdated || schedule.length !== 0) ? 'none' : 'flex' }}>
                <SchedulerCheckBox customized={customized} onClick={() => setCustomized(!customized)} />
            </View>
            <View style={styles.hoursDropdownContainer}>
                {(!customized)
                    ?
                    <>
                        {(schedule.length === 0) &&
                            <View style={styles.flexDirectionRow}>
                                <SchedulerDropdownHours hour={openingHour} placeholder='Abre' onChange={(item) => { setOpeningHour(item.hour); }} />
                                <SchedulerDropdownHours hour={closingHour} placeholder='Cierra' onChange={(item) => { setClosingHour(item.hour); }} />
                                <SaveScheduleButton onPress={setScheduleArr} />
                            </View>
                        }
                        {(schedule.length !== 0) &&
                            <ScrollView>
                                <SchedulerTable displaySchedule={tableData} />
                                <EditButton onPress={onEdit} />
                            </ScrollView>
                        }
                    </>
                    :
                    <View style={styles.fullWidth}>
                        <CustomizedSchedule everyday={everyday} sendSchedule={sendSchedule} handleScheduleUpdated={handleUpdateSchedule} />
                    </View>
                }
            </View>
        </View>
    );
};

export default BusinessDaysSchedule;