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

import I18n, { getLanguages } from 'react-native-i18n';

var SearchResultsScreen = require('./SearchResultsScreen');

var NetStoriaAPI = require('../services/NestoriaAPI');

class SearchScreen extends Component {
    static navigationOptions = {
        title: 'Property Finder',
    };

    language: string;

    /*
     Each React component has its own state object, which is used as a key-value store. Before a component is rendered
     you must set the initial state.
     */
    constructor(props) {
        super(props);
        // Set the initial state.
        // Component has a state variable, with searchString set to an initial value of london.
        this.state = {
            searchString: 'Madrid',
            isLoading: false,
            message: '' // Display a range of messages to the user.
        };

        getLanguages().then(languages => {
            this.language = languages[0];
            //console.log(languages) // ['en-US', 'en']
        })
    }

    /*
    Takes the value from the native browser event’s text property and uses it to update the component’s state.
     */
    onSearchTextChanged(event) {
        //console.log('onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text });
        //console.log(this.state.searchString);
    }

    handleResponse(response) {
        this.setState({ isLoading: false , message: '' });
        if (response.application_response_code.substr(0, 1) === '1') {
            //console.log('Properties found: ' + response.listings.length);
            // The above code navigates to your newly added SearchResults component and passes in the listings from the
            // API request. Using the push method ensures the search results are pushed onto the navigation stack, which
            // means you’ll get a ‘Back’ button to return to the root.


            this.props.navigation.navigate('SearchResultsScreen', { listings: response.listings });

            /*
            this.props.navigator.push({
                title: 'Results',
                component: SearchResultsScreen,
                passProps: {listings: response.listings}
            });
            */
        } else {
            this.setState({ message: 'Location not recognized; please try again.'});
        }
    }


    /*
     Configures and initiates the search query. This should kick off when the ‘Go’ button is pressed.
    */
    onSearchPressed() {

        this.setState({ isLoading: true });
        // The asynchronous response is returned as a promise, with the success path parsing
        // the JSON and supplying it to handleResponse.
        NetStoriaAPI.getResults('place_name', this.state.searchString, 1, this.language)
            .then(response => response.json())
            .then(json => this.handleResponse(json.response))
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                }));
    }

    onLocationPressed() {
        navigator.geolocation.getCurrentPosition(
                location => {
                var search = location.coords.latitude + ',' + location.coords.longitude;
                this.setState({ isLoading: true, searchString: search });

                // The asynchronous response is returned as a promise, with the success path parsing
                // the JSON and supplying it to handleResponse.
                NetStoriaAPI.getResults('centre_point', search, 1, this.language)
                    .then(response => response.json())
                    .then(json => this.handleResponse(json.response))
                    .catch(error =>
                        this.setState({
                            isLoading: false,
                            message: 'Something bad happened ' + error
                        }));
            },
                error => {
                this.setState({
                    message: 'There was a problem with obtaining your location: ' + error
                });
            });
    }

    render() {
        //console.log('SearchPage.render');

        // Adds an activity indicator or an empty view, depending on the component’s isLoading state. Because the entire
        // component is rendered each time, you are free to mix JSX and JavaScript logic.
        var spinner = this.state.isLoading ?
            ( <ActivityIndicator
                size='large'/> ) :
            ( <View/>);

        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    {I18n.t('description1')}
                </Text>
                <Text style={styles.description}>
                    {I18n.t('description2')}
                </Text>
                <View style={styles.flowRight}>
                    <TextInput style={styles.searchInput} value={this.state.searchString}
                               onChange={this.onSearchTextChanged.bind(this)}
                               placeholder='Search via name or postcode'/>
                    <TouchableHighlight style={styles.button} underlayColor='#99d9f4'
                                        onPress={this.onSearchPressed.bind(this)}>
                        <Text style={styles.buttonText}>{I18n.t('btnGo')}</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.flowRight}>
                    <TouchableHighlight style={styles.button} underlayColor='#99d9f4'
                                        onPress={this.onLocationPressed.bind(this)}>
                        <Text style={styles.buttonText}>{I18n.t('btnLocation')}</Text>
                    </TouchableHighlight>
                </View>
                <Image source={require('./../../resources/house.png')} style={styles.image}/>
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}

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

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true

I18n.translations = {
    en: {
        description1: 'Search for houses to buy!',
        description2: 'Search by place-name, postcode or search near your location.',
        btnGo: 'Go',
        btnLocation: 'Location',
        bedrooms: 'bedrooms',
        bathroom: 'bathroom',
        bathrooms: 'bathrooms'
    },
    es: {
        description1: 'Busca casas para comprar!',
        description2: 'Busca por nombre, código postal o cerca de tu localización',
        btnGo: 'Buscar',
        btnLocation: 'Localizar',
        bedrooms: 'dormitorios',
        bathroom: 'baño',
        bathrooms: 'baños'
    }
}

module.exports = SearchScreen;
