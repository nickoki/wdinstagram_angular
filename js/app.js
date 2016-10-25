"use strict";

// Note: function wrapped in an IFEE (Immediately Invoked Function Expression)
(function() {

  angular
    .module("wdinstagram", [
      "ui.router",
      "ngResource"
    ])
    .config([
      "$stateProvider",
      RouterFunction
    ])
    .factory("InstaFactory", [
      "$resource",
      InstaFactoryFunction
    ])
    .controller("InstaIndexController", [
      "InstaFactory",
      InstaIndexControllerFunction
    ])
    .controller("InstaShowController", [
      "InstaFactory",
      "$stateParams",
      InstaShowControllerFunction
    ]);



  // Factory Function
  function InstaFactoryFunction($resource) {
    return $resource("http://localhost:3000/entries/:id", {}, {
      update: { method: "PUT" }
    })
  }

  // Controller Functions
  function InstaIndexControllerFunction(InstaFactory) {
    this.posts = InstaFactory.query()
  }

  function InstaShowControllerFunction(InstaFactory, $stateParams) {
    console.log("POSTS");
    this.post = InstaFactory.get({id: $stateParams.id})
  }



  // Router
  function RouterFunction($stateProvider) {
    $stateProvider
    .state("instaIndex", {
      url: "/",
      templateUrl: "js/ng-views/index.html",
      controller: "InstaIndexController",
      controllerAs: "vm"
    })
    .state("instaShow", {
      url: "/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "InstaShowController",
      controllerAs: "vm"
    })
  };

})(); // close IFEE
