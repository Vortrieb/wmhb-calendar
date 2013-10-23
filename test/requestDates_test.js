var assert = require('chai').assert;
var fs = require('fs');
var _ = require('lodash');
var requestDates = require('../lib/requestDates');

describe('requestDates', function () {
	var data = fs.readFileSync('./test/assets/dates.json', 'utf8');
	var dataJSON = JSON.parse(data);

	describe("#parseResult", function () {
		var result = requestDates.parseResult(data);

		it('returns an array', function () {
			assert(_.isArray(result));
		});

		it('is grouped by month', function () {
			var group = result[0];

			assert.equal(group.monthName, "Oktober");
			assert.equal(group.month, "10");
			assert.lengthOf(group.events, 3);
		});
	});

	describe('#parseDate', function () {
		it('returns a useable Obect', function () {
			var result = requestDates.parseDate(dataJSON.feed.entry[0].gd$when[0].startTime);
			assert.deepEqual(result, {
				day: '24',
				dayName: 'Freitag',
				month: '10',
				monthName: 'Oktober',
				year: '2013',
				time: '19:00',
				utc: '2013-10-24T19:00:00.000+02:00',
				full: '24. Oktober 2013 19:00',
			});
		})
	})

	describe('#parseEntry', function () {
		it('returns a usable Object', function () {
			var result = requestDates.parseEntry(dataJSON.feed.entry[0]);

			assert.deepEqual(result, {
				description: 'Der Stammtisch für Online Marketing & SEO in Bremen wurde gegründet, um regelmäßige Treffen auf hohem fachlichen Niveau in geselliger Runde abzuhalten. Ziel ist es, Agenturen, Freiberufler und Inhouse-Verantwortliche aus Bremen und Umgebung zu einer unkomplizierten Veranstaltung zusammen zu bekommen, ohne eine Werbeveranstaltung daraus zu machen. http://www.google.de/',
				descriptionHTML: 'Der Stammtisch für Online Marketing & SEO in Bremen wurde gegründet, um regelmäßige Treffen auf hohem fachlichen Niveau in geselliger Runde abzuhalten. Ziel ist es, Agenturen, Freiberufler und Inhouse-Verantwortliche aus Bremen und Umgebung zu einer unkomplizierten Veranstaltung zusammen zu bekommen, ohne eine Werbeveranstaltung daraus zu machen. <a href="http://www.google.de/">http://www.google.de/</a>',
				place: 'daheim, Vor dem Steintor 24-26, 28203 Bremen',
				placeHTML: 'daheim<br/>Vor dem Steintor 24-26<br/>28203 Bremen',
				start: {
					day: '24',
					dayName: 'Freitag',
					month: '10',
					monthName: 'Oktober',
					year: '2013',
					time: '19:00',
					full: '24. Oktober 2013 19:00',
					utc: '2013-10-24T19:00:00.000+02:00',
				},

				end: {
					day: '24',
					dayName: 'Freitag',
					month: '10',
					monthName: 'Oktober',
					year: '2013',
					time: '21:00',
					full: '24. Oktober 2013 21:00',
					utc: '2013-10-24T21:00:00.000+02:00',
				},

			});
		})
	});

	describe("#parseText", function () {
		it("transforms urls to links", function () {
			var text = "Foo http://url.de/ irgendwas";

			assert.equal(
				requestDates.parseText(text),
				'Foo <a href="http://url.de/">http://url.de/</a> irgendwas'
			)
		});
	})
});
