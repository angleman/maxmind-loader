                 require('date-utils');                // JerrySievert/node-date-utils
var fs         = require('fs')
  , wget       = require('wgetjs')                     // angleman/wgetjs
  , uncompress = require('compress-buffer').uncompress // egorfine/node-compress-buffer, used because decompress doesn't support just .gz
  , tar        = require('tar')                        // isaacs/node-tar
  , path       = require('path')
;

// todo: consider using grimen/node-document-compressor-deflate

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


	function untar(tarsrc, outdir, outFile) {
		fs.createReadStream(tarsrc)
		  .pipe(tar.Extract({ path: outdir}))
		  .on("error", function (err) {
			  callback(err);
		  })
		  .on("end", function () {
			validateDatFile(outFile);
			callback(null, outFile);
		  })
		;
	}


	function returnError(message) {
		message = "maxmind-loader error: " + message;
		console.log(message);
		callback(new Error(message));
	}


	function validateDatFile(testFile, size) {
		size   = size || 14001000; // should be at least 14MB  
		ok = false;
		if (fs.existsSync(testFile)) {
			var fstat = fs.statSync(testFile);
			if (fstat.size < size) {
				returnError(testFile +  "is " + fstat.size + ", needs to be at least " + Math.round(size / 1000000) + 'MB');
			}
		} else {
			returnError(testFile + " not found");
		}
	}


	function validateGzFile(testFile) {
		validateDatFile(testFile, 9001000); // should be at least 9MB
	}


	function extractData(err, data) {
		if (err) {
			callback(err);
			return;
		} else if (!data || !data.filepath) {
			returnError('missing data.filepath');
			return;
		}

		var gzFile       = data.filepath;
		validateGzFile(gzFile);                       // return error if it's doesn't exist or isn't at least 9MB

		var outFile      = gzFile.replace('.gz', '');
		var rawData      = fs.readFileSync(gzFile);
		var uncompressed = uncompress(rawData);       // todo: find async version
		var timerid      = null;

		function finishUp() {
			clearTimeout(timerid);
			var paidFile   = outFile.replace('.tar', '').replace('download_new', '');
			if (outFile != paidFile) { // paid data
			    var outdir = path.dirname(outFile);
			    untar(outFile, outdir, paidFile, attempt);
			} else { // free data
				callback(null, outFile);
			}
		}

		fs.writeFile(outFile, uncompressed, function(err) {
			if (err) {
				callback(err);
			} else {
				timerid = setTimeout(finishUp, 1);
			}
		});
	}


	if (options.extract) {
		wget(options, extractData);
	} else {
		wget(options, callback);
	}
}



module.exports = maxloader;
