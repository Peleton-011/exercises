const puppeteer = require("puppeteer");
const fs = require("fs");
const shellFile = "./move.sh";

let problemNum = 0;
let problemAmnt = 10;

const { exec } = require("child_process");
const { EventEmitter } = require("stream");

EventEmitter.setMaxListeners(20);

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question("Insert start problem: ", (firstProblem) => {
    problemNum = firstProblem;
});

// readline.question("Insert amount of problems: ", (numOfProblems) => {
//     problemAmnt = numOfProblems;
// });

const hiddenElems = ['"center print"', '"problem_icons"'];

const scrapePage = async (num) => {
    let fileName = `./Problem-${num}.html`;
    const browser = await puppeteer.launch({
        headless: true,
        userDataDir: "./tmp",
    });

    const page = await browser.newPage();

    await page.goto(`https://projecteuler.net/problem=${num}`);

    const element = await page.waitForSelector("#content");

    let pageData = await page.evaluate((el) => {
        const undesiredButtons = document.querySelector("#problem_icons");
        const undesiredSomething = document.querySelector(".center");
        undesiredButtons.remove();
        undesiredSomething.remove();
    el.innerHTML = el.innerHTML.replace(/(\r\n|\n|\r)/gm, "");
        return el.innerHTML;
    }, element);

    await browser.close();

    // data = data.split("<h2>");
    // data = data[1];
    // data = "<h2>" + data;

    let foo;
    foo = await writeData(pageData, fileName);
    foo = await readWriteAsync(fileName);
};

const writeData = async (data, fileName) => {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err);
        }
        // file written successfully
        return "file written successfully!";
    });
};

const readWriteAsync = async (fileName) => {
    fs.readFile(fileName, "utf-8", function (err, data) {
        if (err) throw err;

        // data = cleanData(data);

        fs.writeFile(fileName, data, "utf-8", function (err) {
            if (err) throw err;
        });
        return "file written successfully!";
    });
};

function cleanData(raw) {
    let htmlObject = document.createElement("div");
    for (let i = 0; i < hiddenElems.length; i++) {
        // let regEx = `/${hiddenElems[i]}/gim`;
        data = data.replace(hiddenElems[i], hiddenElems[i] + " hidden");
    } //Take out line breaks

    htmlObject.innerHTML = data;
    const undesiredButtons = htmlObject.querySelector("#problem_icons");
    const undesiredSomething = htmlObject.querySelector(".center");
    undesiredButtons.remove();
    undesiredSomething.remove();
    data = htmlObject.innerHTML;

    return data;

}

for (let i = problemNum; i <= problemNum + problemAmnt; i++) {
    scrapePage(i);
}
