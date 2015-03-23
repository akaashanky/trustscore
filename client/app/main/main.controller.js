'use strict';

angular.module('turboscoreApp')
  .controller('MainCtrl', function ($scope, $http, $modal, $location, $anchorScroll) {
    $scope.awesomeThings = [];
    $scope.loanValue = 15000;

    $scope.gotoSection = function(sectionId){
      $location.hash(sectionId);
      $anchorScroll();
    };

    $scope.faqs = [
    {
      question: 'Do you look into my credit score for this?',
      answer: 'No. Our application process does not check your credit score when finding the best loan for you. We ask you for your credit score only for informational purposes.'
    },
    {
      question: 'How much does it cost for me to use TrustCred?',
      answer: 'We don\'t charge you for using our matching service. If you decide to use one of the provided loan options, you will be responsible for any interest or fees charged by the provider.' 
    },
    {
      question: 'Is TrustCred a direct lender?',
      answer: 'No. TrustCred is not a lender. We are just a convenient way for loan-seekers to find the right loans for them.'
    }];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          loanDetails: function () {
            var loanDetails = {};
            loanDetails.loanValue=$scope.loanValue;
            loanDetails.loanPurpose=$scope.loanPurpose;
            loanDetails.creditScore=$scope.creditScore;
            return loanDetails;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    };



  });

angular.module('turboscoreApp').controller('ModalInstanceCtrl', function ($scope, $http, $modalInstance, Signup, loanDetails) {



  $scope.ok = function () {

    var signup = new Signup();
    signup.name = $scope.newSignup.name;
    signup.email = $scope.newSignup.email;
    signup.loanAmount = loanDetails.loanValue;
    signup.loanPurpose = loanDetails.loanPurpose;
    signup.creditScore = loanDetails.creditScore;

    Signup.save(signup, function(){
      $modalInstance.close();
    });

    
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
