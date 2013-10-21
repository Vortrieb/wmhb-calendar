
var maxItems = 8;
var requestURL = "http://www.google.com/calendar/feeds/pcliv1j76854lmn04sf7fvbrpc@group.calendar.google.com/public/full?alt=json&orderby=starttime&max-results=" + maxItems + "&singleevents=true&sortorder=ascending&futureevents=true";
var http = require('http');
var fs = require("fs");
var request = require('request');
var json = fs.readFileSync('calendar-sample.json');
var dates = JSON.parse(json).feed.entry;

function refresh() {
	console.log('got calendar response');

	request({
		url: requestURL,
		json: true
	}, function (error, response, body) {
		exports.dates = body.feed.entry;
	});
}

exports.refresh = refresh;
exports.dates = dates;
