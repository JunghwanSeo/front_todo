let computerNumber = 0;
let opportunity = 5;

let userNumberHistory = [];

let bntPlay = document.getElementById("bntPlay")
let bntReset = document.getElementById("bntReset")
let inputUserNumber = document.getElementById("inputUserNumber")
let divResult = document.getElementById("divResult")
let divComputerNumber = document.getElementById("divComputerNumber")
let divOpportunity = document.getElementById("divOpportunity")

bntPlay.addEventListener("click", playGame);
bntReset.addEventListener("click", resetGame);
inputUserNumber.addEventListener("focus", function (){
    inputUserNumber.value = "";
})

getRandomNumber();

function playGame(){
    let userNumber = inputUserNumber.value;
    if(isUnavailableUserNumber(userNumber)){
        divResult.textContent = "1~100 숫자를 입력해주세요"
        return;
    }

    if(isAlreadyInputUserNumber(userNumber)){
        divResult.textContent = `${userNumber}(은/는) 이미 입력한 숫자입니다.`
        return;
    }

    userNumberHistory.push(userNumber);

    if(userNumber > computerNumber){
        divResult.textContent = "Down!!!";
    }else if(userNumber < computerNumber){
        divResult.textContent = "UP!!!";
    }else {
        divResult.textContent = "정답!!!";
        bntPlay.disabled = true;
    }

    useOpportunity();
}

function useOpportunity(){
    opportunity--;
    divOpportunity.textContent = `남은 기회 : ${opportunity}번`;

    if(opportunity<1){
        gameOver();
    }
}

function isUnavailableUserNumber(userNumber){
    return (userNumber<1 || userNumber>100);
}

function isAlreadyInputUserNumber(userNumber){
    return userNumberHistory.includes(userNumber)
}

function gameOver(){
    divResult.textContent = "실패!!!";
    bntPlay.disabled = true;
}

function resetGame(){
    resetOpportunity();
    inputUserNumber.value = "";
    getRandomNumber();
    divResult.textContent = "값을 입력하세요"
    bntPlay.disabled = false;
}

function resetOpportunity(){
    opportunity = 5;
    divOpportunity.textContent = `남은 기회 : ${opportunity}번`;
}

function getRandomNumber(){
    computerNumber = Math.floor(Math.random()*100) + 1;
    divComputerNumber.textContent = computerNumber;
    resetOpportunity();
}

