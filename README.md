[![Build Status](https://travis-ci.org/Vortrieb/wmhb-calendar.png?branch=master)](https://travis-ci.org/Vortrieb/wmhb-calendar)

# Webmontag Kalender

Der Kalender wird in einem Google Calendar gepflegt. Veranstalltungsorganisateure bekommen Stellvertreterrechte. Dieser Kalender ruft die eingetragenen Veranstaltungen als JSON von Google ab und bereitet sie als Website auf.

## Installation

Das ganze läuft mit [NodeJS]( http://nodejs.org/) und muss ggf. als erstes
installiert werden. Ist dies der Fall, sollte es in 3 schritten ganz einfach
sein, den Kalender auf Lokal zum laufen zu bekommen.

1. Repository Clonen: `git clone https://github.com/Vortrieb/wmhb-calendar.git`
2. Dependencies installieren: `npm install`
3. App Starten: `npm start`

*Achtung*: Für `npm start` muss [grunt](http://gruntjs.com) installiert sein:

	npm install -g grunt-cli. 

Der `grunt watch`-Task startet den Server neu, wenn notwendig, kompiliert die
`scss`-Dateien und lädt das Browserfenster neu, wenn die Livereload Extension
installiert ist und man sich verbunden hat, führt die Tests aus, wenn
erforderlich; also halt alles was man so beim Entwickeln brauch.

## Zum Projekt beitragen

Wir freuen uns, wenn ihr zum Projekt beitragen wollt. Das könnt ihr auf
verschiedene Weisen tun:

### Neue Veranstaltungen ankündigen:

Schreibt dazu einfach eine E-Mail mit allen üblicherweise notwendigen
Informationen an [kalender@webmontag-bremen.de](mailto:kalender@webmontag-bremen.de).

### Code-Kram

*TL;DR*: forkt das Projekt, macht eure Änderungen und schickt uns dann einen
Pull-Request.

#### CSS/HTML

Wir verwenden die [Mustache Template-Engine](http://mustache.github.io/)
und [Compass](http://compass-style.org).

#### JavaScript

Es gibt zwar nicht für alles Tests, aber für alle zukünftigen Dinge, sollten
entsprechend Tests geschrieben werden. Dafür wird [mocha](visionmedia.github.io/mocha/)
und [Chai](http://chaijs.com/) mit der [assert API](http://chaijs.com/api/assert/) verwendet.
