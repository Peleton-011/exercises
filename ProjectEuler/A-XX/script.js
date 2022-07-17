const r = document.querySelector(":root");

//Sets everything up, all one time procedures are done here
function setup() {
    setButtonWidth(".left-buttons");
    setButtonWidth(".right-buttons");
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
    let docName = window.location.pathname;
    let splitName = docName.split("/");

    //Get folder name to find the next one
    docName = splitName[splitName.length - 2];

    //Split name into tag and num
    //A-32 -> A is the tag, 32 is the num
    let tag = docName.split("-")[0];
    let num = Number(docName.split("-")[1]);

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

//Get previous letter in alphabet
function prevLetter(str) {
    return str.replace(/[A-Z]/, (char) => {
        var charCode = char.charCodeAt(0);
        return String.fromCharCode(--charCode);
    });
}

setup();
