var triviaQuestions = [{
    question: 'Which year was the first Wimbeldon played?',
    answerList: ["1939", "1950", "1924", "1940"],
    answer: 2
},

{
    question: "When was the first men's singles champion crowned?",
    answerList: ["1901", "1850", "1877", "1920"],
    answer: 2

},
{
    question: "In 1959, Maria Bueno became the first woman from which country to win the singles title at Wimbledon?",
    answerList: ["USA", "Spain", "Austria", "Brazil"],
    answer: 3

}

];

$('#startOverBtn').hide();
var score = 0;
var incorrectAnswer = 0;
var currentQuestion = 0;
var message = ['Correct Answer' , ' Sorry! Wrong Answer','Time Up!'];
var userSelect;
var answered = false;
var unanswered=0;

$("#startBtn").on("click", newGame);
$("#startOverBtn").on("click", load);

function newGame() {

    $(".question").empty();
    $(".answerList").empty();
    $("#message").empty();
    $("#correctedAnswer").empty();
    $('#startOverBtn').hide();
    $('#startBtn').hide();
    $('#startImage').empty();

   

    
    if (currentQuestion === (triviaQuestions.length)) {
        setTimeout(finalScore, 1000)
    }

    else{
        $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for (i = 0; i < triviaQuestions[currentQuestion].answerList.length; i++) {
        var choice = $("<div>");
        choice.text(triviaQuestions[currentQuestion].answerList[i]);
        $(".answerList").append(choice);
        choice.addClass('userChoice');
        choice.addClass('font-weight-light');
        choice.attr({ 'data-number': i });

    }
    countdown();
    $(".userChoice").on("click", function () {
        userSelect = $(this).data('number');
        answered = true;
        clearInterval(time);
        answerLoad();
    })
}
}


var answerLoad = function () {
    $(".question").empty();
    $(".answerList").empty();
     $('#timeLeft').empty();
     

    if (userSelect == triviaQuestions[currentQuestion].answer && answered == true) {
       // alert(triviaQuestions[currentQuestion].answerList[userSelect]);
       
        $("#message").html( '<div class="alert alert-success" role="alert">' +message[0]+ '</div>');
        score++;

    }

    else if (userSelect != triviaQuestions[currentQuestion].answer && answered == true)
    {
        $("#message").html( '<div class="alert alert-danger" role="alert">' +message[1]+ '</div>');
        var theAnswer = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        $("#correctedAnswer").text("The correct answer is "+ theAnswer);
        incorrectAnswer++;
    }

    else if (answered == false)
    {
        $("#message").html( '<div class="alert alert-warning" role="alert">' +message[2]+ '</div>');
        var theAnswer = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        $("#correctedAnswer").text("The correct answer is "+ theAnswer);
        unanswered++;
    }

  
        setTimeout(newGame, 3000);
    
     currentQuestion++;
    // console.log("Current Question: "+ currentQuestion);
    // setInterval(newGame,4000);
}



function countdown() {
    seconds = 5;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerLoad();
    }
}

function finalScore() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    $('#startOverBtn').show();
   // $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + score);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}

function load()
{
    location.reload();
}