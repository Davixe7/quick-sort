angular.module("quickSortApp", []).
controller("mainController", function($scope){
  
  $scope.numbers = [];
  $scope.newNumber = 1;
  
  $scope.message = {
    text:"Añade numeros al arreglo",
    status:"success",
  };
  
  $scope.numbersValidate = function(){
    return $scope.numbers.length >= 2;
  }
  
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
  
  $scope.quickSort = function(a){
    if( a.length <= 1 ) return a[0];
    
    var left = [], right = [], pivot = a[0];
    
    for (var i = 1; i <= a.length - 1 ; i++) {
      if( a[i] != undefined ){
        ( a[i] < pivot ) ? left.push(a[i]) : right.push(a[i]);
      }
    }
    
    if(!left.length) {
      return [pivot, $scope.quickSort(right)];
    }else if(!right.length) {
      return [$scope.quickSort(left), pivot];
    }
    
    return [$scope.quickSort(left), pivot, $scope.quickSort(right)];
  }
  
  $scope.mergeSort = function(items){
    if (items.length < 2) {
      return items;
    }
    var middle = Math.floor(items.length / 2),
      left    = items.slice(0, middle),
      right   = items.slice(middle),
      params = $scope.merge($scope.mergeSort(left), $scope.mergeSort(right));

    // Add the arguments to replace everything between 0 and last item in the array
    params.unshift(0, items.length);
    items.splice.apply(items, params);
    return items;
  }
  
  $scope.merge = function (left, right){
    var result  = [],
    il = 0,
    ir = 0;

    while (il < left.length && ir < right.length){
      if( left[il] < right[ir] ){
        result.push( left[il++] );
      } else {
        result.push( right[ir++] );
      }
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
  }
  
  $scope.doQuickSort = function(){
    $scope.numbers = $scope.quickSort( $scope.numbers ).join().split(",").map(Number);;
  }
  
  $scope.doMergeSort = function(){
    $scope.numbers = $scope.mergeSort( $scope.numbers );
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