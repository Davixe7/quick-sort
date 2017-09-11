angular.module("quickSortApp", []).
controller("mainController", function($scope){
  
  $scope.numbers = [];
  $scope.newNumber = 1;
  
  $scope.message = {
    text:"Application started!",
    status:"success",
    sloganSuccess : [
      "¡Genial!", "¡Eso es!", "¡Excelente!", "¡Muy bien!"
    ],
    sloganError : [
      "¡Oh, no!", "¡Error!", "¡Cuidado!", "¡Un momento!"
    ],
    getSlogan : function(){
      var slogan = "";
      
      if( this.status === "success" ){
        slogan = this.sloganSuccess[ Math.floor( Math.random() * ( this.sloganSuccess.length - 0 ) ) ];
      }else {
        slogan = this.sloganError[ Math.floor( Math.random() * ( this.sloganError.length - 0 ) ) ];
      }
      return slogan;
    }
  };
  
  $scope.addNumber = function(n) {
    if( $scope.numbers.indexOf(n) >= 0 ) { 
      $scope.setMessage("No se admiten numeros duplicados");
    }else if( isNaN( n ) ){
      
    }
    else{
      $scope.numbers.push(n);
      $scope.setMessage("Numero añadido!", "success");
    } 
  }
  
  $scope.order = function(a){
    if( a.length <= 1 ) return a[0];
    
    var left = [], right = [], pivot = a[0];
    
    for (var i = 1; i <= a.length - 1 ; i++) {
      if( a[i] != undefined ){
        ( a[i] < pivot ) ? left.push(a[i]) : right.push(a[i]);
      }
    }
    
    if(!left.length) {
      return [pivot, $scope.order(right)];
    }else if(!right.length) {
      return [$scope.order(left), pivot];
    }
    
    return [$scope.order(left), pivot, $scope.order(right)];
  }
  
  $scope.ordenar = function(){
    $scope.numbers = $scope.order( $scope.numbers ).join().split(",").map(Number);;
  }
  
  $scope.setMessage = function(msg, status){
    $scope.message.text = msg;
    $scope.message.status = (status) ? status : "warning";
  }
  
  $scope.removeNumber = function( n ){
    $scope.numbers = $scope.numbers.filter(function(number){
      return number !== n;
    });
  }
  
});