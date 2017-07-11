'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text
} from 'react-native';

class SearchResultsScreen extends Component {
    static navigationOptions = {
        title: 'Results',
    };

    constructor(props) {
        console.log("SearchResultsScreen");
        super(props);
        // When constructing the data source, you provide a function that compares the identity of a pair of rows.
        // The ListView uses this during the reconciliation process, in order to determine the changes in the list data.
        // In this instance, the properties returned by the Nestoria API have a lister_url property, which is a suitable
        // check for this purpose.

        var dataSource = new ListView.DataSource(
            {rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url});
        this.state = {
            //dataSource: dataSource.cloneWithRows(this.props.listings)
            dataSource: dataSource.cloneWithRows(this.props.navigation.state.params.listings)
        };

        //console.log(this.props.navigation.state.params.listings);
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight
                underlayColor='#dddddd'>
                <View>
                    <Text>{rowData.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {

        // Displays rows of data within a scrolling container, similar to UITableView. You supply data to the ListView
        // via a ListView.DataSource, and a function that supplies the UI for each row.
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>
        );
    }

}

module.exports = SearchResultsScreen;
