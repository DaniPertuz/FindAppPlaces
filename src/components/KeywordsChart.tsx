import React from 'react';
import { Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { IService } from '../interfaces';
import { colors } from '../utils';

import styles from '../themes/AppTheme';

interface Props {
    services: IService[];
}

const KeywordsChart = ({ services }: Props) => {

    const unique = services.filter((a, i) => services.findIndex((s) => a.search === s.search) === i);

    const data: any[] = unique.map((item, index) => (
        {
            name: item.search,
            amount: services.filter(service => service.search === item.search).length,
            color: colors[index],
            legendFontColor: "#858585",
            legendFontSize: 12
        }
    )).filter((value, index, array) => array.indexOf(value) === index);

    return (
        <View style={styles.chartContainer}>
            <View style={styles.mediumPaddingHorizontal}>
                <Text style={styles.subheadline}>Palabras clave</Text>
            </View>
            {(data.length === 0)
                ?
                <View style={{ ...styles.mediumMarginTop, ...styles.alignItemsCenter }}>
                    <View style={styles.statisticsZeroMessage}>
                        <Text style={styles.caption}>Esperando búsquedas</Text>
                    </View>
                </View>
                :
                <View style={{ ...styles.mediumMarginTop, ...styles.alignItemsBaseline }}>
                    <PieChart
                        data={data}
                        hasLegend={false}
                        backgroundColor={"transparent"}
                        paddingLeft={"20"}
                        absolute
                        center={[75, 0]}
                        accessor='amount'
                        width={320}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: "rgba(250, 250, 250, 0.98)",
                            backgroundGradientTo: "rgba(250, 250, 250, 0.98)",
                            color: () => '#207CFD',
                            labelColor: () => '#858585',
                        }}
                    />
                    <View style={styles.mediumPaddingHorizontal}>
                        <View style={{ ...styles.flexDirectionRowAlignCenter, flexWrap: 'wrap' }}>
                            {data.map((d, index) => (
                                <View key={index} style={{ ...styles.flexDirectionRowAlignCenter, margin: 10 }}>
                                    <View style={{ backgroundColor: colors[index], borderRadius: 25, height: 25, width: 25 }} />
                                    <View style={styles.mediumMarginStart}>
                                        <Text style={styles.footnoteGray}>{d.amount}</Text>
                                    </View>
                                    <View style={styles.mediumMarginStart}>
                                        <Text style={styles.footnoteGray}>{d.name}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            }
        </View>
    );
};

export default KeywordsChart;