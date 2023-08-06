import React from 'react';
import { Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import styles from '../themes/AppTheme';

interface Props {
    favorites: number;
    history: number;
}

const UsersChart = ({ favorites, history }: Props) => {

    const data = [
        {
            amount: history,
            color: '#207CFD'
        },
        {
            amount: favorites,
            color: '#58D7FE'
        }
    ];

    const zeros = data.map((item) => item.amount === 0);

    return (
        <View style={styles.chartContainer}>
            <View style={styles.mediumPaddingHorizontal}>
                <Text style={styles.subheadline}>Usuarios frecuentes</Text>
            </View>
            <View style={{ ...styles.mediumMarginTop, ...styles.alignItemsCenter }}>
                {(zeros[0] === true && zeros[1] === true)
                    ?
                    <View style={styles.statisticsZeroMessage}>
                        <Text style={styles.caption}>Esperando usuarios visitantes</Text>
                    </View>
                    :
                    <>
                        <PieChart
                            data={data}
                            hasLegend={false}
                            backgroundColor={"transparent"}
                            paddingLeft={"20"}
                            absolute
                            center={[60, 0]}
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
                                    <Text style={styles.footnoteGray}>{history}</Text>
                                </View>
                                <View style={styles.mediumMarginStart}>
                                    <Text style={styles.footnoteGray}>Historial</Text>
                                </View>
                            </View>
                            <View style={styles.legendItemContainer}>
                                <View style={{ backgroundColor: '#58D7FE', ...styles.legendItemColor }} />
                                <View style={styles.mediumMarginStart}>
                                    <Text style={styles.footnoteGray}>{favorites}</Text>
                                </View>
                                <View style={styles.mediumMarginStart}>
                                    <Text style={styles.footnoteGray}>Favoritos</Text>
                                </View>
                            </View>
                        </View>
                    </>
                }
            </View>
        </View>
    );
};

export default UsersChart;