var maxItems   = 25;
var requestURL = "http://www.google.com/calendar/feeds/pcliv1j76854lmn04sf7fvbrpc@group.calendar.google.com/public/full?alt=json&orderby=starttime&max-results=" + maxItems + "&singleevents=true&sortorder=ascending&futureevents=true";
var http       = require('http');
var fs         = require("fs");
var request    = require('request');
var json       = fs.readFileSync('./public/dates.json', 'utf8');
var _          = require('lodash');
var strftime   = require('./l10nStrftime');
var time       = require('time')(Date);

function parseText(text) {
	function replaceURLWithHTMLLinks(text) {
		var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		return text.replace(exp, '<a href="$1">$1</a>');
	}

	text = replaceURLWithHTMLLinks(text);

	return text;
}

function parseDate(dateString) {
	var date = new Date(Date.parse(dateString)).setTimezone('Europe/Berlin');

	return {
		day: strftime('%e', date),
		dayName: strftime('%A', date),
		month: strftime('%m', date),
		monthName: strftime('%B', date),
		year: strftime('%Y', date),
		time: strftime('%H:%M', date),
		full: strftime("%e. %B %Y %H:%M", date),
		utc: dateString
	}
}

function parseEntry(entry) {
	return {
		title: entry.title.$t,
		description: entry.content.$t,
		descriptionHTML: parseText(entry.content.$t),
		place: entry.gd$where[0].valueString,
		placeHTML: entry.gd$where[0].valueString.replace(/,\s+/g, '<br/>'),
		start: parseDate(entry.gd$when[0].startTime),
		end: parseDate(entry.gd$when[0].endTime),
	};
}

function parseResult(data) {
	if (typeof data === 'string') { data = JSON.parse(data); }
	var groups = [];
	var currentMonth = 0;

	_.forEach(_.map(data.feed.entry, parseEntry), function (entry, key) {
		if (key === 0 || currentMonth !== entry.start.month) {
			currentMonth = entry.start.month;
			groups.push({
				month: entry.start.month,
				monthName: entry.start.monthName,
				events: []
			});
		}

		_.last(groups).events.push(entry)
	});
	return groups;
}

function refresh() {
	request({
		url: requestURL,
		json: true
	}, function (error, response, body) {
		if (!error) {
			exports.dates = parseResult(body);

			fs.writeFile('public/dates.json', JSON.stringify(body), function (err) {
				if (err) {
					console.error("couldn't save public/dates.json");
				}
			});
		}
	});
}

exports.parseText = parseText;
exports.parseDate = parseDate;
exports.parseResult = parseResult;
exports.parseEntry = parseEntry;
exports.refresh = refresh;
exports.dates = parseResult(json);
