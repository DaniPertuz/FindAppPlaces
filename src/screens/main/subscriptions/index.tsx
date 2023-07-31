import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { usePlace } from '../../../hooks/usePlace';
import PremiumLevel from '../../../components/PremiumLevel';
import SubscriptionItem from './SubscriptionItem';

import styles from '../../../themes/AppTheme';

const SubscriptionScreen = () => {

    const { place } = usePlace();

    return (
        <View style={styles.mainContainer}>
            <Text numberOfLines={2} style={styles.h3}>{place?.name}</Text>
            <View style={styles.flexDirectionRowJustifySpaceBetween}>
                <PremiumLevel place={place!} />
            </View>
            <View style={styles.subscriptionOptionsContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.mediumMarginTop}>
                        <View style={styles.subscriptionItemContainer}>
                            <SubscriptionItem level={3} />
                            <TouchableOpacity
                                activeOpacity={1.0}
                                disabled={(place?.premium === 3) ? true : false}
                                style={{ ...styles.subscribeButton, backgroundColor: (place?.premium === 3) ? '#DEDEDE' : '#207CFD' }}
                            >
                                <Text style={(place?.premium === 3) ? styles.footnoteGray : styles.footnoteWhite}>{(place?.premium === 3) ? 'Suscripción actual' : 'Suscribirme'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subscriptionItemContainer}>
                            <SubscriptionItem level={2} />
                            <TouchableOpacity
                                activeOpacity={1.0}
                                disabled={(place?.premium === 2) ? true : false}
                                style={{ ...styles.subscribeButton, backgroundColor: (place?.premium === 2) ? '#DEDEDE' : '#207CFD' }}
                            >
                                <Text style={(place?.premium === 2) ? styles.footnoteGray : styles.footnoteWhite}>{(place?.premium === 2) ? 'Suscripción actual' : 'Suscribirme'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subscriptionItemContainer}>
                            <SubscriptionItem level={1} />
                            <TouchableOpacity
                                activeOpacity={1.0}
                                disabled={(place?.premium === 1) ? true : false}
                                style={{ ...styles.subscribeButton, backgroundColor: (place?.premium === 1) ? '#DEDEDE' : '#207CFD' }}
                            >
                                <Text style={(place?.premium === 1) ? styles.footnoteGray : styles.footnoteWhite}>{(place?.premium === 1) ? 'Suscripción actual' : 'Suscribirme'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default SubscriptionScreen;;