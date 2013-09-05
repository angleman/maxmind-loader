var should    = require('should')
  , maxloader = require('../maxmind-loader.js')
;



describe('load free', function() {
    describe('successful loading GeoLiteCity.dat.gz', function() {

        var flag = false;
        beforeEach(function(done){
            maxloader({dest: '/tmp/'}, function() {
                flag = true;
                done(); // complete the async beforeEach
            });

        });   

        it("flag should be true", function(){    
            flag.should.equal(true);  
        }); 

    });

});