let result;

let targetNum = 13195;

let currNum = 2;
let primes = [2];

checknum:
while (currNum < targetNum) {
    console.log(currNum);
    //Check if it's prime
    if (primes.every((prime) => {
        console.log(`${currNum} % ${prime} = ${currNum % prime}`)
        return (currNum % prime == 0);
        })) {
        console.log("CUM")
        //Increase currNum and go to next number if not prime
        currNum++;
        continue checknum;
    }
    console.log(currNum)
    //Add prime to list, divide target, and
    targetNum /= currNum;
    primes.push(currNum);
    currNum++;
}
console.log(primes);

result = primes[primes.length - 1];

const resultDiv = document.querySelector(".solution");
resultDiv.textContent = resultDiv.textContent + result;
