var _ = require('underscore'),
    $ = require('jquery');

//  $ = require('jquery/dist/jquery')(window) for older versions that 2.1.0

var mytemplate = _.template('<h1> Hello <%= name %> </h1>');

$(document).ready(function () {
    $('body').append(mytemplate({name: 'Harrison'}));

    console.log( 'test complete' );
});

