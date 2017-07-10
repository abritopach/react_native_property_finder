'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicator,
    Image
} from 'react-native';

class SearchScreen extends Component {
    static navigationOptions = {
        title: 'Property Finder',
    };

    /*
     Each React component has its own state object, which is used as a key-value store. Before a component is rendered
     you must set the initial state.
     */
    constructor(props) {
        super(props);
        // Component has a state variable, with searchString set to an initial value of london.
        this.state = {
            searchString: 'london',
            isLoading: false
        };
    }

    /*
    Takes the value from the native browser event’s text property and uses it to update the component’s state.
     */
    onSearchTextChanged(event) {
        console.log('onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text });
        console.log(this.state.searchString);
    }

    _executeQuery(query) {
        console.log(query);
        this.setState({ isLoading: true });
    }

    onSearchPressed() {
        var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
    }

    render() {
        console.log('SearchPage.render');

        var spinner = this.state.isLoading ?
            ( <ActivityIndicator
                size='large'/> ) :
            ( <View/>);

        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Search for houses to buy!
                </Text>
                <Text style={styles.description}>
                    Search by place-name, postcode or search near your location.
                </Text>
                <View style={styles.flowRight}>
                    <TextInput style={styles.searchInput} value={this.state.searchString}
                               onChange={this.onSearchTextChanged.bind(this)}
                               placeholder='Search via name or postcode'/>
                    <TouchableHighlight style={styles.button} underlayColor='#99d9f4'
                                        onPress={this.onSearchPressed.bind(this)}>
                        <Text style={styles.buttonText}>Go</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.flowRight}>
                    <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Location</Text>
                    </TouchableHighlight>
                </View>
                <Image source={require('./resources/house.png')} style={styles.image}/>
                {spinner}

            </View>
        );
    }
}

function urlForQueryAndPage(key, value, pageNumber) {
    var data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber
    };
    data[key] = value;

    var querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');

    return 'http://api.nestoria.co.uk/api?' + querystring;
};

var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image: {
        width: 217,
        height: 138
    }
});

module.exports = SearchScreen;
