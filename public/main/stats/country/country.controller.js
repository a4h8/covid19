angular
  .module("maison")
  .controller("Macontroller", MaController)
  .config(function ($qProvider) {
    // HTTP ERR handler message
    $qProvider.errorOnUnhandledRejections(false);
  });

function MaController($http) {
  var bs = this;
  bs.error = false;
  bs.loading = false;
  bs.loadingWilaya = false;
  bs.title = "Tableau de bord de l'épidémie de virus COVID-19 en Algérie";
  bs.titleState = "Tous les wilayas";
  bs.countries = ["Algeria", "Morocco", "Tunisia"];

  var errorMessage =
    "Oups une erreur s'est produite lors de chargement de donnes veuillez ressayer plus-tard.";
  //    https://disease.sh/v2/countries

  function convertDate(date) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("fr-DZ", options);
  }

  async function fetchCountryCases() {
    bs.loading = true;
    // Fetch Covid-19 new cases stats
    await $http
      .get("https://covid19-api-algeria.herokuapp.com/v1/cases/new")
      .then(function (response) {
        // fetch Daily New Cases
        bs.totalNewConfirmedCases = response.data.confirmed;
        bs.totalNewRecoveredCases = response.data.recovered;
        bs.totalNewDeathCases = response.data.deaths;
        bs.totalNewActiveCases = response.data.infected;
      })
      .catch(function (error) {
        if (error) {
          bs.error = true;
          bs.message =
            "Un problème s'est produit lors du chargement, réessayer dans un instant.";
          return (bs.loading = false);
        }
      });

    // fetch Covid-19 all country cases
    await $http
      .get("https://covid19-api-algeria.herokuapp.com/v1/cases/all")
      .then(function (response) {
        bs.status = response.status;

        // Fetch All Data
        bs.country = response.data;

        // fetch Total Cases

        bs.totalConfirmedCases = response.data.confirmed;
        bs.totalRecoveredCases = response.data.recovered;
        bs.totalDeathCases = response.data.deaths;
        bs.totalActiveCases = response.data.infected;

        bs.lastUpdateDate = convertDate(response.data.date);
        bs.loading = false;
      })
      .catch((error) => {
        if (error) {
          bs.error = true;
          bs.message =
            "Un problème s'est produit lors du chargement, réessayer dans un instant.";
          return (bs.loading = false);
        }
      });

    // Fetch Covid-19 stats by willayat
    bs.loadingWilaya = true;
    await $http
      .get("https://covid19-api-algeria.herokuapp.com/v1/cases/wilayas")
      .then(function (response) {
        // console.log(response);
        bs.willayat = response.data;
        bs.loadingWilaya = false;
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

  fetchCountryCases();
}
