console.log("Hello, world!");

class gamePiece {
    constructor(idElement, pieceNumber) {
        this.idElement = idElement;
        this.pieceNumber = pieceNumber;
        this.isSelected = false;
    }
}

let currentPlayer = 0;
let currentPlayerHTML = document.getElementById("currentPlayer");
let currentTurnHTML = document.getElementById("currentTurn");
let whoWonHTML = document.getElementById("whoWon");
let playerWinNameHTML = document.getElementById("playerWinName");

let XSelected = [];
let OSelected = [];
let gameNotOver = true;



let topLeftId = document.getElementById("topLeft");
let topMiddleId = document.getElementById("topMiddle");
let topRightId = document.getElementById("topRight");
let centerLeftId = document.getElementById("centerLeft");
let centerId = document.getElementById("center");
let centerRightId = document.getElementById("centerRight");
let bottomLeftId = document.getElementById("bottomLeft");
let bottomMiddleId = document.getElementById("bottomMiddle");
let bottomRightId = document.getElementById("bottomRight");

let gameboard = [new gamePiece(topLeftId, 0),
                 new gamePiece(topMiddleId, 1),
                 new gamePiece(topRightId, 2),
                 new gamePiece(centerLeftId, 3),
                 new gamePiece(centerId, 4),
                 new gamePiece(centerRightId, 5),
                 new gamePiece(bottomLeftId, 6),
                 new gamePiece(bottomMiddleId, 7),
                 new gamePiece(bottomRightId, 8)];

for(let i = 0; i < 9; ++i) {
    gameboard[i].idElement.addEventListener("click", function() {squareClick(gameboard[i])});
}



function squareClick(gamePiece) {
    if(currentPlayer == 0 && !gamePiece.isSelected && gameNotOver) {
        gamePiece.idElement.innerHTML = "X";
        gamePiece.isSelected = true;
        XSelected.push(gamePiece);
        currentPlayer = 1;
        currentPlayerHTML.innerHTML = "O";

        checkWin();
    } else if(!gamePiece.isSelected && gameNotOver) {
        gamePiece.idElement.innerHTML = "O";
        gamePiece.isSelected = true;
        OSelected.push(gamePiece); 
        currentPlayer = 0;
        currentPlayerHTML.innerHTML = "X";

        checkWin();
    }
}

function checkWin() {
    let selectedIds = [];
    for(let i = 0; i < XSelected.length; ++i) {
        selectedIds.push(XSelected[i].pieceNumber);
    }
    if(checkSelectedContainsWin(selectedIds)) {
        console.log("X wins!");
        gameNotOver = false;
        currentTurnHTML.style.visibility = "hidden";
        playerWinNameHTML.innerHTML = "X";
        whoWonHTML.style.display = "block";
    } else {
            selectedIds = [];
        for(let i = 0; i < OSelected.length; ++i) {
            selectedIds.push(OSelected[i].pieceNumber);
        }
        if(checkSelectedContainsWin(selectedIds)) {
            console.log("O wins!");
            gameNotOver = false;
            currentTurnHTML.style.visibility = "hidden";
            playerWinNameHTML.innerHTML = "O";
            whoWonHTML.style.display = "block";
        } else {
            console.log("Nobody wins yet");
        }
    }
}

function checkSelectedContainsWin(selectedIds) {
    if((selectedIds.includes(0) && selectedIds.includes(1) && selectedIds.includes(2))
    || (selectedIds.includes(3) && selectedIds.includes(4) && selectedIds.includes(5))
    || (selectedIds.includes(6) && selectedIds.includes(7) && selectedIds.includes(8))
    
    || (selectedIds.includes(0) && selectedIds.includes(3) && selectedIds.includes(6))
    || (selectedIds.includes(1) && selectedIds.includes(4) && selectedIds.includes(7))
    || (selectedIds.includes(2) && selectedIds.includes(5) && selectedIds.includes(8))
    

    || (selectedIds.includes(1) && selectedIds.includes(4) && selectedIds.includes(8))
    || (selectedIds.includes(2) && selectedIds.includes(4) && selectedIds.includes(6))) {
        return true;
    } else {
        return false;
    }
}