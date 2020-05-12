angular.module('maison').controller('Macontroller', MaController);

function MaController($http) {
    var bs = this;
    bs.title = 'Tableau de bord de l\'épidémie de virus COVID-19 en Algérie';
    bs.countries = ['Algeria', 'Morocco', 'Tunisia'];

    $http.get('https://covid19dz.openalgeria.org/api/v1/stats')
        .then( function(response) {
           // console.log(response);
            bs.status = response.status;

            // Fetch All Data 
            bs.country = response.data;

            bs.lastUpdate = response.data.dateAsOf;
            
            // fetch Total Cases 
            bs.totalConfirmedCases = response.data.confirmed.total;
            bs.totalRecoveredCases = response.data.recovered.total;
            bs.totalDeathCases = response.data.deaths.total;
            bs.totalActiveCases = response.data.actives;
            bs.underTreatmentCases = response.data.treatment;

            // fetch Daily New Cases
            bs.totalNewConfirmedCases = response.data.confirmed.new;
            bs.totalNewRecoveredCases = response.data.recovered.new;
            bs.totalNewDeathCases = response.data.deaths.new;

        }, function errorCallback(response) {
            console.log(response);

            // Fetch Errors
            bs.errorStatus = response.xhrStatus;
            console.log('Data response ' + response.data);

            if (bs.error === null || bs.errorStatus === 404){
                console.log(bs.errorStatus + ' something went wrong');
            }
        });


        // Fetch Covid-19 stats by willayat
        bs.titleState = 'Tous les wilayas touchée ';
        $http.get('https://covid19dz.openalgeria.org/api/v1/wilayas').then( function(response) {
        
        //bs.states = response.data;
        bs.willayat = response.data; 

    });
}
