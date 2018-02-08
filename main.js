var app = angular.module("TicTacToe", []);

app.controller("MainCtrl", function($timeout){
  var self = this;
  self.player = "";
  self.computer = "";
  self.filteredArray = [1,2,3,4,5,6,7,8,9];
  self.winCheckArray =[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
  self.xArray = [];
  self.oArray = [];
  self.xoArray = new Array(10);
  self.drawCheckArray = [];
  self.game = 1;
  self.count = 3;
  self.winMessage = "";
  var newArray1 = [];
  var newArray2 = [];
  var newArray3 = [];
  self.gameChoiceMsg = true;
  self.charChoiceMsg = false;
  self.headerMsg = false;
  
  self.resetGame = function(){
    self.player = "";
    self.computer = "";
    self.filteredArray = [1,2,3,4,5,6,7,8,9];
    self.xArray = [];
    self.oArray = [];
    self.drawCheckArray = [];
    self.game = 1;
    self.count = 3;
    newArray1 = [];
    newArray2 = [];
    newArray3 = [];
    self.charChoiceMsg = false;
    self.headerMsg = false;
  }
  
  self.chooseGame = function(a){
    self.game = a;
    self.gameChoiceMsg = false;
    if(a === 2){
      self.count = 1;
      self.headerMsg = true;
    } else {
      self.charChoiceMsg = true;
    }
  }
  
  self.chooseChar = function(a){
    self.count = a;
    self.charChoiceMsg = false;
    self.headerMsg = true;
    if(a === 2){
      $timeout(self.computerPlay("X", self.xArray), 3000);
    }
  }
  
  self.checkWin = function(array, player, temp){
    for(var i = 0; i < self.winCheckArray.length; i++){
      for(var j = 0; j < 3; j++){
        for(var k = 0; k < array.length; k++)
          if(self.winCheckArray[i][j] === array[k] && temp.indexOf(self.winCheckArray[i][j]) === -1){
             temp.push(array[k]);
          }
       }
      if(temp.length === 3){
        self.winMessage = player + " wins!";
        self.resetGame();
        $timeout(function(){
          self.winMessage = "";
          self.gameChoiceMsg = true;
          self.xoArray = new Array(10);
        }, 3000);
        break;
      } else {
        temp = [];
      }
    }
    if(self.drawCheckArray.length === 9){
      self.winMessage = "It was a draw!";
      self.resetGame();
      $timeout(function(){
        self.winMessage = "";
        self.gameChoiceMsg = true;
        self.xoArray = new Array(10);
      }, 3000); 
    }
    
  }
  
  self.playerPlay = function(a, b, array, newArray){
    self.player = b;
    self.xoArray[a] = b;
    array.push(a);
    self.drawCheckArray.push(a);
      for(var i = 0; i < self.filteredArray.length; i++){
        if(self.filteredArray[i] === a){
          self.filteredArray.splice(i,1);
        } 
      }
      self.checkWin(array, b, newArray);
  }
    
  self.computerPlay = function(a, array){
    $timeout(function(){
      var randomNum = Math.floor(Math.random() * self.filteredArray.length);
      self.xoArray[self.filteredArray[randomNum]] = a;
      self.computer = a;
      array.push(self.filteredArray[randomNum]);
      self.drawCheckArray.push(self.filteredArray[randomNum]);
      for(var i = 0; i < self.filteredArray.length; i++){
        if(self.filteredArray[i] === self.filteredArray[randomNum]){
          self.filteredArray.splice(i,1);
        } 
      }
      self.checkWin(array, a, newArray3);
    }, 500);
  }
  
  self.addContent = function(num){
    if(self.count === 2){
      if(self.filteredArray.indexOf(num) !== -1 && self.winMessage === ""){
        self.playerPlay(num, "O", self.oArray, newArray2);
        if(self.winMessage === ""){
          if(self.game === 1){
            self.computerPlay("X", self.xArray);
          } else {
            self.count = 1;
          } 
        }
      } 
    } else if(self.count === 1){
        if(self.filteredArray.indexOf(num) !== -1 && self.winMessage === ""){
          self.playerPlay(num, "X", self.xArray, newArray1);
        if(self.winMessage === ""){
          if(self.game === 1){
            self.computerPlay("O", self.oArray);
          } else {
            self.count = 2;
          }  
        }  
      }
    }
  }
})