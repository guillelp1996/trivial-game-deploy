// Buttons Event Listeners
$("#user_page_nextBtn").click(changeScreen);
$("#category_page_nextBtn").click(changeScreen);
$("#difficulty_page_nextBtn").click(changeScreen);

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