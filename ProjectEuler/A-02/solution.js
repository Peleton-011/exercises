let result = 0;

const targetNum = 4000000;

let currNum = 2;
let prev = 1;
let aux = 0;

while (currNum < targetNum) {
    if (currNum % 2 == 0) {
        result += currNum;
    }
    aux = currNum;
    currNum = currNum + prev;
    prev = aux;
}

const resultDiv = document.querySelector(".solution");
resultDiv.textContent = resultDiv.textContent + result;
