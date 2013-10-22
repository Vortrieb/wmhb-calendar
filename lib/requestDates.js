var maxItems   = 10;
var requestURL = "http://www.google.com/calendar/feeds/pcliv1j76854lmn04sf7fvbrpc@group.calendar.google.com/public/full?alt=json&orderby=starttime&max-results=" + maxItems + "&singleevents=true&sortorder=ascending&futureevents=true";
var http       = require('http');
var fs         = require("fs");
var request    = require('request');
var json       = fs.readFileSync('public/dates.json');
var dates      = JSON.parse(json).feed.entry;
var _          = require('lodash');
var strftime   = require('./l10nStrftime');

function refresh() {
	console.log('refreshing dates');

	request({
		url: requestURL,
		json: true
	}, function (error, response, body) {
		if (!error) {
			exports.dates = body.feed.entry;
			_.map(body.feed.entry, function (entry) {
				var format = "%e %B %Y %H:%M";

				var startDate = new Date(Date.parse(entry.gd$when[0].startTime));
				var endDate = new Date(Date.parse(entry.gd$when[0].endTime));

				entry.day = strftime('%e', startDate);
				entry.readableStartDate = strftime(format, startDate);
				entry.readableEndDate = strftime(format, endDate);
			});

			fs.writeFile('public/dates.json', JSON.stringify(body), function (err) {
				if (err) {
					console.error("couldn't save public/dates.json");
				}
			});
		}
	});
}

exports.refresh = refresh;
exports.dates = dates;
