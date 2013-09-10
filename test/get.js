var should    = require('should')
  , maxloader = require('../maxmind-loader.js')
;



describe('load free', function() {
    describe('successful loading GeoLiteCity.dat.gz', function() {

        var flag = false;
        beforeEach(function(done){
            this.timeout(15 * 60 * 1000); // allow test to run for 15 minutes
            maxloader({
                dest: '/tmp/'
            }, function(error, datapath) {
                flag = (error) ? error : true;
                done(); // complete the async beforeEach
            });

        });   

        it("flag should be true", function(){    
            flag.should.equal(true);  
        }); 

    });

});