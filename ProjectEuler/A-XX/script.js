const r = document.querySelector(":root");

let docName = window.location.pathname;
let splitName = docName.split("/");

//Get folder name
docName = splitName[splitName.length - 2];

//Split name into tag and num
//A-32 -> A is the tag, 32 is the num
const tag = docName.split("-")[0];
const num = Number(docName.split("-")[1]);

//Sets everything up, all one time procedures are done here
function setup() {
    setButtonWidth(".left-buttons");
    setButtonWidth(".right-buttons");
    
    //Link to the homepage
    const homeBtn = document.querySelector(".home");
    homeBtn.addEventListener("click", () => {
        location.replace("../../index.html")
    });

    //Previous and next page buttons
    const prevBtn = document.querySelector(".prev");
    prevBtn.addEventListener("click", () => {
        let prev = findPrevPage();
        location.replace("../" + prev + "/" + prev + ".html");
    });

    const nextBtn = document.querySelector(".next");
    nextBtn.addEventListener("click", () => {
        let next = findNextPage();
        location.replace("../" + next + "/" + next + ".html");
    })
}

//Sets width of all contiguous elements to that of the widest element
function setButtonWidth(selector) {
    let buttons = document.querySelector(selector).children;
    let maxWidth = 0;

    // Find widest button
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];
        maxWidth = Math.max(maxWidth, btn.offsetWidth);
    }

    //Extra space as padding just in case
    maxWidth += 6;

    // Set width of all buttons to the max one
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];
        btn.style.width = maxWidth + "px";
    }
}

//Returns the next exercise
function findNextPage() {
    //Set the number to the next one
    num += 1;

    //Check if it goes over 100, if it does go to next tag
    if (Math.floor(num / 100)) {
        tag = nextLetter(tag);
    }
    num %= 100;

    //Put updated name back together
    num = String(num);
    num = num.padStart(2, "0");

    let newDoc = tag + "-" + num;

    return newDoc;
}

//Returns the prev exercise
function findPrevPage() {
    //Set the number to the previous one
    num -= 1;

    //Check if it goes below 0, if it does go to previous tag
    if (num < 0) {
        if (tag == "A") {
            firstPageReached();
            return "A-00";
        }
        tag = prevLetter(tag);
    }
    num %= 100;

    //Put updated name back together
    num = String(num);
    num = num.padStart(2, "0");

    let newDoc = tag + "-" + num;

    return newDoc;
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

//Get previous letter in alphabet
function prevLetter(str) {
    return str.replace(/[A-Z]/, (char) => {
        var charCode = char.charCodeAt(0);
        return String.fromCharCode(--charCode);
    });
}

//This is a temporal fix, looping back over will be implemented at one point
function firstPageReached() {
    alert("Can't go any further back!");
}

setup();
