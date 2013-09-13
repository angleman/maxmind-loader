var should    = require('should')
  , maxloader = require('../maxmind-loader.js')
  , fs        = require('fs')
  , geofile   = '/tmp/GeoLiteCity.dat'
  , geofilegz = geofile + '.gz'
;


// clean up from prior run
if (fs.existsSync(geofile)) {
    fs.unlinkSync(geofile);
}
if (fs.existsSync(geofilegz)) {
    fs.unlinkSync(geofilegz);
}


describe('maxmind-loader', function() {

    describe('cleanup test data', function() {
      it(geofile + " and " + geofilegz + "should not exist", function(){  
        var exists = (fs.existsSync(geofile));
        exists.should.not.be.equal(true);
        exists = (fs.existsSync(geofilegz));
        exists.should.not.be.equal(true);
      }); 
    });



    describe('should', function() {

        var flag = false;
        var size, fstat;
        beforeEach(function(done){
            this.timeout(15 * 60 * 1000); // allow test to run for 15 minutes
            maxloader({
                dest: '/tmp/'
            }, function(err) {
                flag = (!err);
                done(); // complete the async beforeEach
            });

        });   

        it("load without errors", function(){    
            flag.should.equal(true);  
        }); 

        it(geofilegz + " be above 9MB", function(){
            flag = fs.existsSync(geofilegz);  
            flag.should.equal(true);  
            fstat = fs.statSync(geofilegz);
            size  = fstat.size;
            size.should.be.above(9001000); // at least 9MB, assumes maxmind doesn't shrink the free data set much
        }); 

        it(geofile + " be above 14MB", function(){  
            flag = fs.existsSync(geofile);  
            flag.should.equal(true);  
            fstat = fs.statSync(geofile);
            size  = fstat.size;
            size.should.be.above(14001000); // at least 14MB, assumes maxmind doesn't shrink the free data set much
        }); 

    });

});