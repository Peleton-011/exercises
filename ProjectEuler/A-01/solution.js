let result = 0;

const targetNum = 1000;

for (let i = 0; i < targetNum; i++) {
    if ((i % 3 == 0) || (i % 5 == 0)) {
        result += i;        
    };
}

const resultDiv = document.querySelector(".solution");
resultDiv.textContent = resultDiv.textContent + String(result);
