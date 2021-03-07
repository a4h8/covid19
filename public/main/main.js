angular
  .module("maison", ["ngRoute"])
  .controller("MaController", MaController)
  .config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "main/stats/country/main.html",
      controller: MaController,
      controllerAs: "bs",
    })
    .when("/wilaya/:id", {
      templateUrl: "main/stats/states/main.html",
      controller: WillayatController,
      controllerAs: "bs",
    })
    .when("/about", {
      templateUrl: "main/pages/about/main.html",
      controller: PagesController,
      controllerAs: "bs",
    })
    .when("/faq", {
      templateUrl: "main/pages/faq/main.html",
      controller: PagesController,
      controllerAs: "bs",
    });
}

function MaController() {
  // var bs = this;
}
function WillayatController() {
  // var bs = this;
}
function PagesController() {
  // var bs = this;
}
