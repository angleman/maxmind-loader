# maxmind-loader [![NPM version](https://badge.fury.io/js/maxmind-loader.png?branch=master)](http://badge.fury.io/js/maxmind-loader) [![Build Status](https://travis-ci.org/angleman/maxmind-loader.png?branch=master)](https://travis-ci.org/angleman/maxmind-loader) [![Dependency Status](https://gemnasium.com/angleman/maxmind-loader.png?branch=master)](https://gemnasium.com/angleman/maxmind-loader)

Get maxmind paid and lite geoip data updates


## Install

```
npm install maxmind-loader
```

## Usage

```
var maxloader = require('maxmind-loader');

maxloader(callback);

maxloader({
	license: 'MAXMIND_LICENSE', // for paid data
	dest:    './'               // destination_folder_or_filename
}, callback);
```

## Examples

```
var maxloader = require('maxmind-loader');

maxloader(function() {
	console.log('GeoLiteCity.dat.gz loaded');
});
```

## License: MIT