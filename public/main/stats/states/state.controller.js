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
    function(response) {
      bs.wilayat = response.data;
      bs.wilaya = bs.wilayat[id];
      console.log(bs.wilaya);
    })
  .catch( function(error) {
    console.log(error)
  });
}
