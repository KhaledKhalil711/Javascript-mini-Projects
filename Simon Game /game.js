var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern =[]
var gameStarted = false;
var level = 0;

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);


});

$(document).keypress(function () {
    if (!gameStarted){
        $("#level-title").text("level " + level);
        nextSequence();


        gameStarted = true;
    }
})



function nextSequence(){
    userClickedPattern =[];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor( Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


}


function playSound(name){
    var userSound = new Audio ("sounds/" + name + ".mp3");
    userSound.play();
}
function animatePress (currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){$("#" + currentColour).removeClass("pressed")}, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);

        }


    }else{
        playSound("wrong");
        $("h1").text("Game Over!! Press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        startOver();

    }


}
function startOver(){
    level = 0;
    gameStarted = false;
    gamePattern = [];
}