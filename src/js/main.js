var isGameOver = false;
var UserObj = {
    name: "player",
    score: 0
}




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
 *  save user name
 */

$("#user_page_quickPlay").click($("#userName").val("Player"));


/**
 * function countdown
 */

function countdown(level) {
    var timeleft;
    console.log(level)

    switch(level){
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
    var downloadTimer = setInterval(function () {
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



// guilherme´s Code