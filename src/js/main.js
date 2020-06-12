var isGameOver = false;
var UserObj = {
    name: "",
    score: 0
}




/**
 * this save and write the local storage
 */
function saveLocalStorage(obj){
    if(localStorage.getItem('User') === null) {
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



// guilherme´s Code