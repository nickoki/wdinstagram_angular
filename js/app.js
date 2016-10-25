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
    .controller("InstaNewController", [
      "InstaFactory",
      "$state",
      InstaNewControllerFunction
    ])
    .controller("InstaShowController", [
      "InstaFactory",
      "$stateParams",
      InstaShowControllerFunction
    ])
    .controller("InstaEditController", [
      "InstaFactory",
      "$stateParams",
      "$state",
      InstaEditControllerFunction
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

  function InstaNewControllerFunction(InstaFactory, $state) {
    this.post = new InstaFactory()
    this.create = function() {
      this.post.$save().then(function(post) {
        $state.go("instaShow", {id: post.id})
      })
    }
  }

  function InstaShowControllerFunction(InstaFactory, $stateParams) {
    this.post = InstaFactory.get({id: $stateParams.id})
  }

  function InstaEditControllerFunction(InstaFactory, $stateParams, $state) {
    this.post = InstaFactory.get({id: $stateParams.id})
    this.update = function() {
      this.post.$update({id: $stateParams.id}).then(function(post) {
        $state.go("instaShow", {id: post.id})
      })
    }
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
    .state("instaNew", {
      url: "/new",
      templateUrl: "js/ng-views/new.html",
      controller: "InstaNewController",
      controllerAs: "vm"
    })
    .state("instaShow", {
      url: "/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "InstaShowController",
      controllerAs: "vm"
    })
    .state("instaEdit", {
      url: "/:id/edit",
      templateUrl: "js/ng-views/edit.html",
      controller: "InstaEditController",
      controllerAs: "vm"
    })
  };

})(); // close IFEE
