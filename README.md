# maxmind-loader [![NPM version](https://badge.fury.io/js/maxmind-loader.png?branch=master)](http://badge.fury.io/js/maxmind-loader) [![Build Status](https://travis-ci.org/angleman/maxmind-loader.png?branch=master)](https://travis-ci.org/angleman/maxmind-loader) [![Dependency Status](https://gemnasium.com/angleman/maxmind-loader.png?branch=master)](https://gemnasium.com/angleman/maxmind-loader) [![License](http://badgr.co/use/MIT.png?bg=%234ed50e)](http://opensource.org/licenses/MIT)

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

maxloader(function() {
	maxmind.init('GeoLiteCity.dat');
});
```

## Paid Geo Data Example

```
var options = { license: 'MAXMIND_LICENSE' };

maxloader(options, function(error, response) {
	if (error) {
		console.log(error);				// error encountered
	} else {
		maxmind.init('GeoIPCity.dat', { memoryCache: true });
	}
})
```

## License: MIT