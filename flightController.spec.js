describe('myApp', function () {
    var scope,
        controller;
    beforeEach(function () {
        module('myApp');
    });
    describe('myCtrl', function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('myCtrl', {
                '$scope': scope
            });
        }));


        it('sets defauly variable value', function () {
            expect(scope.isActivereyurn).toBe(true)
            expect(scope.isActiveoneway).toBe(false)
        });

        it('test serach function', function () {
            scope.origincity = 'pune';
            scope.startdate = '2018-09-10';
            scope.destinationcity = 'delhi';
            let obj = {
                "startdate": "10 sep 2018",
                "enddate": "15 sep 2018",
                "origin": "pune",
                "destination": "delhi",
                "price": "2000",
                "name": "sa-101",
                "arrival": "10",
                "departure": "9",
                "codeArrive": "PUN",
                "codeDestination": "DEL"
            }
            scope.Flightjson.push(obj)
            scope.searchFlight()
            expect(scope.showFlightDetails).toBe(true);

        });
        
        it('test closeModalBox function', function () {
         scope.closeModalBox()
            expect(scope.showError).toBe(false);
            expect(scope.showFlightDetails).toBe(false);

        });



    });
});