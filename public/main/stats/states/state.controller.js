angular.module("maison").controller("WillayatController", WillayatController);

function WillayatController($http, $routeParams) {
  var bs = this;
  var errorMessage = 'error';
  var id = $routeParams.id - 1;

  bs.title = "Willaya stats";
  console.log(id);

  $http
    .get("https://covid19dz.openalgeria.org/api/v1/wilayas")
    .then(
      function (response) {
        bs.wilayat = response.data;
        bs.wilaya = bs.wilayat[id];
        console.log(bs.wilaya);

        bs.confirmed = bs.wilaya.confirmed;
        bs.actives = bs.wilaya.actives;
        bs.deaths = bs.wilaya.deaths;
        bs.recovered = bs.wilaya.recovered;
        bs.newCases = bs.wilaya.new_cases;
        bs.newDeathCases = bs.wilaya.new_cases_death;

      })
    .catch(function (error) {
      console.log(error)
    });
}