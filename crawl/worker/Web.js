"use strict";

var RequestConnection = require('request');

(function() {

    var Request = RequestConnection.defaults({
        jar       : true,
        timeout   : 60000,
        encoding  : 'binary',
        gzip      : true,
        time      : true,
        headers   : {
            'User-Agent'                : 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3)',
            'Upgrade-Insecure-Requests' : '1',
            'Referer'                   : 'http://www.buscacep.correios.com.br/sistemas/buscacep/',
            'Origin'                    : 'http://www.buscacep.correios.com.br',
            'Host'                      : 'www.buscacep.correios.com.br'
        }
    });

    var requestCallback = function(url, callback, retryCount, error, response, body) {
        var statusCode = response? response.statusCode : null;

        if (!error && response) {
            callback(body, statusCode, url, response.headers);
        }
        else {
            console.log('ERROR' + error);
            callback(null, statusCode, url);
        }
    };


    var _get = function(url, callback, _retryCount) {
        var getOptions = {
            url: url
        };

        Request.get(
            getOptions,
            requestCallback.bind(null, url, callback, _retryCount)
        );
    };

    var _post = function(url, form, callback, headers, _retryCount) {
        var postOptions = {
            'url': url,
            'form': form,
            'headers' : {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        Request.post(
            postOptions,
            requestCallback.bind(null, url, callback, _retryCount)
        );
    };

    module.exports.Get  = _get;
    module.exports.Post = _post;
})();
