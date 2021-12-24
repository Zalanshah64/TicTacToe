class gamePiece {
    constructor(idElement, pieceNumber) {
        this.idElement = idElement;
        this.pieceNumber = pieceNumber;
        this.isSelected = false;
    }
}

//Document Elements related to entire webpage
let wrapper = document.getElementById("wrapper");

//Document Elements related to start menu
let startMenu = document.getElementById("startMenu");
let startButton = document.getElementById("startButton");
let instructionsButton = document.getElementById("instructionsButton");
let settingsButton = document.getElementById("settingsButton");


//Document Elements related to settings menu
let settingsMenu = document.getElementById("settingsMenu");
let volumeSlider = document.getElementById("volumeSlider");
let settingsBackButton = document.getElementById("settingsBackButton");
let settingsTitle = document.getElementById("settingsTitle");

//Document Elements related to instructions menu
let instructionsMenu = document.getElementById("instructionsMenu");
let instructionsTitle = document.getElementById("instructionsTitle");
let instructionsBackButton = document.getElementById("instructionsBackButton");

let currentPlayer = 0;
let currentPlayerHTML = document.getElementById("currentPlayer");
let currentTurnHTML = document.getElementById("currentTurn");
let whoWonHTML = document.getElementById("whoWon");
let playerWinNameHTML = document.getElementById("playerWinName");
let itsATieHTML = document.getElementById("itsATie");
let XSelected = [];
let OSelected = [];
let gameNotOver = true;


//Audio Sounds
let XMoveAudio = new Audio("resources/XMove.wav");
let OMoveAudio = new Audio("resources/OMove.wav");
XMoveAudio.volume = 0.75;
OMoveAudio.volume = 0.75;



//Document Elements related to gameboard
let board = document.getElementById("board");
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
    gameboard[i].idElement.addEventListener("mouseover", function() {
        if(gameboard[i].isSelected || !gameNotOver) {
            return;
        }
        if(currentPlayer == 0) {
            gameboard[i].idElement.innerHTML = '<p class="hoverOver">X</p>';
        } else {
            gameboard[i].idElement.innerHTML = '<p class="hoverOver">O</p>';
        }
    });
    gameboard[i].idElement.addEventListener("mouseleave", function() {
        if(gameboard[i].isSelected || !gameNotOver) {
            return;
        }
        gameboard[i].idElement.innerHTML = "";
    })
}

startButton.addEventListener("click", function() {
    startMenu.style.display = "none";
    currentTurnHTML.style.display = "block";
    board.style.display = "grid";
})

settingsButton.addEventListener("click", function() {
    startMenu.style.display = "none";
    settingsTitle.style.display = "block";
    settingsMenu.style.display = "grid";
})

settingsBackButton.addEventListener("click", function() {
    settingsMenu.style.display = "none";
    settingsTitle.style.display = "none";
    startMenu.style.display = "grid";
})

volumeSlider.oninput = function() {
    XMoveAudio.volume = (this.value / 100);
    OMoveAudio.volume = (this.value / 100);
}

instructionsButton.addEventListener("click", function() {
    startMenu.style.display = "none";
    instructionsMenu.style.display = "grid";
    instructionsTitle.style.display = "block";
    wrapper.style.display = "block"
})

instructionsBackButton.addEventListener("click", function() {
    instructionsMenu.style.display = "none";
    instructionsTitle.style.display = "none";
    startMenu.style.display = "grid";
    wrapper.style.display = "grid";
})


function squareClick(gamePiece) {
    if(currentPlayer == 0 && !gamePiece.isSelected && gameNotOver) {
        gamePiece.idElement.innerHTML = "X";
        gamePiece.isSelected = true;
        XSelected.push(gamePiece);
        XMoveAudio.play();
        currentPlayer = 1;
        currentPlayerHTML.innerHTML = "O";

        checkWin();
    } else if(!gamePiece.isSelected && gameNotOver) {
        gamePiece.idElement.innerHTML = "O";
        gamePiece.isSelected = true;
        OSelected.push(gamePiece);
        OMoveAudio.play();
        currentPlayer = 0;
        currentPlayerHTML.innerHTML = "X";

        checkWin();
    }
}

function checkWin() {
    let XSelectedIDs = [];
    let YSelectedIDs = [];
    for(let i = 0; i < XSelected.length; ++i) {
        XSelectedIDs.push(XSelected[i].pieceNumber);
    }
    if(checkSelectedContainsWin(XSelectedIDs)) {
        gameNotOver = false;
        currentTurnHTML.style.visibility = "hidden";
        playerWinNameHTML.innerHTML = "X";
        whoWonHTML.style.display = "block";
    } else {
        for(let i = 0; i < OSelected.length; ++i) {
            YSelectedIDs.push(OSelected[i].pieceNumber);
        }
        if(checkSelectedContainsWin(YSelectedIDs)) {
            gameNotOver = false;
            currentTurnHTML.style.display = "none";
            playerWinNameHTML.innerHTML = "O";
            whoWonHTML.style.display = "block";
        } else {
            if(XSelectedIDs.length + YSelectedIDs.length == 9) {
                gameNotOver = false;
                currentTurnHTML.style.display = "none";
                itsATieHTML.style.display = "block";
                
            }
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
    

    || (selectedIds.includes(0) && selectedIds.includes(4) && selectedIds.includes(8))
    || (selectedIds.includes(2) && selectedIds.includes(4) && selectedIds.includes(6))) {
        return true;
    } else {
        return false;
    }
}