/*************************************  Global Variables Beginning ***************************************/

var category = undefined;
var difficulty;
var questions;
var score = 0;
var lifes = 3;

/*************************************  Global Variables Ending *************************************************/

/*************************************  Buttons Event Listeners Beginning ***************************************/

$("#user_page_nextBtn").click(function(){
    if($("#userName").val() == "" || $("#userName").val().includes(" ")){
        $("#userName").css("border","1px solid red");
    }else{
        changeScreen();
    }
});

$("#category_page_nextBtn").click(function(){
    if(category == undefined) {
        $("#category_page").append("<p>Please select a category</p>")
    } else {
        changeScreen();
    }
});

// Selecting a category for trivia and saving on variable "category"
$(".category_page_selectBtn").click( () => {
    category = $(event.target).attr("data-category");
    console.log(category)
});

$("#difficulty_page_nextBtn").click( () => {
    if($("#difficulty_page_select").val() == "") {
        $("#difficulty_page_select").css("border","1px solid red");
    } else {
        requestAPI()
        changeScreen();
    }
});

// Selecting a difficulty and saving on a variable "difficulty"
$("#difficulty_page_select").change( () => {
    difficulty = $(event.target).val();
    console.log(difficulty)

});

$("#btn_tryAgain").click(function(){
    resetGame()
    changeScreen()
})

/*************************************  Buttons Event Listeners Ending ***************************************/

// Changing screens for user navigation
function changeScreen() {
    if($("#user_page").is(":visible")) {
        $("#user_page").slideToggle("slow");
        $("#category_page").slideToggle("slow");
    } else if($("#category_page").is(":visible")) {
        $("#category_page").slideToggle("slow");
        $("#dificulty_page").slideToggle("slow");
    } else if($("#dificulty_page").is(":visible")) {
        $("#dificulty_page").slideToggle("slow");
        $("#question_page").slideToggle("slow");
    } else if($("#question_page").is(":visible")) {
        $("#question_page").slideToggle("slow");
        $("#gameover_page").slideToggle("slow");
    } else if($("#gameover_page").is(":visible")) {
        $("#gameover_page").slideToggle("slow");
        $("#user_page").slideToggle("slow");
    }
}

// Request questions to API and save them to "questions" variable
function requestAPI() {
    axios.get("https://opentdb.com/api.php", {
        params :{
            amount: 10,
            category: category,
            difficulty: difficulty
        }
    }).then((response) => {
        questions = response.data.results;
        printQuestion();
    });
}

function printQuestion() {

    $("#answers").empty();
    countdown(difficulty)
    
    // Saving correct with incorrect answers to shuffle them
    let answers = [questions[0].correct_answer, questions[0].incorrect_answers[0], questions[0].incorrect_answers[1], questions[0].incorrect_answers[2]];
    answers.sort(() => Math.random() - 0.5);
    // Updating question's title
    $("#question").text(questions[0].question);
    // Appending all the answers
    $("#answers").append($("<ul>").append(
        $("<li>").text(answers[0]).click(checkAnswer),
        $("<li>").text(answers[1]).click(checkAnswer),
        $("<li>").text(answers[2]).click(checkAnswer),
        $("<li>").text(answers[3]).click(checkAnswer)
    ));
    // Setting data="correct" for the correct answer
    $("li:contains("+questions[0].correct_answer+")").data("correct",true);
    // Excluding the printed question from the "questions" array
    questions.shift();
}

function checkAnswer() {
    
    clearInterval(downloadTimer)
    if ($(event.target).data("correct") == true) {
        console.log("Correct Answer!!!");
        score += 10;
    } else {
        console.log("Incorrect Answer!!!");
        lifes--;
        checkGameOver();
    }
    if (!isGameOver) {
        if (questions.length > 0) {
            // Shows the next question
            printQuestion();
        } else {
            // Makes a new request if player answered all the first 10 questions
            requestAPI();
        }
    }
}

function checkGameOver() {
    if (lifes == 0) {
        isGameOver = true;
        let user = {"name":$("#userName").val(), "score":score, "difficulty":difficulty};
        saveLocalStorage(user)
        showRanking();
        changeScreen();
    }
}

function showRanking() {
    $("#player_score").text("Your Score: "+score);

    let topEasy = [];
    let topMedium = [];
    let topHard = [];
    let countEasy = 0;
    let countMedium = 0;
    let countHard = 0;
    let arr = JSON.parse(localStorage.getItem('User'));
    arr.sort(compare);
    console.log(arr);
    for(i = 0; i < arr.length; i++) {
        if (arr[i].difficulty == "easy") {
            if (countEasy < 3) {
                topEasy[countEasy] = arr[i];
                countEasy++;
            }
        }
        if (arr[i].difficulty == "medium") {
            if (countMedium < 3) {
                topMedium[countMedium] = arr[i];
                countMedium++;
            }
        }
        if (arr[i].difficulty == "hard") {
            if (countHard < 3) {
                topHard[countHard] = arr[i];
                countHard++;
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        if (topEasy[i] != undefined) {
            $("#rank"+i+"E").text(topEasy[i].name + " - Score: " + topEasy[i].score);
        } else {
            $("#rank"+i+"E").text("-");
        }
        if (topMedium[i] != undefined) {
            $("#rank"+i+"M").text(topMedium[i].name + " - Score: " + topMedium[i].score);
        } else {
            $("#rank"+i+"M").text("-");
        }
        if (topHard[i] != undefined) {
            $("#rank"+i+"H").text(topHard[i].name + " - Score: " + topHard[i].score);
        } else {
            $("#rank"+i+"H").text("-");
        }
    }

}

function compare(a, b) {
    let comparison = 0;
    if (a.score > b.score) {
        comparison = 1;
    } else if (a.score < b.score) {
        comparison = -1;
    }
    return comparison * -1;
}
function resetGame(){
    $("input[type=text]").val("");
    $("select").val("");
    questions = [];
    category = undefined;
    score = 0;
    lifes = 3;
    isGameOver= false
}