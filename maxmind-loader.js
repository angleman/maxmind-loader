require('date-utils');
var fs     = require('fs')
  , wgetjs = require('wgetjs')
;




function maxloader(options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options  = {};
	};
	options             = options  || {};
	callback    	    = callback || options.callback || function() {};
	options.timeout     = options.timeout || 2 * 60 * 1000; // 2 minutes instead of 2 second default
	var edition         = options.edition     || 132
	  , offsets    = { su:0, mo:6, tu:5, we:4, th: 3, fr: 2, sa: 1 }
	  , day_offset = (options.day) ? options.day.substr(0.2).toLowerCase() : 'tu'
	  , pre        = 'http://www.maxmind.com/app/download_new?edition_id=' + edition + '&date='
	  , date       = new Date()
	  , offset     = 0 - (offsets[day_offset] + date.getDay()) // days to prior day (tuesday)
	;
	date.addDays(offset);
	var year    = date.getFullYear()
	  , month   = date.getMonth()+1
	  , day     = date.getDate();
	month       = (month > 9) ? month : '0' + month;
	day         = (day > 9) ? day : '0' + day;
	var date    = year + month + day
	  , post    ="&suffix=tar.gz&license_key=" + options.license
	  , source  = options.source || pre + date + post
	;
	options.url = (options.license) ? source : 'http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz';

	wgetjs(options, callback);
}

module.exports = maxloader;
