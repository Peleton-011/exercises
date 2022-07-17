const r = document.querySelector(":root");

function setup() {
    setButtonWidth(".left-buttons");
    setButtonWidth(".right-buttons");
}

function setButtonWidth(selector) {
    let buttons = document.querySelector(selector).children;
    console.log(buttons);
    let maxWidth = 0;

    // Find widest button
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];
        maxWidth = Math.max(maxWidth, btn.offsetWidth);
    }

    // let padding = pxToNum(getComputedStyle(r).getPropertyValue("--button-padding"));
    // maxWidth += 2 * padding;

    maxWidth += 6;
    
    // Set width of all buttons to the max
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];
        btn.style.width = (maxWidth) + "px";
    }
}

//Returns the next exercise
function findNext() {
    let docName = window.location.pathname;
    let splitName = docName.split("/");

    //Get folder name to find the next one
    docName = splitName[splitName.length -2];
    
    let tag = docName.split("-")[0];
    let num = Number(docName.split("-")[1]);
    console.log(num)
    //Set the number to the next one 
    num += 1;
    console.log(num);

    //Check if it goes over 100
    if (Math.floor(num / 100)) {
        tag = nextLetter(tag);
    }
    num %= 100
    console.log(num);

    num = String(num);
    num = num.padStart(2, "0");

    docName = tag + "-" + num;
    
    return docName;
}

//Get next letter in alphabet (It loops over at z)
function nextLetter(str) {
    return str.replace(/[A-Z]/, (char) => {
        var charCode = char.charCodeAt(0);
        switch (charCode) {
            case 90:
                return "A";
            default:
                return String.fromCharCode(++charCode);
        }
    });
}

// function pxToNum (px) {
//     px = px.replace(" ", "");
//     px = px.replace("px", "");
//     return Number(px);
// }

setup();

console.log(findNext());
