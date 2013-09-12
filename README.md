# maxmind-loader [![NPM version](https://badge.fury.io/js/maxmind-loader.png?branch=master)](http://badge.fury.io/js/maxmind-loader) [![Build Status](https://travis-ci.org/angleman/maxmind-loader.png?branch=master)](https://travis-ci.org/angleman/maxmind-loader) [![Dependency Status](https://gemnasium.com/angleman/maxmind-loader.png?branch=master)](https://gemnasium.com/angleman/maxmind-loader) [![License](http://badgr.co/use/MIT.png?bg=%234ed50e)](#licensemit)

Get maxmind paid and lite geoip data updates

## Install

```
npm install maxmind-loader
```

## Usage

```javascript
var maxloader = require('maxmind-loader');

maxloader(callback);

// default values shown
maxloader({
	license: undefined, // maxmind license string for paid data otherwise free version loaded
	day:     'tuesday', // day of the week to load for paid subscription
	edition: 132,       // paid subscription edition
	extract: true,      // extract compressed files
	dest:    './'       // destination_folder_or_filename
}, callback);
```

## Free Geo Data Example

```javascript
var maxmind   = require('maxmind')
  , maxloader = require('maxmind-loader');

maxloader(function(error, datapath) {
	maxmind.init(datapath); // intialize with GeoLiteCity.dat
});
```

## Paid Geo Data Example

```
var options = { license: 'MAXMIND_LICENSE' };

maxloader(options, function(error, datapath) {
	if (error) {
		console.log(error);				// error encountered
	} else {
		maxmind.init(datapath, { memoryCache: true });
	}
})
```

## License: MIT

Dependencies:

[![date-utils](http://badgr.co/date-utils/MIT.png?bg=%23339e00 "date-utils@1.2.14 Massachusetts Institute of Technology")](http://github.com/JerrySievert/node-date-utils)
[![wgetjs](http://badgr.co/wgetjs/MIT.png?bg=%23339e00 "wgetjs@0.2.2 Massachusetts Institute of Technology")](https://github.com/angleman/wgetjs)
[![compress-buffer](http://badgr.co/compress-buffer/MIT*.png?bg=%23339e00 "compress-buffer@1.2.0 Massachusetts Institute of Technology (text scan guess)")](http://github.com/egorfine/node-compress-buffer)

[![untar](http://badgr.co/untar/Unknown.png?bg=%23ddcb02 "untar@0.2.4 Unknown License")](https://github.com/jkroso/untar)