
var maxItems = 5;
var requestURL = "http://www.google.com/calendar/feeds/pcliv1j76854lmn04sf7fvbrpc@group.calendar.google.com/public/full?alt=json&orderby=starttime&max-results=" + maxItems + "&singleevents=true&sortorder=ascending&futureevents=true";
var http = require('http');
var request = require('request');
var dates = [];

function refresh() {
	request({
		url: requestURL,
		json: true
	}, function (error, response, body) {
		exports.dates = body.feed.entry;
	});
}

exports.refresh = refresh;
exports.dates = dates;
