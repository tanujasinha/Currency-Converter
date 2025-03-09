
import {codes} from "./codes.js";

//references to HTML elements
const baseDropdown = document.getElementById("base_dropdown");
const targetDropdown = document.getElementById("target_dropdown");
const amount = document.getElementById("amount");

let base, target, convertedValue;
const APIkey = "695ecb74b9ef3b0819f97270";
    
// Populate the dropdowns
document.querySelectorAll("select").forEach(select=>{
    for (let key in codes) {
        let newOption = document.createElement("option");
        newOption.innerText = `${codes[key]} - ${key}`
        newOption.value = `${codes[key]}`

        //Initial value of Base dropdown
        if(newOption.value==="USD" && select.id==="base_dropdown"){
            newOption.selected=true;
            base="USD";
        }

        //Initial value of Target dropdown
        if(newOption.value==="INR" && select.id==="target_dropdown"){
            newOption.selected=true;
            target="INR";
        }
        select.append(newOption);
    }
})

// Event Listeners for currency selection
baseDropdown.addEventListener("change", (e) => {
    base = e.target.value;
});
targetDropdown.addEventListener("change", (e) => {
    target = e.target.value;
});

// Convert button click event
document.querySelector("#convert").addEventListener('click', (e) => {
    e.preventDefault();
    fetchConvertedValues();
});

// Fetch converted values
async function fetchConvertedValues() {
    let response = await fetch(`https://v6.exchangerate-api.com/v6/${APIkey}/pair/${base}/${target}/${amount.value}`);
    if(response.ok){
        let data = await response.json();
        convertedValue = data["conversion_result"];
        updateResult();
    }else{
        console.log("cant fetch");
    }
}

// Update result
function updateResult() {
    document.getElementById('result').innerText = `${amount.value} ${base} = ${convertedValue} ${target}`;
}
