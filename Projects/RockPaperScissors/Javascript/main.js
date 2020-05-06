let result = document.getElementById("result");
let userScore = document.getElementById("userScore");
let computerScore = document.getElementById("computerScore");

//If user chooses Rock
function rock(){
    if(userScore.innerHTML === '10'){
        result.innerHTML = "Congrats, you win!"
        return; }

    if(computerScore.innerHTML === '10'){
        result.innerHTML = "Unlucky, you lose!"
        return; }
    game('rock');
    $("#rock").fadeOut(100).fadeIn(100)
}

//If user chooses Paper
function paper(){ 
    if(userScore.innerHTML === '10'){
        result.innerHTML = "Congrats, you win!"
        return;}

    if(computerScore.innerHTML === '10'){
        result.innerHTML = "Unlucky, you lose!"
        return;}

    game('paper');
    $("#paper").fadeOut(100).fadeIn(100)
}

//If user chooses Scissors
function scissors(){
    if(userScore.innerHTML === '10'){
        result.innerHTML = "Congrats, you win!"
        return;}

    if(computerScore.innerHTML === '10'){
        result.innerHTML = "Unlucky, you lose!"
        return;}

    game('scissors');
    $("#scissors").fadeOut(100).fadeIn(100)
}

//Random computer choice generator
function getComputerChoice(){
    const computerChoice = ['rock', 'paper', 'scissors'];
    let randomNumber = Math.floor(Math.random() * 3);
    return computerChoice[randomNumber];
}

//Function for comparing the userChoice and the computerChoice
function game(user){
    
    //Store computer and user choices into variables
    const computerChoice = getComputerChoice();
    const userChoice = user;

    //Everytime the computerChoice beats the userSchoice, 'computerWins' will be displayed and the computerscore will increment by 1
    if (computerChoice === 'rock' && userChoice === 'scissors' || computerChoice === 'paper' && userChoice === 'rock' || computerChoice === 'scissors' && userChoice === 'paper'){
        computerScore.innerHTML++;

        result.innerHTML = 
            `<h1 id="result">Computer picked <span class="choice">${computerChoice}</span> 
            and user picked <span class="choice">${userChoice}</span> Computer Wins<h1/>`
    }


    //Everytime the userSchoice beats the computerChoice, 'user wins' will be displayed userScore will increment by 1
    if (computerChoice === 'rock' && userChoice === 'paper' || computerChoice === 'paper' && userChoice === 'scissors' || computerChoice === 'scissors' && userChoice === 'rock'){
        userScore.innerHTML++;
        result.innerHTML = 
            `<h1 id="result">User picked <span class="choice">${userChoice}</span>
            and Computer picked <span class="choice">${computerChoice}</span> User Wins<h1/>`
    }


    //Everytime the computerChoice is the same as the userSchoice, 'it was a draw' will be displayed
    if (computerChoice === 'rock' && userChoice === 'rock' || computerChoice === 'paper' && userChoice === 'paper' || computerChoice === 'scissors' && userChoice === 'scissors'){
        result.innerHTML = "It was a draw!"
    }
}



