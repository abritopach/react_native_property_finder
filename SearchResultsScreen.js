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

    /*
     This method locates the property that was tapped by the user.
     */
    rowPressed(listerURL) {
        var property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];
    }

    renderRow(rowData, sectionID, rowID) {
        var price = rowData.price_formatted.split(' ')[0];

        return (
            <TouchableHighlight onPress={() => this.rowPressed(rowData.lister_url)}
                                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
                        <View  style={styles.textContainer}>
                            <Text style={styles.price}>{price}</Text>
                            <Text style={styles.title}
                                  numberOfLines={1}>{rowData.title}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
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

var styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    }
});

module.exports = SearchResultsScreen;
