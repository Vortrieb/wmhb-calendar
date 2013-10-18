var sft              = require('strftime');
var localizeStrftime = {
	days: [ 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag' ],
	shortDays: [ 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So' ],
	months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'Septemper', 'Oktober', 'November', 'Dezember'],
	shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
	AM: 'Vormittags',
	PM: 'Nachmittags'
};

var localizedStrftime = sft.localizedStrftime(localizeStrftime);

module.exports = localizedStrftime;
