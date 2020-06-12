//Global variables
var category;
var difficulty;

// Buttons Event Listeners
$("#user_page_nextBtn").click(changeScreen);

$("#category_page_nextBtn").click(changeScreen);

// Selecting a category for trivia and saving on variable "category"
$(".category_page_selectBtn").click( () => {
    category = $(event.target).attr("value");
});

$("#difficulty_page_nextBtn").click(changeScreen);

// Selecting a difficulty and saving on a variable "difficulty"
$("#difficulty_page_select").change( () => {
    difficulty = $(event.target).val();
});

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

function requestAPI() {
    axios.get("https://opentdb.com/api.php", {
        params :{
            amount: 10,
            category: category,
            difficulty: difficulty
        }
    }).then((response) => {
        console.log(response);
    });
}