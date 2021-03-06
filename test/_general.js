var should    = require('should')
  , maxloader = require('../maxmind-loader.js')
  , fs        = require('fs')
  , geofile   = '/tmp/GeoLiteCity.dat'
  , geofilegz = geofile + '.gz'
;



describe('maxmind-loader', function() {

    // clean up from prior run
    if (fs.existsSync(geofile)) {
        fs.unlinkSync(geofile);
    }
    if (fs.existsSync(geofilegz)) {
        fs.unlinkSync(geofilegz);
    }

    var exists;

    describe('cleanup test data', function() {

      it(geofilegz + " should not exist", function(){  
        exists = (fs.existsSync(geofilegz));
        exists.should.not.be.equal(true);
      }); 

      it(geofile + " should not exist", function(){  
        exists = (fs.existsSync(geofile));
        exists.should.not.be.equal(true);
      }); 
    });



    describe('should', function() {

        var flag = false;
        var size, fstat;
        beforeEach(function(done){
            this.timeout(1 * 60 * 1000); // allow test to run for 1 minutes
            maxloader({
                dest: '/tmp/'
            }, function(err) {
                if (err) {
                    console.log(err);
                }
                flag = true;
                done(); // complete the async beforeEach
            });

        });   

        it("load without errors", function(){    
            flag.should.equal(true);  
            console.log('load ok');

            flag = fs.existsSync(geofilegz);  
            flag.should.equal(true);  

            console.log(geofilegz,'exists');

            fstat = fs.statSync(geofilegz);
            size  = fstat.size;
            size.should.be.above(9001000); // at least 9MB, assumes maxmind doesn't shrink the free data set much

            console.log(geofilegz,'size ok at ' + size);

            flag = fs.existsSync(geofile);  
            flag.should.equal(true);  

            console.log(geofile,'exists');

            fstat = fs.statSync(geofile);
            size  = fstat.size;
            size.should.be.above(14001000); // at least 14MB, assumes maxmind doesn't shrink the free data set much

            console.log(geofile,'size ok at ' + size);
        }); 

    });

});