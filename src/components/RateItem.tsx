import React from 'react';
import { Image, Text, View } from 'react-native';

import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { useIcons } from '../hooks';
import { IRate } from '../interfaces';
import styles from '../themes/AppTheme';

interface Props {
    item: IRate;
}

const RateItem = ({ item }: Props) => {
    return (
        <View style={styles.rateItemContainer}>
            <View style={styles.flexDirectionRowJustifySpaceBetween}>
                <View style={styles.flexDirectionRow}>
                    <View>
                        <Image source={(item.user?.photo === '' ? require('../assets/fa_blue.png') : { uri: item.user?.photo })} style={styles.itemIcon} />
                    </View>
                    <View style={{ marginStart: 12 }}>
                        <Text numberOfLines={1} style={styles.subheadline}>{item.user?.name}</Text>
                        <View style={{ ...styles.flexDirectionRow, marginVertical: 6 }}>
                            {Array.from({ length: 5 }, (_, index) => (
                                <React.Fragment key={index}>
                                    {index < item.rate
                                        ? useIcons('Star', 20, 20)
                                        : useIcons('StarOut', 20, 20)
                                    }
                                </React.Fragment>
                            ))}
                            <View style={{ marginStart: 6, ...styles.justifyContentCenter }}>
                                <Text style={styles.caption}>{item.rate.toFixed(1)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.captionTwo}>{moment(item.createdAt, "YYYYMMDD").fromNow()}</Text>
                </View>
            </View>
            <View style={{ marginStart: 45, paddingHorizontal: 10 }}>
                <Text style={styles.footnote}>{item.comments}</Text>
            </View>
        </View>
    );
};

export default RateItem;