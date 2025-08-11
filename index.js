import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase,
         ref,
         push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-5b633-default-rtdb.firebaseio.com/" //Key
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

console.log(app)

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot){
    const snapShotExists = snapshot.exists() //Returns true or false
    if(snapShotExists){
         const snaValues = snapshot.val()
         const leads = Object.values(snaValues)
         render(leads)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})