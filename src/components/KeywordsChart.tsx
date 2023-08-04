import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { colors } from '../utils';
import styles from '../themes/AppTheme';

const KeywordsChart = () => {

    const data = [
        {
            name: 'Comida Rápida',
            amount: 10,
            color: colors[0],
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },
        {
            name: 'Pizza',
            amount: 4,
            color: colors[1],
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },
        {
            name: 'Restaurante',
            amount: 6,
            color: colors[2],
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },
        {
            name: 'Restaurante',
            amount: 6,
            color: colors[3],
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        }
    ];

    return (
        <View style={styles.chartContainer}>
            <View style={styles.mediumPaddingHorizontal}>
                <Text style={styles.subheadline}>Usuarios frecuentes</Text>
            </View>
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
        </View>
    );
};

export default KeywordsChart;