angular.module("app", []).controller("TStagingController", function ($scope) {

    $scope.tumor = {t: ''};
    $scope.doi = {d: ''};
    $scope.other = {o: ''};
    $scope.radio = {r: ''};
    $scope.primaryTumor = {pt: ''};
    $scope.showOtherOption = false;

    $scope.nodes = {n: ''};
    $scope.otherNode = {o: ''};
    $scope.radioNode = {r: ''};
    $scope.selcMetastasisOption = {s: 'single'};
    $scope.regionalLymphNodes = {ln: ''};
    $scope.showOtherNodeOption = false;
    $scope.eneLabel = {e: 'ene(-)'};
    $scope.ene = {e: ''};

    $scope.radioMetastasis = {r: ''};

    $scope.cancerStage = {c: ''};
    $scope.showCancerStagePanel = false;

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

    $scope.onChangeRadio = function (other) {
      if (($scope.primaryTumor.pt && $scope.regionalLymphNodes.ln && $scope.radioMetastasis.r)
        || ($scope.radio.r && $scope.radioNode.r && $scope.radioMetastasis.r)
        || $scope.regionalLymphNodes.ln == 'N3b'
        || $scope.radioMetastasis.r == 'M1') {
        $scope.findCancerStage();
      }
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

      if (($scope.primaryTumor.pt && $scope.regionalLymphNodes.ln && $scope.radioMetastasis.r)
        || ($scope.radio.r && $scope.radioNode.r && $scope.radioMetastasis.r)
        || $scope.regionalLymphNodes.ln == 'N3b'
        || $scope.radioMetastasis.r == 'M1') {
        $scope.findCancerStage();
      }
    };

    $scope.onChangeLymphNode = function (n) {
      $scope.node = n;
      $scope.getLymphNode();
    };

    $scope.onChangeMetastasisOption = function (mo) {
      $scope.slecM = mo;

      if ($scope.nodes.n && $scope.eneLabel.e)
        $scope.getLymphNode();
      else
        $scope.regionalLymphNodes = {ln: ''};

      if ($scope.eneLabel.e == 'ene(+)' && ($scope.selcMetastasisOption.s == 'multiple' || $scope.selcMetastasisOption.s == 'contralateralM' || $scope.selcMetastasisOption.s == 'bilateralM'))
        $scope.regionalLymphNodes.ln = 'N3b';
    };

    $scope.onChangeENE = function (ene) {
      if (ene)
        $scope.eneLabel = {e: 'ene(+)'};
      else
        $scope.eneLabel = {e: 'ene(-)'};

      if ($scope.nodes.n && $scope.eneLabel.e)
        $scope.getLymphNode();
      else
        $scope.regionalLymphNodes = {ln: ''};

      if ($scope.eneLabel.e == 'ene(+)' && ($scope.selcMetastasisOption.s == 'multiple' || $scope.selcMetastasisOption.s == 'contralateralM' || $scope.selcMetastasisOption.s == 'bilateralM'))
        $scope.regionalLymphNodes.ln = 'N3b';

    };

    $scope.onChangeOtherNode = function (other) {
      if (other == 1) {
        $scope.showOtherNodeOption = true;
        $scope.nodes = {n: ''};
        $scope.regionalLymphNodes = {ln: ''};
        $scope.radioNode = {r: ''};
        $scope.eneLabel = {e: 'ene(-)'};
        $scope.nNotFound = '';
      }
      else
        $scope.showOtherNodeOption = false;
    };

    $scope.getLymphNode = function () {
      if ($scope.node.n <= 3 && $scope.eneLabel.e == 'ene(-)' && $scope.selcMetastasisOption.s == 'single')
        $scope.regionalLymphNodes.ln = 'N1';
      else if ($scope.node.n <= 3 && $scope.eneLabel.e == 'ene(+)' && $scope.selcMetastasisOption.s == 'single' ||
        ($scope.node.n > 3 && $scope.node.n < 6 && $scope.eneLabel.e == 'ene(-)' && $scope.selcMetastasisOption.s == 'single'))
        $scope.regionalLymphNodes.ln = 'N2a';
      else if ($scope.node.n <= 6 && $scope.eneLabel.e == 'ene(-)' && $scope.selcMetastasisOption.s == 'multiple')
        $scope.regionalLymphNodes.ln = 'N2b';
      else if ($scope.node.n <= 6 && $scope.eneLabel.e == 'ene(-)' && $scope.selcMetastasisOption.s == 'bilateral'
        || ( $scope.node.n <= 6 && $scope.eneLabel.e == 'ene(-)' && $scope.selcMetastasisOption.s == 'contralateral'))
        $scope.regionalLymphNodes.ln = 'N2c';
      else if ($scope.node.n > 6 && $scope.eneLabel.e == 'ene(-)')
        $scope.regionalLymphNodes.ln = 'N3a';
      else if ($scope.node.n > 3 && $scope.eneLabel.e == 'ene(+)' && $scope.selcMetastasisOption.s == 'single' ||
        ($scope.eneLabel.e == 'ene(+)' && $scope.selcMetastasisOption.s == 'multiple') ||
        ($scope.eneLabel.e == 'ene(+)' && $scope.selcMetastasisOption.s == 'contralateralM') ||
        ($scope.eneLabel.e == 'ene(+)' && $scope.selcMetastasisOption.s == 'bilateralM') ||
        ($scope.eneLabel.e == 'ene(+)' && $scope.selcMetastasisOption.s == 'contralateral')
      )
        $scope.regionalLymphNodes.ln = 'N3b';
      else {
        $scope.regionalLymphNodes.ln = 'N1, N2 , N3 not found: Please Select Other';
        $scope.nNotFound = 'N1, N2 , N3 not found: Please select following option';
        $scope.showOtherNodeOption = true;
      }

      if (($scope.primaryTumor.pt && $scope.regionalLymphNodes.ln && $scope.radioMetastasis.r)
        || ($scope.radio.r && $scope.radioNode.r && $scope.radioMetastasis.r)
        || $scope.regionalLymphNodes.ln == 'N3b'
        || $scope.radioMetastasis.r == 'M1') {
        $scope.findCancerStage();
      }
    };

    $scope.onChangeMetastasis = function () {
      if (($scope.primaryTumor.pt && $scope.regionalLymphNodes.ln && $scope.radioMetastasis.r)
        || ($scope.radio.r && $scope.radioNode.r && $scope.radioMetastasis.r)
        || $scope.regionalLymphNodes.ln == 'N3b'
        || $scope.radioMetastasis.r == 'M1') {
        $scope.findCancerStage();
      }
    };

    $scope.findCancerStage = function () {

      if (($scope.primaryTumor.pt && $scope.regionalLymphNodes.ln && $scope.radioMetastasis.r)
        || ($scope.radio.r && $scope.radioNode.r && $scope.radioMetastasis.r)
        || $scope.regionalLymphNodes.ln == 'N3b'
        || $scope.radioMetastasis.r == 'M1') {
        $scope.showCancerStagePanel = true;

        if ($scope.radio.r == 'Tis' && $scope.radioNode.r == 'N0' && $scope.radioMetastasis.r == 'M0')
          $scope.cancerStage.c = 'Stage 0';
        else if ($scope.primaryTumor.pt == 'T1' && $scope.radioNode.r == 'N0' && $scope.radioMetastasis.r == 'M0')
          $scope.cancerStage.c = 'Stage I';
        else if ($scope.primaryTumor.pt == 'T2' && $scope.radioNode.r == 'N0' && $scope.radioMetastasis.r == 'M0')
          $scope.cancerStage.c = 'Stage II';
        else if ($scope.primaryTumor.pt == 'T3' && $scope.radioNode.r == 'N0' && $scope.radioMetastasis.r == 'M0')
          $scope.cancerStage.c = 'Stage III';
        else if (($scope.primaryTumor.pt == 'T1' || $scope.primaryTumor.pt == 'T2' || $scope.primaryTumor.pt == 'T3') && $scope.regionalLymphNodes.ln == 'N1' && $scope.radioMetastasis.r == 'M0')
          $scope.cancerStage.c = 'Stage III';
        else if (($scope.primaryTumor.pt == 'T1' || $scope.primaryTumor.pt == 'T2' || $scope.primaryTumor.pt == 'T3') && $scope.radioNode.r == 'N1' && $scope.radioMetastasis.r == 'M0')
          $scope.cancerStage.c = 'Stage III';
        else if (($scope.radio.r == 'T4a' && ($scope.regionalLymphNodes.ln == 'N1' || $scope.radioNode.r == 'N0') && $scope.radioMetastasis.r == 'M0')
          || (($scope.radio.r == 'T4a' || $scope.primaryTumor.pt == 'T1' || $scope.primaryTumor.pt == 'T2' || $scope.primaryTumor.pt == 'T3') && ($scope.regionalLymphNodes.ln == 'N2a' || $scope.regionalLymphNodes.ln == 'N2b'
          || $scope.regionalLymphNodes.ln == 'N2c') && $scope.radioMetastasis.r == 'M0'))
          $scope.cancerStage.c = 'Stage IVA';
        else if ((($scope.regionalLymphNodes.ln == 'N3a' || $scope.regionalLymphNodes.ln == 'N3b') && $scope.radioMetastasis.r == 'M0') ||
          ($scope.radio.r == 'T4b') && $scope.radioMetastasis.r == 'M0')
          $scope.cancerStage.c = 'Stage IVB';
        else if ($scope.radioMetastasis.r == 'M1')
          $scope.cancerStage.c = 'Stage IVC';
        else
          $scope.cancerStage.c = 'No Idea , please Help.... ';
      }
    };

    $scope.reset = function () {
      $scope.tumor = {t: ''};
      $scope.doi = {d: ''};
      $scope.other = {o: ''};
      $scope.radio = {r: ''};
      $scope.primaryTumor = {pt: ''};
      $scope.showOtherOption = false;

      $scope.nodes = {n: ''};
      $scope.otherNode = {o: ''};
      $scope.radioNode = {r: ''};
      $scope.selcMetastasisOption = {s: 'single'};
      $scope.regionalLymphNodes = {ln: ''};
      $scope.showOtherNodeOption = false;
      $scope.eneLabel = {e: 'ene(-)'};
      $scope.ene = {e: ''};

      $scope.radioMetastasis = {r: ''};

      $scope.cancerStage = {c: ''};
      $scope.showCancerStagePanel = false;
    };

    /*$scope.regionalLymphNodes.ln == 'N1' || $scope.radioNode.r == 'N0'
     if (($scope.primaryTumor.pt && $scope.regionalLymphNodes.ln && $scope.radioMetastasis.r) || ($scope.radio.r && $scope.radioNode.r && $scope.radioMetastasis.r))
     $scope.findCancerStage();
     */
    ////////////////////
    /*
     $scope.onChangeDistantMetastasis = function (m) {
     if (m)
     $scope.radioMetastasis = {r: 'M1'};
     else
     $scope.radioMetastasis = {r: 'M0'};

     $scope.getLymphNode(); ///////////////

     /!*    if ($scope.tumor.t && $scope.doi.d || $scope.tumor.t > 4 || $scope.doi.d > 10 && $scope.doi.d < 20)
     $scope.getLymphNode();
     else
     $scope.regionalLymphNodes = {ln: ''};*!/
     };
     */

    $scope.alertBtnClick = function () {
      alert('We can show detail of Tss in dialogbox when click the button....');
    };

  }
);

// T1 Tumor ≤ 2 cm,  ≤ 5 mm depth of invasion (DOI)

// T2:Tumor ≤ 2 cm, DOI > 5 mm and ≤ 10 mm;or tumor > 2 cm but ≤ 4 cm, and DOI ≤ 10 mm

// T3: Tumor > 4 cm; or any tumor with DOI > 10 mm but ≤ 20 mm


/* N3
 Metastasis in a lymph node > 6 cm in greatest dimension and ENE (-);

 or in a single ipsilateral node > 3 cm in greatest dimension and ENE (+);

 or multiple ipsilateral, contralateral, or bilateral nodes, any with ENE (+);

 or a single contralateral node of any size and ENE (+)*/