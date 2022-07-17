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

// function pxToNum (px) {
//     px = px.replace(" ", "");
//     px = px.replace("px", "");
//     return Number(px);
// }

setup();
