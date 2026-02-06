const gameColors = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;
let started = false;
let firstTime = true;

$(document).on("keydown", function(event){
  if(started === true){
    return;
  }
  else if(started === false && firstTime === true ){
    if(event.key === "a"){
      started = true;
      firstTime = false;
      nextSequence();
    }
  }
  else if(started === false && firstTime === false){
    started = true;
    nextSequence();
  }
});

$(".btn").on("click", function(){
    if(started === false){
      return;
    }
    var buttonID = $(this).attr("id");
    userPattern.push(buttonID);
   
    animatePress(buttonID);
  
    sound(buttonID);

    checkAnswer(userPattern.length-1);


  })

function nextSequence(){
  level++;
  $("h1").text("level " + level);
  userPattern = [];
  var newColor = Math.floor(Math.random()*gameColors.length);
  var selectedColor = gameColors[newColor];
  gamePattern.push(selectedColor);
  $("#" + selectedColor).fadeOut(100).fadeIn(100);
  new Audio("sounds/" + selectedColor + ".mp3").play();
}

function checkAnswer(currentIndex){
  if(gamePattern[currentIndex] === userPattern[currentIndex]){
    if(gamePattern.length === userPattern.length){
      setTimeout(() => {
        nextSequence();
      },1000); 
    }
  }
  else{
    $("h1").text("Game Over,Press Any Key to Restart");
    gameOver();
    startOver();
  }
}

function gameOver(){
  $("body").addClass("game-over");
  setTimeout(() =>{
    $("body").removeClass("game-over");
  },1000);
  new Audio("sounds/" + "wrong" + ".mp3").play();

}

function animatePress(buttonID){
  $("#" + buttonID).addClass("pressed");
  setTimeout(() => {
    $("#" + buttonID).removeClass("pressed");
  },100);
}

function sound(buttonID){
  new Audio("sounds/" + buttonID + ".mp3").play();
}

function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}

