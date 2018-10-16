
app.controller('myCtrl', ['$scope','$http', function ($scope, $http) {
    $scope.search = { price_min : '', price_max : '', amount_min : 1000, amount_max : 5000 };
    $scope.carname = "Volvo";
    $scope.showFlightDetails = false;
    $scope.isActivereyurn = true;
    $scope.isActiveoneway = false;
    disabletest: boolean = true;
    $scope.Flightjson =[];
    $scope.arrayOfObject = [];
    $scope.showError = false;
    $http.get('flightData.json').then(function(response) {
        $scope.Flightjson = response.data;
     });
    $scope.Flightjson.forEach(element => {
            $scope.arrayOfObject.push(element)
     });
    $scope.parseDate = function(dateStr) {
     var months = {
            "jan": 1,
            "feb": 2,
            "mar": 3,
            "apr": 4,
            "may": 5,
            "jun": 6,
            "jul": 7,
            "aug": 8,
            "sep": 9,
            "oct": 10,
            "nov": 11,
            "dec": 12

        }
        var dateParts = dateStr.split(" ");
        var dateObject = new Date(dateParts[2], months[dateParts[1]] - 1, dateParts[0]);
        return dateObject.toISOString(); }

        $scope.parseDateFormat = function(datastring){
        var datePartsFormat = datastring.split("-");
        var dateObjectFormat = new Date(datePartsFormat[0], datePartsFormat[1]-1, datePartsFormat[2]);
        return dateObjectFormat.toISOString(); }

        $scope.searchFlight = function () {
        $scope.arrayOfObject = [];
        if($scope.origincity != '' && $scope.startdate!='' && $scope.destinationcity !='' && $scope.origincity != undefined && $scope.startdate!=undefined && $scope.destinationcity !=undefined ){ $scope.showFlightDetails = true;
        let origin = $scope.origincity.toLowerCase()
        let departure = $scope.destinationcity.toLowerCase()
        let startdate = $scope.parseDateFormat($scope.startdate);
        if($scope.enddate !='' &&  $scope.enddate != undefined) {
        let enddate = $scope.parseDateFormat($scope.enddate);
         }
        $scope.Flightjson.forEach(element => {
        if ((element.origin == origin) && element.destination == departure && Date.parse($scope.parseDate(element.startdate)) == Date.parse(startdate)) {
        $scope.arrayOfObject.push(element);}
        }); }
        else{
        $scope.showError = true;
        
        } }

        $scope.$watchCollection('search.amount_min' , function() {  
        $scope.showError = false;
        $scope.arrayOfObject =[];
        $scope.Flightjson.forEach(element => {
        if ((element.price >= $scope.search.amount_min) && (element.price <= $scope.search.amount_max)) {
        $scope.arrayOfObject.push(element); }
        });
        });

        $scope.$watchCollection('search.amount_max' , function() {  
        $scope.showError = false;
        $scope.arrayOfObject =[];
        $scope.Flightjson.forEach(element => {
        if ((element.price >= $scope.search.amount_min) && (element.price <= $scope.search.amount_max)) {
        $scope.arrayOfObject.push(element);}
        });
        });

        $scope.returnBooking = function () {
        $scope.showError = false;
        $scope.disabletest = false;
        $scope.isActivereyurn = true;
        $scope.isActiveoneway = false;
        $scope.closeModalBox();
        }

        $scope.returnOnewaybooking = function () {
        $scope.disabletest = true;
        $scope.showError = false;
        $scope.isActivereyurn = false;
        $scope.isActiveoneway = true;
        $scope.closeModalBox()
        }
        
        $scope.closeModalBox = function()
        {
           $scope.arrayOfObject =[]; 
            $scope.origincity ='';
            $scope.startdate ='';
            $scope.destinationcity='';
            $scope.showError = false;
            $scope.showFlightDetails = false;
            $scope.number ='';
            $scope.enddate ='';
            
        }
   
}]);



  
