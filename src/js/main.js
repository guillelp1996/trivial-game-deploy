/*************************************  Global Variables Beginning ***************************************/

var category = undefined;
var difficulty;
var questions;
var score = 0;
var lifes = 3;
var isGameOver = false;
var downloadTimer;
var UserObj = {
    name: "player",
    score: 0
}
/*************************************  Global Variables Ending *************************************************/


/*************************************  Buttons Event Listeners Beginning ***************************************/

$("#user_page_nextBtn").click(function () {
    if ($("#userName").val() == "" || $("#userName").val().includes(" ")) {
        $("#userName").addClass("border-error");
    } else {
        changeScreen();
    }
});

$("#category_page_nextBtn").click(function () {
    $(".error-msg").removeClass("error-msg");
    if (category == undefined) {
        $("#category_page").append('<p class="error-msg">Please select a category</p>');
    } else {
        $(".category-selected").removeClass("category-selected");
        changeScreen();
    }
});

// Selecting a category for trivia and saving on variable "category"
$(".category_page_selectBtn").click(() => {
    $(".category-selected").removeClass("category-selected");
    category = $(event.target).attr("data-category");
    $(event.target).addClass("category-selected");
});

$("#difficulty_page_nextBtn").click(() => {
    if ($("#difficulty_page_select").val() == "") {
        $("#difficulty_page_select").addClass("border-error");
    } else {
        requestAPI()
        changeScreen();
    }
});

// Selecting a difficulty and saving on a variable "difficulty"
$("#difficulty_page_select").change(() => {
    difficulty = $(event.target).val();
});

$("#btn_tryAgain").click(function () {
    resetGame()
    changeScreen()
})

$("#user_page_quickPlay").click(function () {
    $("#user_page").slideToggle("slow");
    $("#userName").val("Player")
    category = "";
    difficulty = "";
    requestAPI();
    $("#question_page").slideToggle("slow")
});

/*************************************  Buttons Event Listeners Ending ***************************************/

/**
 * this save and write the local storage
 */
function saveLocalStorage(obj) {
    if (localStorage.getItem('User') === null) {
        let arr = [];
        arr.push(obj);
        localStorage.setItem('User', JSON.stringify(arr));
    } else {
        let arr = JSON.parse(localStorage.getItem('User'));
        arr.push(obj);
        localStorage.setItem('User', JSON.stringify(arr));
    }
}
// example of saveLocalStorage(UserObj)

/**
 * function countdown
 */

function countdown(level) {
    var timeleft;

    switch (level) {
        case "easy":
            timeleft = 120
            break;
        case "medium":
            timeleft = 60
            break;
        case "hard":
            timeleft = 30
            break;
        default:
            timeleft = 60
    }
    downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Finished";
            changeScreen()
            timeleft = 60
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds";
        }
        timeleft -= 1;
    }, 1000);
}

// Changing screens for user navigation
function changeScreen() {
    if ($("#user_page").is(":visible")) {
        $("#user_page").slideToggle("slow");
        $("#category_page").slideToggle("slow");
    } else if ($("#category_page").is(":visible")) {
        $("#category_page").slideToggle("slow");
        $("#dificulty_page").slideToggle("slow");
    } else if ($("#dificulty_page").is(":visible")) {
        $("#dificulty_page").slideToggle("slow");
        $("#question_page").slideToggle("slow");
    } else if ($("#question_page").is(":visible")) {
        $("#question_page").slideToggle("slow");
        $("#gameover_page").slideToggle("slow");
    } else if ($("#gameover_page").is(":visible")) {
        $("#gameover_page").slideToggle("slow");
        $("#user_page").slideToggle("slow");
    }
}

// Request questions to API and save them to "questions" variable
function requestAPI() {
    axios.get("https://opentdb.com/api.php", {
        params: {
            amount: 10,
            category: category,
            difficulty: difficulty
        }
    }).then((response) => {
        questions = response.data.results;
        printQuestion();
    });
}
function showHearts() {
    $("#lifes").empty();
    for (let i = 0; i < lifes; i++) {
        lifes[i] += $("#lifes").append("❤️");
    }
}

function printQuestion() {

    $("#answers").empty();
    showHearts()
    countdown(difficulty)
    // Saving correct with incorrect answers to shuffle them
    let answers = [questions[0].correct_answer, questions[0].incorrect_answers[0], questions[0].incorrect_answers[1], questions[0].incorrect_answers[2]];
    answers.sort(() => Math.random() - 0.5);
    // Updating question's title
    $("#question").html(questions[0].question);
    // Appending all the answers
    $("#answers").append($("<ul>").append(
        $("<li>").text(answers[0]).click(checkAnswer),
        $("<li>").text(answers[1]).click(checkAnswer),
        $("<li>").text(answers[2]).click(checkAnswer),
        $("<li>").text(answers[3]).click(checkAnswer)
    ));

    // Setting data="correct" for the correct answer
    $("li:contains(" + questions[0].correct_answer + ")").data("correct", true);
    // Excluding the printed question from the "questions" array
    questions.shift();
}

function checkAnswer() {
    clearInterval(downloadTimer)
    if ($(event.target).data("correct") == true) {
        score += 10;
    } else {
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

// Checks if the player is out of lifes and save his score on LocalStorage
function checkGameOver() {
    if (lifes == 0) {
        isGameOver = true;
        let user = { "name": $("#userName").val(), "score": score, "difficulty": difficulty };
        saveLocalStorage(user)
        showRanking();
        changeScreen();
    }
}

// Takes all scores from LocalStorage, order by highest first and prints the top 3 scores by difficulty
function showRanking() {
    $("#player_score").text("Your Score: " + score);
    let topEasy = [];
    let topMedium = [];
    let topHard = [];
    let countEasy = 0;
    let countMedium = 0;
    let countHard = 0;
    let arr = JSON.parse(localStorage.getItem('User'));
    arr.sort(compare);
    for (i = 0; i < arr.length; i++) {
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
            $("#rank" + i + "E").text(topEasy[i].name + " - Score: " + topEasy[i].score);
        } else {
            $("#rank" + i + "E").text("-");
        }
        if (topMedium[i] != undefined) {
            $("#rank" + i + "M").text(topMedium[i].name + " - Score: " + topMedium[i].score);
        } else {
            $("#rank" + i + "M").text("-");
        }
        if (topHard[i] != undefined) {
            $("#rank" + i + "H").text(topHard[i].name + " - Score: " + topHard[i].score);
        } else {
            $("#rank" + i + "H").text("-");
        }
    }
}

// Helper function to order ranking by highers scores first
function compare(a, b) {
    let comparison = 0;
    if (a.score > b.score) {
        comparison = 1;
    } else if (a.score < b.score) {
        comparison = -1;
    }
    return comparison * -1;
}

// Function to reset all necesserary functions to start a new game
function resetGame() {
    $("input[type=text]").val("");
    $("select").val("");
    questions = [];
    category = undefined;
    score = 0;
    lifes = 3;
    isGameOver = false

    // Resenting css classes to user input errors
    $(".border-error").removeClass("border-error");
}