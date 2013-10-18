#! /usr/bin/env node
'use strict';

var express          = require('express');
var http             = require('http');
var path             = require('path');
var cons             = require('consolidate');
var app              = express();
var calendar         = require('./lib/requestDates');
var strftime         = require('./lib/l10nStrftime');

app.engine('mustache', cons.mustache);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'mustache');

app.use(express.static(path.join(__dirname, 'public')));

if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function (req, res) {
	res.render('index', {
		title: 'test',
		dates: calendar.dates,
		parseDate: function () {
			return function (text, render) {
				return strftime("%B %d, %Y %H:%M:%S", new Date(
					Date.parse(render(text))
				));
			};
		}
	});
});

app.get('/dates.json', function (req, res) {
	if (calendar.dates) {
		res.write("{" + JSON.stringify(calendar.dates) + "}");
	} else {
		res.write("{/* no data loaded yet, try again in a second */}");
	}
});

calendar.refresh();
setTimeout(calendar.refresh, 1000 * 60);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
