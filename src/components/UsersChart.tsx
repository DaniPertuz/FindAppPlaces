import React from 'react';
import { Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import styles from '../themes/AppTheme';

const UsersChart = () => {

    const data = [
        {
            amount: 3,
            color: '#207CFD'
        },
        {
            amount: 5,
            color: '#58D7FE'
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
                <View style={styles.flexDirectionRowAlignSelfCenter}>
                    <View style={styles.legendItemContainer}>
                        <View style={{ backgroundColor: '#207CFD', ...styles.legendItemColor }} />
                        <View style={styles.mediumMarginStart}>
                            <Text style={styles.footnoteGray}>3</Text>
                        </View>
                        <View style={styles.mediumMarginStart}>
                            <Text style={styles.footnoteGray}>Historial</Text>
                        </View>
                    </View>
                    <View style={styles.legendItemContainer}>
                        <View style={{ backgroundColor: '#58D7FE', ...styles.legendItemColor }} />
                        <View style={styles.mediumMarginStart}>
                            <Text style={styles.footnoteGray}>5</Text>
                        </View>
                        <View style={styles.mediumMarginStart}>
                            <Text style={styles.footnoteGray}>Favoritos</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default UsersChart;