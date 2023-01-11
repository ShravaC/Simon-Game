var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
//alert(buttonColours[1]);

$(document).keypress(function(){
  nextSequence();
});

function nextSequence()
{
  userClickedPattern=[];
  $("h1").html("level "+level);
  var RandomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[RandomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level=level+1;
}


function playSound(audio1){
  var audio = new Audio("sounds/"+audio1+".mp3");
  audio.play();
}

function animateClick(chosenColour)
{
  $("#"+chosenColour).addClass("pressed");
setTimeout(function() {
  //your code to be executed after 1 second
  $("#"+chosenColour).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
  {
    console.log("success");
    if(gamePattern.length===userClickedPattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over, Press Any Key to Restart.");
    level=0;
    gamePattern = [];
  }
}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animateClick(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
