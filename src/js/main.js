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

$("#user_page_nextBtn").click(saveUser)
$("#user_page_quickPlay").click(saveUser)
function saveUser(){
    let name = $("#userName").val()
    if (name == ""){
        // console.log(UserObj)
        saveLocalStorage(UserObj)
    }else{
        UserObj.name = name
        saveLocalStorage(UserObj)
    }
}





// guilherme´s Code