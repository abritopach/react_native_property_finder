var NetStoriaAPI = {

    // Creates the query string based on the parameters in data. Following this, it transforms the data into the required
    // string format, name=value pairs separated by ampersands.
    createQueryString: function(key, value, pageNumber, language) {

        // Default DATA API UK

        var url = 'http://api.nestoria.co.uk/api?';

        var data = {
            country: 'uk',
            pretty: '1',
            encoding: 'json',
            listing_type: 'buy',
            action: 'search_listings',
            page: pageNumber
        };

        // UPDATE Nestoria API data and url by device locale.
        if ((language.indexOf('es') != -1) /* && (key == "centre_point")*/) {
            data.country = 'es';
            url = 'https://api.nestoria.es/api?';
        }

        data[key] = value;

        var querystring = Object.keys(data)
            .map(key => key + '=' + encodeURIComponent(data[key]))
            .join('&');


        // Example request: http://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&page=1&place_name=london

        return url + querystring;
    },

    getResults: function(key, value, pageNumber, language) {

        var query = this.createQueryString(key, value, pageNumber, language);

        // This makes use of the fetch function, which is part of the Web API, and provides a vastly improved API
        // versus XMLHttpRequest.
        return fetch(query);
    }

}

module.exports = NetStoriaAPI;