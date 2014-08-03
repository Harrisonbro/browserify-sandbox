var _ = require('underscore'),
    $ = require('jquery');

//  $ = require('jquery/dist/jquery')(window) for older versions that 2.1.0

var mytemplate = _.template('<h1> <%= name %> </h1>');

$('body').append(mytemplate({name: 'Harrison'}));