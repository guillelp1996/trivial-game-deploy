/**
 * this save and write the local storage
 */


function saveLocalStorage(){
    let storage = localStorage.getItem("User")
    if (storage == null){
        console.log("no local storge")
    }
}
saveLocalStorage()