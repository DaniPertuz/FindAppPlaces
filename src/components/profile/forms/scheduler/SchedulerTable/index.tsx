import React from 'react';
import { View } from 'react-native';
import { Row, Rows, Table } from 'react-native-reanimated-table';
import { headers } from '../../../../../utils';
import { styles } from './styles';

interface Props {
    customHeaders?: string[];
    displaySchedule: string[][];
}

const SchedulerTable = ({ customHeaders, displaySchedule }: Props) => {
    return (
        <View style={styles.container}>
            <Table borderStyle={styles.borderStyle}>
                <Row data={(customHeaders || headers)} style={styles.headersHeight} textStyle={{ ...styles.caption, ...styles.tinyMarginStart }} />
                <Rows data={displaySchedule} textStyle={{ ...styles.caption, margin: 6 }} />
            </Table>
        </View>
    );
};

export default SchedulerTable;