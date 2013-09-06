# maxmind-loader [![NPM version](https://badge.fury.io/js/maxmind-loader.png?branch=master)](http://badge.fury.io/js/maxmind-loader) [![Build Status](https://travis-ci.org/angleman/maxmind-loader.png?branch=master)](https://travis-ci.org/angleman/maxmind-loader) [![Dependency Status](https://gemnasium.com/angleman/maxmind-loader.png?branch=master)](https://gemnasium.com/angleman/maxmind-loader) [![License](http://badgr.co/lic/MIT.png?bg=%234ed50e)](http://mit.edu/)

Get maxmind paid and lite geoip data updates

## Install

```
npm install maxmind-loader
```

## Usage

```javascript
var maxloader = require('maxmind-loader');

maxloader(callback);

// example showing default values
maxloader({
	license: undefined, // maxmind license string for paid data otherwise free version loaded
	day:     'tuesday', // day of the week to load for paid subscription
	extract: true,      // extract compressed files
	edition: 132,       // paid subscription edition
	dest:    './'       // destination_folder_or_filename
}, callback);
```

## Examples

```javascript
var maxloader = require('maxmind-loader');

maxloader(function() {
	console.log('GeoLiteCity.dat.gz loaded');
});


// paid subscription

var options = {license: 'MAXMIND_LICENSE'};

maxloader(options, function(error, response) {
	if (error) {
		console.log(error);				// error encountered
	} else {
		console.log(response.headers);	// load successful
	}
})
```

## License: MIT