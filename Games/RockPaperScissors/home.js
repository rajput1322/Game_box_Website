function deleteEle(n1, n2, n3) {
    document.getElementById(n1).remove();
    document.getElementById(n2).remove();
    document.getElementById(n3).remove();
}

function main(yourChoice) {
    var arr=['rock', 'paper', 'scissor'];

    var userChoice =yourChoice.id;
    
    var compChoice = arr[Math.floor(Math.random()*3)];
    
// results
    var message;
    if (compChoice == userChoice){
        message = "Its A Draw!";
    }
    else if ((compChoice == 'rock' && userChoice == 'paper') || (compChoice == 'paper' && userChoice == 'scissor') || (compChoice =='scissor' && userChoice == 'rock')){
        message = "You Win!";
    }
    else {
        message = "Computer Wins!";
    }

// color of the message
    var colour = "blue";
    if (message == "You Win!") {
        colour = 'green';    
    }
    else if (message == "Computer Wins!") {
        colour = 'red';    
    }
    else {
        colour = 'yellow';    
    }
    
    var rock = document.getElementById('rock').src;
    var paper = document.getElementById('paper').src;
    var scissors = document.getElementById('scissor').src;
        
// To start displaying brand-new :)

    deleteEle('1Div','2Div','3Div');    

// For creating elements with id and class:
    var humanDiv = document.createElement('div');
    humanDiv.id="1Div";
    humanDiv.className="class='insideDiv'";
    var messDiv = document.createElement('div');
    messDiv.id="2Div";
    messDiv.className="class='insideDiv'";
    var compDiv = document.createElement('div');
    compDiv.id="3Div";
    compDiv.className="class='insideDiv'";

    humanDiv.innerHTML = "<img src='Images/" + userChoice +".png' height='150px' width='150px' style='margin: auto; padding: 10px; box-shadow: 0px 0px 50px teal;'>"
    messDiv.innerHTML = "<h1 style='color:"+ colour +";margin: auto; padding: 10px; text-align: center;'>"+message +"</h1>"
    compDiv.innerHTML = "<img src='Images/" + compChoice +".png' height='150px' width='150px' style='margin: auto; padding: 10px; box-shadow: 0px 0px 50px crimson;'>"

    document.getElementById("flexcontainer").appendChild(humanDiv);
    document.getElementById("flexcontainer").appendChild(messDiv);
    document.getElementById("flexcontainer").appendChild(compDiv);
}



function reset() {
// Now to reset...
    deleteEle('1Div','2Div','3Div');
    var rockDiv = document.createElement('div');
    rockDiv.id="1Div";
    rockDiv.className="class='insideDiv'";
    var paperDiv = document.createElement('div');
    paperDiv.id="2Div";
    paperDiv.className="class='insideDiv'";
    var scissorDiv = document.createElement('div');
    scissorDiv.id="3Div";
    scissorDiv.className="class='insideDiv'";

    rockDiv.innerHTML="<img id='rock' src='Images/rock.png' height='150px' width='150px' style='margin: auto; padding: 10px;' onclick='main(this)'>"
    paperDiv.innerHTML="<img id='paper' src='Images/paper.png' height='150px' width='150px' style='margin: auto; padding: 10px;' onclick='main(this)'>"
    scissorDiv.innerHTML="<img id='scissor' src='Images/scissor.png' height='150px' width='150px' style='margin: auto; padding: 10px;' onclick='main(this)'>"

    document.getElementById("flexcontainer").appendChild(rockDiv);
    document.getElementById("flexcontainer").appendChild(paperDiv);
    document.getElementById("flexcontainer").appendChild(scissorDiv);
}
