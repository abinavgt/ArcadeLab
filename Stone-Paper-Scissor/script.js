//For tracking the scores
let userScore = 0;
let compScore =0;

//Edits the message paragraph from play your move to eithet you win or you lose
const msg = document.querySelector("#msg");

//for calculating the score of userchoice and compchoice
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

//for generating choice of computer (randomly)
const genCompChoice = () =>{
    const options = ["rock","paper","scissor"];
    const randomIdx = Math.floor(Math.random() *3);
    return options[randomIdx];
}

const drawGame =() =>{
    console.log("Game was draw");
    msg.innerText = ("Game was Draw. Play Again");
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin,userChoice,compChoice) =>{
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose. ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

const playGame = (userChoice) =>{
    //console.log("user choice = ",userChoice);
    const compChoice = genCompChoice();
    //console.log("comp choice =",compChoice);

    if(userChoice === compChoice){
        drawGame(); //When the choice were draw
    }
    else{ 
        let userWin = true;
        if(userChoice ==="rock"){
            userWin = compChoice === "paper" ? false:true;
        }
        else if(userChoice =="paper"){
            userWin = compChoice ==="scissor"? false:true;
        }
        else{
            userWin = compChoice ==="rock"? false:true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
}

//For clicking the div class
const choices = document.querySelectorAll(".choice");
choices.forEach((choice) => {
    choice.addEventListener("click",()=>{  //It executes the callback function linke (click,keypress,submit,load)
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

