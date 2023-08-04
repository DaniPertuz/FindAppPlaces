import React from 'react';
import { Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../themes/AppTheme';

const SearchChart = () => {
    return (
        <View style={styles.chartContainer}>
            <View style={styles.mediumPaddingHorizontal}>
                <Text style={styles.subheadline}>Búsquedas mensuales</Text>
            </View>
            <View style={styles.mediumMarginTop}>
                <LineChart
                    bezier
                    data={{
                        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                        datasets: [{
                            data: [2, 3, 6, 1]
                        }]
                    }}
                    width={320}
                    height={220}
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundGradientFrom: "rgba(250, 250, 250, 0.98)",
                        backgroundGradientTo: "rgba(250, 250, 250, 0.98)",
                        color: () => '#207CFD',
                        labelColor: () => '#858585',
                    }}
                />
            </View>
        </View>
    );
};

export default SearchChart;