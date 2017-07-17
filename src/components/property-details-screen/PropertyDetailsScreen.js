'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    Text
} from 'react-native';

import styles from './PropertyDetailsScreenStyles';

import I18n from 'react-native-i18n';

class PropertyDetailsScreen extends Component {

    static navigationOptions = {
        title: I18n.t('propertyDetailsScreenTitle'),
    };

    render() {

        //var property = this.props.property;
        var property = this.props.navigation.state.params.property;
        console.log(property);
        var stats = property.bedroom_number + ' ' + I18n.t('bedrooms') + ' ' + property.property_type;
        if (property.bathroom_number) {
            stats += ', ' + property.bathroom_number + ' ' + (property.bathroom_number > 1
                    ? I18n.t('bathrooms') : I18n.t('bathroom'));
        }

        var price = property.price_formatted.split(' ')[0];

        return (
            <View style={styles.container}>
                <Image style={styles.image}
                       source={{uri: property.img_url}} />
                <View style={styles.heading}>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.title}>{property.title}</Text>
                    <View style={styles.separator}/>
                </View>
                <Text style={styles.description}>{stats}</Text>
                <Text style={styles.description}>{property.summary}</Text>
            </View>
        );
    }
}

module.exports = PropertyDetailsScreen;

