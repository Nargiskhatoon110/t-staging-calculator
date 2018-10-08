angular.module("app", []).controller("TStagingController", function ($scope) {

  $scope.tumor = {t: ''};
  $scope.doi = {d: ''};
  $scope.other = {o: ''};
  $scope.radio = {r: ''};
  $scope.primaryTumor = {pt: ''};
  $scope.showOtherOption = false;

  $scope.onChangeTSize = function (t) {
    $scope.tumor = t;
    if ($scope.tumor.t && $scope.doi.d || $scope.tumor.t > 4 || $scope.doi.d > 10 && $scope.doi.d < 20)
      $scope.getPrimaryTumor();
    else
      $scope.primaryTumor = {pt: ''};
  };

  $scope.onChangeDOI = function (doi) {
    $scope.doi = doi
    if ($scope.tumor.t && $scope.doi.d || $scope.tumor.t > 4 || $scope.doi.d > 10 && $scope.doi.d < 20)
      $scope.getPrimaryTumor();
    else
      $scope.primaryTumor = {pt: ''};
  };

  $scope.onChangeOther = function (other) {
    if (other == 1) {
      $scope.showOtherOption = true;
      $scope.tumor = {t: ''};
      $scope.doi = {d: ''};
      $scope.primaryTumor = {pt: ''};
      $scope.radio = {r: ''};
       $scope.tNotFound = '';
    }
    else
      $scope.showOtherOption = false;
  };

  $scope.getPrimaryTumor = function () {
    if ($scope.tumor.t <= 2 && $scope.doi.d <= 5)
      $scope.primaryTumor.pt = 'T1';
    else if ($scope.tumor.t <= 2 && ($scope.doi.d > 5 && $scope.doi.d <= 10) ||
      (($scope.tumor.t > 2 && $scope.tumor.t <= 4 ) && $scope.doi.d <= 10))
      $scope.primaryTumor.pt = 'T2';
    // else if ($scope.tumor.t > 4 && ($scope.doi.d > 10 && $scope.doi.d <= 20))
    else if ($scope.tumor.t > 4 || ($scope.doi.d > 10 && $scope.doi.d <= 20))
      $scope.primaryTumor.pt = 'T3';
    else {
      $scope.primaryTumor.pt = 'T1, T2, T3 not found: Please Select Other';
      $scope.tNotFound = 'T1, T2, T3 not found: Please select following option';
      $scope.showOtherOption = true;
      
    }
  };

  $scope.alertBtnClick = function () {
    alert('We can show detail of Tss in dialogbox when click the button....');
  };

});

// T1 Tumor ≤ 2 cm,  ≤ 5 mm depth of invasion (DOI)

// T2:Tumor ≤ 2 cm, DOI > 5 mm and ≤ 10 mm;or tumor > 2 cm but ≤ 4 cm, and DOI ≤ 10 mm

// T3: Tumor > 4 cm; or any tumor with DOI > 10 mm but ≤ 20 mm