angular.module("maison", ['ngRoute'])
.controller('MaController', MaController)
.config(config);


function config($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'main/stats/country/main.html',
        controller: MaController,
        controllerAs: 'bs'
    })
    .when('/wilaya/:id', {
        templateUrl: 'main/stats/states/state.html',
        controller: WillayatController,
        controllerAs: 'bs'
    });
}

function MaController() {
    var bs = this;
}
function WillayatController() {
    var bs = this;
}

