angular.module("maison").controller("WillayatController", WillayatController);

function WillayatController($http, $routeParams) {
  var bs = this;
  bs.loading = false;
  bs.error = false;

  // Most be 48 wilayas but the API output gave only 47 wilayas.
  if ($routeParams.id >= 46) {
    // console.log("error");

    bs.message = "Désolés, la wilaya que vous avez demandée est introuvable.";
    bs.loading = false;
    return (bs.error = true);
  }
  var id = $routeParams.id;

  bs.title = "Willaya stats";
  console.log(id);

  async function fetchWilayaCases() {
    bs.loading = true;
    await $http
      .get("https://covid19-api-algeria.herokuapp.com/v1/cases/wilayas")
      .then(function (response) {
        // console.log(response.data, "data");
        bs.wilayat = response.data;

        bs.wilaya = bs.wilayat[id];
        bs.confirmed = bs.wilaya.cases;
        bs.deaths = bs.wilaya.deaths;
        bs.recovered = bs.wilaya.recovered;
        bs.loading = false;
      })
      .catch(function (error) {
        if (error) {
          bs.error = true;
          bs.message =
            "Un problème s'est produit lors du chargement, réessayer dans un instant.";
          return (bs.loading = false);
        }
      });
  }

  fetchWilayaCases();
}
