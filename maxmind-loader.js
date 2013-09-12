                 require('date-utils');                // JerrySievert/node-date-utils
var fs         = require('fs')
  , wgetjs     = require('wgetjs')                     // angleman/wgetjs
  , uncompress = require('compress-buffer').uncompress // egorfine/node-compress-buffer, used because decompress doesn't support just .gz
  , tar        = require('tar')                        // isaacs/node-tar
  , path       = require('path')
;




function maxloader(options, callback) {

	if (typeof options === 'function') {
		callback = options;
		options  = {};
	};
	options         = options         || {};
	callback    	= callback        || options.callback || function() {};
	options.dest    = options.dest    || '/tmp/';
	options.timeout = options.timeout || 15 * 60 * 1000; // 15 minutes instead of 2 second default
	if (typeof options.extract === 'undefined') {
		options.extract = true;
	}
	var edition     = options.edition || 132
	  , offsets     = { su:0, mo:6, tu:5, we:4, th: 3, fr: 2, sa: 1 }
	  , day_offset  = (options.day) ? options.day.substr(0.2).toLowerCase() : 'tu'
	  , pre         = 'http://www.maxmind.com/app/download_new?edition_id=' + edition + '&date='
	  , date        = new Date()
	  , offset      = 0 - (offsets[day_offset] + date.getDay()) // days to prior day (tuesday)
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

	if (options.extract) {
		wgetjs(options, extract);
	} else {
		wgetjs(options, callback);
	}


	function untar(tarsrc, outdir, outFile, attempt) {
		attempt = attempt || 0;
		attempt++;
		fs.createReadStream(tarsrc)
		  .pipe(tar.Extract({ path: outdir}))
		  .on("error", function (err) {
			if (attempt < 4) { // sometimes untar fails for an unknown reason, therefore try 3 times before failing
			  untar(tarsrc, outdir, outFile, attempt);
			} else {
			  callback(err);
			}
		  })
		  .on("end", function () {
			var resultFile = outFile.replace('.tar', '').replace('download_new', 'GeoIPCity');
			callback(undefined, resultFile);
		  })
		;
	}

	function extract(error, response, body) {
		if (error) {
			console.log(error);
			callback(error, response, body);
		} else if (!response || !response.headers) {
			console.log('missing response headers');
			error = new Error('missing response headers');
			callback(error, response, body);
		} else if (response.headers['content-length'] < 1000000) { // to small?
			console.log('content-length: ' + response.headers['content-length']);
			error = new Error('content-length < 1000000: ' + response.headers['content-length']);
			callback(error, response, body);
		}
		options.dry = true; // dry run, doesn't retrieve a remote file but does generate the destination filename
		wgetjs(options, function(err, res, data) { // get the destination filename
			var outFile      = data.dest.replace('.gz', '');
			var rawData      = fs.readFileSync(data.dest); // todo: find async version
			var uncompressed = uncompress(rawData);
			fs.writeFile(outFile, uncompressed, function(err) {
				var paidFile = outFile.replace('.tar', '').replace('download_new', '');
				if (outFile != paidFile) {
				    var tarsrc = fs.createReadStream(outFile);
				    var outdir = path.dirname(outFile);

				    untar(tarsrc, outdir, outFile, attempt);
				} else {
					callback(err, outFile);
				}
			});
		});
	}
}

module.exports = maxloader;