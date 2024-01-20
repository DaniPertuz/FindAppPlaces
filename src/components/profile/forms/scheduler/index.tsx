import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import BusinessDaysSchedule from './BusinessDaysSchedule';
import CustomizedSchedule from './CustomizedSchedule';
import SchedulerDropdownDays from './SchedulerDropdownDays';
import SchedulerTable from './SchedulerTable';
import SchedulerEditButton from './ui/SchedulerEditButton';

import { IPlace } from '../../../../interfaces';
import { allowedDays } from '../../../../utils';

import { styles } from './styles';

interface Props {
    place: IPlace;
    handleSchedule: (schedule: string[]) => void;
}

const Scheduler = ({ place, handleSchedule }: Props) => {
    const isScheduleAvailable = place.schedule.length !== 0;
    const [days, setDays] = useState('');
    const [editSchedule, setEditSchedule] = useState(isScheduleAvailable);
    const [isScheduleUpdated, setIsScheduleUpdated] = useState(false);
    const displaySchedule = place.schedule.map(schedule => schedule.split(' ').map(s => s.replace('AM', ' AM').replace('PM', ' PM')));

    const handleEditSchedule = (edited: boolean) => {
        setIsScheduleUpdated(edited);
    };

    useEffect(() => {
        setDays('');
    }, [isScheduleAvailable]);

    const handleEditPress = () => {
        setEditSchedule(!editSchedule);
        handleEditSchedule(false);
    };

    return (
        <>
            {(editSchedule)
                ?
                <View>
                    <SchedulerTable displaySchedule={displaySchedule} />
                    {/* <SchedulerEditButton onPress={() => setDays('')} /> */}
                    <SchedulerEditButton onPress={handleEditPress} />
                </View>
                :
                <>
                    {!isScheduleUpdated && <SchedulerDropdownDays days={days} onChange={({ days }) => { setDays(days); }} />}
                    <View style={(days !== '') && styles.flexDirectionRowJustifySpaceBetween}>
                        {allowedDays.includes(days) && (
                            <View style={styles.flexDirectionRowJustifySpaceBetween}>
                                {(days === 'Lunes a Viernes' || days === 'Lunes a Domingo') && (
                                    <BusinessDaysSchedule everyday={days === 'Lunes a Domingo'} sendSchedule={handleSchedule} handleScheduleUpdated={handleEditSchedule} />
                                )}
                                {days === 'Personalizado' && (
                                    <CustomizedSchedule everyday={true} sendSchedule={handleSchedule} handleScheduleUpdated={handleEditSchedule} />
                                )}
                            </View>
                        )}
                    </View>
                </>
            }
        </>
    );
};

export default Scheduler;