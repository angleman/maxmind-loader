# maxmind-loader [![NPM version](https://badge.fury.io/js/maxmind-loader.png?branch=master)](http://badge.fury.io/js/maxmind-loader) [![Build Status](https://travis-ci.org/angleman/maxmind-loader.png?branch=master)](https://travis-ci.org/angleman/maxmind-loader) [![Dependency Status](https://gemnasium.com/angleman/maxmind-loader.png?branch=master)](https://gemnasium.com/angleman/maxmind-loader) [![License](http://badgr.co/use/MIT.png?bg=%234ed50e)](#licensemit)

Get maxmind paid and lite geoip data updates

## Install :hammer:

```
npm install maxmind-loader
```

## Usage :wrench:

```javascript
var maxloader = require('maxmind-loader');

maxloader(callback);

// default values shown
maxloader({
	license: undefined, // maxmind license string for paid data otherwise free version loaded
	day:     'tuesday', // day of the week to load for paid subscription
	edition: 132,       // paid subscription edition
	extract: true,      // extract compressed files
	dest:    '/tmp/'    // should load /tmp/GeoCityLite.dat, async operation
}, function (err, filepath) {
	if (err) {
		console.log(err);
	} else {
		console.log(filepath, 'loaded');
	}
});
```

## Free Geo Data Example :wrench:

```javascript
var maxmind   = require('maxmind')
  , maxloader = require('maxmind-loader');

maxloader(function(error, filepath) {
	maxmind.init(filepath); // intialize with /tmp/GeoLiteCity.dat
});
```

## Paid Geo Data Example :wrench:

```javascript
var options = { license: 'MAXMIND_LICENSE' };

maxloader(options, function(err, filepath) {
	if (err) {
		console.log(err);
	} else {
		maxmind.init(filepath, { memoryCache: true });
	}
})
```

## License: MIT :unlock:

Dependencies:

[![tar](http://badgr.co/tar/BSD.png?bg=%23339e00 "tar@0.1.18 Berkeley Software Distribution")](https://github.com/isaacs/node-tar)
[![date-utils](http://badgr.co/date-utils/MIT.png?bg=%23339e00 "date-utils@1.2.14 Massachusetts Institute of Technology")](http://github.com/JerrySievert/node-date-utils)
[![wgetjs](http://badgr.co/wgetjs/MIT.png?bg=%23339e00 "wgetjs@0.3.1 Massachusetts Institute of Technology")](https://github.com/angleman/wgetjs)
[![compress-buffer](http://badgr.co/compress-buffer/MIT*.png?bg=%23339e00 "compress-buffer@1.2.0 Massachusetts Institute of Technology (text scan guess)")](http://github.com/egorfine/node-compress-buffer)