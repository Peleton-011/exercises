const puppeteer = require("puppeteer");
const fs = require("fs");
let problemNum = 20;
const shellFile = "./move.sh";

const { exec } = require("child_process");

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

    let pageData = await page.evaluate((el) => el.innerHTML, element);

    await browser.close();

    // data = data.split("<h2>");
    // data = data[1];
    // data = "<h2>" + data;

    writeData(pageData, fileName);
    readWriteAsync(fileName);
};

function writeData(data, fileName) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
}

function readWriteAsync(fileName) {
    fs.readFile(fileName, "utf-8", function (err, data) {
        if (err) throw err;

        for (let i = 0; i < hiddenElems.length; i++) {
            // let regEx = `/${hiddenElems[i]}/gim`;
            data = data.replace(hiddenElems[i], hiddenElems[i] + " hidden");
        }

        fs.writeFile(fileName, data, "utf-8", function (err) {
            if (err) throw err;
        });
    });
}

for (let i = 1; i <= problemNum; i++) {
    scrapePage(i);
}

exec(shellFile, (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
        console.log(`exec error: ${error}`);
    }
});
