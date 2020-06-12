/*************************************  Global Variables Beginning ***************************************/

var category;
var difficulty;
var questions;

/*************************************  Global Variables Ending *************************************************/

/*************************************  Buttons Event Listeners Beginning ***************************************/

$("#user_page_nextBtn").click(function(){
    if($("#userName").val() == ""){
        $("#userName").css("border","1px solid red")
    }else{
        changeScreen()
    }
});

$("#category_page_nextBtn").click(changeScreen);

// Selecting a category for trivia and saving on variable "category"
$(".category_page_selectBtn").click( () => {
    category = $(event.target).attr("value");
    console.log(category)
});

$("#difficulty_page_nextBtn").click( () => {
    requestAPI()
    changeScreen();
});

// Selecting a difficulty and saving on a variable "difficulty"
$("#difficulty_page_select").change( () => {
    difficulty = $(event.target).val();
    console.log(difficulty)

});

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
    } else if($("#question_page").is(":visible") && isGameOver) { //check if game is over to change to GameOver screen
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
    // Saving correct with incorrect answers to shuffle them
    let answers = [questions[0].correct_answer, questions[0].incorrect_answers[0], questions[0].incorrect_answers[1], questions[0].incorrect_answers[2]];
    answers.sort(() => Math.random() - 0.5);
    $("#question").text(questions[0].question);
    $("#answers").append($("<ul>").append(
        $("<li>").text(answers[0]).click(checkAnswer),
        $("<li>").text(answers[1]).click(checkAnswer),
        $("<li>").text(answers[2]).click(checkAnswer),
        $("<li>").text(answers[3]).click(checkAnswer)
    ));
    $("li:contains("+questions[0].correct_answer+")").data("correct",true);
    questions.shift();
}

checkAnswer() {
    console.log($(event.target).text());
}