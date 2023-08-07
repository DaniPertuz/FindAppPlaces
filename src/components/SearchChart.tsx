import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { IService } from '../interfaces';

import styles from '../themes/AppTheme';

interface Props {
    services: IService[];
}

const SearchChart = ({ services }: Props) => {

    const [calendarWeeks, setCalendarWeeks] = useState<{
        start: moment.Moment;
        end: moment.Moment;
    }[]>([]);

    const [monthsArray] = useState(() => {
        const months = [];
        for (let month = 0; month < 12; month++) {
            months.push({ 'month': moment().month(month).format('MMMM') });
        }
        return months;
    });

    const setDateRanges = (month: string, year: number) => {

        let aux: number = 0;

        switch (month) {
            case 'enero':
                aux = 0;
                break;
            case 'febrero':
                aux = 1;
                break;
            case 'marzo':
                aux = 2;
                break;
            case 'abril':
                aux = 3;
                break;
            case 'mayo':
                aux = 4;
                break;
            case 'junio':
                aux = 5;
                break;
            case 'julio':
                aux = 6;
                break;
            case 'agosto':
                aux = 7;
                break;
            case 'septiembre':
                aux = 8;
                break;
            case 'octubre':
                aux = 9;
                break;
            case 'noviembre':
                aux = 10;
                break;
            case 'diciembre':
                aux = 11;
                break;
        }

        const firstDayMonth = moment({ year, month: aux });

        const lastWeekMonth = firstDayMonth.clone().endOf('month').week();

        const weeks = [];

        for (let week = 1; week <= lastWeekMonth; week++) {
            const dateStartWeek = firstDayMonth.clone().week(week).startOf('week');

            if (dateStartWeek.month() === aux) {
                const dateEndWeek = firstDayMonth.clone().week(week).endOf('week');
                weeks.push({
                    start: moment(dateStartWeek.format('YYYY-MM-DD')),
                    end: moment(dateEndWeek.format('YYYY-MM-DD'))
                });
            }
        }

        setCalendarWeeks(weeks);
    };

    const setDataToDisplay = () => {
        const dates = services.map(service => service.createdAt);
        const datesMoment = dates.map(date => moment(new Date(date)));
        const intervals: any = [];
        for (const interval of calendarWeeks) {
            let counter = 0;
            for (const date of datesMoment) {
                if (moment(date).isBetween(interval.start, interval.end, null, '[]')) {
                    counter++;
                }
            }
            intervals.push(counter);
        }

        return intervals;
    };

    useEffect(() => {
      setDateRanges(moment().format('MMMM'), moment().year())
    }, []);

    return (
        <View style={styles.chartContainer}>
            <View style={styles.mediumPaddingHorizontal}>
                <View style={styles.flexDirectionRowJustifySpaceBetween}>
                    <Text style={styles.subheadline}>Búsquedas mensuales</Text>
                    <Dropdown
                        data={monthsArray}
                        labelField={'month'}
                        valueField={'month'}
                        onChange={(data) => setDateRanges(data.month, moment().year())}
                        style={styles.dropdownMonths}
                        itemTextStyle={styles.footnoteLink}
                        placeholder={moment().format('MMMM')}
                        placeholderStyle={styles.footnoteLink}
                        iconStyle={{ tintColor: '#207CFD' }}
                        selectedTextStyle={styles.footnoteLink}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
            <View style={styles.mediumMarginTop}>
                {(setDataToDisplay().every((element: number) => element === 0))
                    ?
                    <View style={{ ...styles.mediumMarginTop, ...styles.alignItemsCenter }}>
                        <View style={styles.statisticsZeroMessage}>
                            <Text style={styles.caption}>No hay búsquedas en este mes</Text>
                        </View>
                    </View>
                    :
                    <LineChart
                        bezier
                        data={{
                            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                            datasets: [{
                                data: setDataToDisplay()
                            }]
                        }}
                        width={320}
                        height={240}
                        yAxisSuffix=''
                        fromZero={true}
                        chartConfig={{
                            backgroundGradientFrom: "rgba(250, 250, 250, 0.98)",
                            backgroundGradientTo: "rgba(250, 250, 250, 0.98)",
                            color: () => '#207CFD',
                            labelColor: () => '#858585',
                        }}
                    />
                }
            </View>
        </View>
    );
};

export default SearchChart;