angular.module('maison').controller('WillayatController', WillayatController);

function WillayatController($http, $routeParams) {
    var bs = this;
    var id = $routeParams.id - 1;

    bs.title = "Willaya stats";
    console.log(id);
    
    $http.get('https://covid19dz.openalgeria.org/api/v1/wilayas').then( function(response) {
        bs.wilayat = response.data;
        bs.wilaya = bs.wilayat[id];
        console.log(bs.wilaya);
    },function errorCallback(response) {
        console.log(response);

        // Fetch Errors
        bs.errorStatus = response.xhrStatus;
        console.log('Data response ' + response.data);

        if (bs.error === null || bs.errorStatus === 404){
            console.log(bs.errorStatus + ' something went wrong');
        }
    });


}
