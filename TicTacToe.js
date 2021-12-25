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
let suggestionsToggle = document.getElementById("suggestionsCheckBox");
let suggestionsOn = true;
let settingsBackFromLocation = 0;
let Xselections = document.getElementsByClassName("Xselection");
let Oselections = document.getElementsByClassName("Oselection");
let XIconSelectionnext = document.getElementById("XIconSelectionnext");
let XIconSelectionprev = document.getElementById("XIconSelectionprev");
let OIconSelectionnext = document.getElementById("OIconSelectionnext");
let OIconSelectionprev = document.getElementById("OIconSelectionprev");


//Document Elements related to instructions menu
let instructionsMenu = document.getElementById("instructionsMenu");
let instructionsTitle = document.getElementById("instructionsTitle");
let instructionsBackButton = document.getElementById("instructionsBackButton");


//Document Elements related to the game
let game = document.getElementById("game");
let scoreTitle = document.getElementsByClassName("scoreTitle");
let XScoreHTML = document.getElementById("XScore");
let OScoreHTML = document.getElementById("OScore");
let mainMenuButton = document.getElementById("mainMenuButton");
let settingsPostGameButton = document.getElementById("settingsPostGameButton")
let playAgainButton = document.getElementById("playAgainButton");
let XName = document.getElementById("XName");
let OName = document.getElementById("OName");

let XIconSlideIndex = 0;
let OIconSlideIndex = 0;
let currentPlayer = 0;
let XScore = 0;
let OScore = 0;
let currentPlayerHTML = document.getElementById("currentPlayer");
let currentTurnHTML = document.getElementById("currentTurn");
let whoWonHTML = document.getElementById("whoWon");
let playerWinNameHTML = document.getElementById("playerWinName");
let itsATieHTML = document.getElementById("itsATie");
let XSelected = [];
let OSelected = [];
let gameResult = -1;
let XIcon = "X";
let OIcon = "O";


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

showXSelectionOption(XIconSlideIndex);
showOSelectionOption(OIconSlideIndex);



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
    gameboard[i].idElement.addEventListener("mouseenter", function() {
        if(gameboard[i].isSelected || gameResult != -1 || !suggestionsOn) {
            return;
        }
        if(currentPlayer == 0) {
            gameboard[i].idElement.innerHTML = '<p id="hoverOver">' + XIcon + '</p>';
        } else {
            gameboard[i].idElement.innerHTML = '<p id="hoverOver">'+ OIcon + '</p>';
        }
    });
    gameboard[i].idElement.addEventListener("mouseleave", function() {
        if(gameboard[i].isSelected || gameResult != -1 || !suggestionsOn) {
            return;
        }
        gameboard[i].idElement.innerHTML = "";
    })
}

startButton.addEventListener("click", function() {
    startMenu.style.display = "none";
    XScoreHTML.innerHTML = XScore;
    OScoreHTML.innerHTML = OScore;
    currentTurnHTML.style.display = "block";
    game.style.display = "block";
    scoreTitle[0].style.display = "block";
    scoreTitle[1].style.display = "block";
    XName.innerHTML = XIcon;
    OName.innerHTML = OIcon;
    currentPlayerHTML.innerHTML = XIcon;
})


playAgainButton.addEventListener("click", function() {
    XSelected = [];
    OSelected = [];
    mainMenuButton.style.display = "none";
    settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = "none";
    itsATieHTML.style.display = "none";
    whoWonHTML.style.display = "none";
    currentTurnHTML.style.display = "block";
    XName.innerHTML = XIcon;
    OName.innerHTML = OIcon;
    currentPlayerHTML.innerHTML = XIcon;
    currentPlayer = 0;
    for(let i = 0; i < gameboard.length; ++i) {
        gameboard[i].isSelected = false;
        gameboard[i].idElement.innerHTML = "";
        gameboard[i].idElement.classList.add("unclicked");
    }
    gameResult = -1
})

settingsPostGameButton.addEventListener("click", function() {
    game.style.display = "none";
    settingsMenu.style.display = "grid";
    mainMenuButton.style.display = "none";
    settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = "none";
    scoreTitle[0].style.display = "none";
    scoreTitle[1].style.display = "none";
    itsATieHTML.style.display = "none";
    whoWonHTML.style.display = "none";
    settingsBackFromLocation = 1;
})

mainMenuButton.addEventListener("click", function() {
    XScore = 0;
    OScore = 0;

    XSelected = [];
    OSelected = [];
    currentPlayer = 0;
    gameResult = -1
    currentPlayerHTML.innerHTML = XIcon;
    whoWonHTML.style.display = "none";
    itsATieHTML.style.display = "none";
    for(let i = 0; i < gameboard.length; ++i) {
        gameboard[i].isSelected = false;
        gameboard[i].idElement.innerHTML = "";
    }

    game.style.display = "none";
    startMenu.style.display = "grid";
    scoreTitle[0].style.display = "none";
    scoreTitle[1].style.display = "none";
    mainMenuButton.style.display = "none";
    settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = "none";
})


playAgainButton.addEventListener("click", function() {
    XSelected = [];
    OSelected = [];
    mainMenuButton.style.display = "none";
    settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = "none";
    itsATieHTML.style.display = "none";
    whoWonHTML.style.display = "none";
    currentTurnHTML.style.display = "block";
    currentPlayerHTML.innerHTML = "X";
    currentPlayer = 0;
    for(let i = 0; i < gameboard.length; ++i) {
        gameboard[i].isSelected = false;
        gameboard[i].idElement.innerHTML = "";
    }
    gameResult = -1
})

settingsPostGameButton.addEventListener("click", function() {
    game.style.display = "none";
    settingsMenu.style.display = "grid";
    mainMenuButton.style.display = "none";
    settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = "none";
    scoreTitle[0].style.display = "none";
    scoreTitle[1].style.display = "none";
    itsATieHTML.style.display = "none";
    whoWonHTML.style.display = "none";
    settingsBackFromLocation = 1;
})

mainMenuButton.addEventListener("click", function() {
    XScore = 0;
    OScore = 0;

    XSelected = [];
    OSelected = [];
    currentPlayer = 0;
    gameResult = -1
    currentPlayerHTML.innerHTML = "X";
    whoWonHTML.style.display = "none";
    itsATieHTML.style.display = "none";
    for(let i = 0; i < gameboard.length; ++i) {
        gameboard[i].isSelected = false;
        gameboard[i].idElement.innerHTML = "";
    }

    game.style.display = "none";
    startMenu.style.display = "grid";
    scoreTitle[0].style.display = "none";
    scoreTitle[1].style.display = "none";
    mainMenuButton.style.display = "none";
    settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = "none";
})

settingsButton.addEventListener("click", function() {
    settingsBackFromLocation = 0;
    startMenu.style.display = "none";
    settingsTitle.style.display = "block";
    settingsMenu.style.display = "grid";
})

XIconSelectionprev.addEventListener("click", function() {
    XIconSlideIndex -=1;
    showXSelectionOption(XIconSlideIndex);
})
  
XIconSelectionnext.addEventListener("click", function() {
    XIconSlideIndex += 1;
    showXSelectionOption(XIconSlideIndex);
})

OIconSelectionprev.addEventListener("click", function() {
    OIconSlideIndex -=1;
    showOSelectionOption(OIconSlideIndex);
})
  
OIconSelectionnext.addEventListener("click", function() {
    OIconSlideIndex += 1;
    showOSelectionOption(OIconSlideIndex);
})


settingsBackButton.addEventListener("click", function() {
    settingsMenu.style.display = "none";
    settingsTitle.style.display = "none";
    if(settingsBackFromLocation == 0) {
        startMenu.style.display = "grid";
    } else if(settingsBackFromLocation == 1) {
        game.style.display = "block";
        scoreTitle[0].style.display = "block";
        scoreTitle[1].style.display = "block";
        mainMenuButton.style.display = "block";
        settingsPostGameButton.style.display = "block";
        playAgainButton.style.display = "block";
        if(gameResult == 0 || gameResult == 1) {
            whoWonHTML.style.display = "block";
        } else {
            itsATieHTML.style.display = "block";
        }

        XName.innerHTML = XIcon;
        OName.innerHTML = OIcon;
        if(gameResult == 0) {
            whoWonHTML.innerHTML = XIcon;
        } else {
            whoWonHTML.innerHTML = OIcon;
        }
        for(let i = 0; i < XSelected.length; ++i) {
            gameboard[XSelected[i].pieceNumber].idElement.innerHTML = XIcon;
        }

        for(let i = 0; i < OSelected.length; ++i) {
            gameboard[OSelected[i].pieceNumber].idElement.innerHTML = OIcon;
        }
    }
})

volumeSlider.oninput = function() {
    XMoveAudio.volume = (this.value / 100);
    OMoveAudio.volume = (this.value / 100);
}

suggestionsToggle.addEventListener("change", function() {
    suggestionsOn = !suggestionsOn;
})

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
    if(currentPlayer == 0 && !gamePiece.isSelected && gameResult == -1) {
        gamePiece.idElement.innerHTML = '<p class="clicked">'+ XIcon + '</p>';
        XSelected.push(gamePiece);
        XMoveAudio.play();
        currentPlayer = 1;
        currentPlayerHTML.innerHTML = OIcon;

    } else if(!gamePiece.isSelected && gameResult == -1) {
        gamePiece.idElement.innerHTML = '<p class="clicked">' + OIcon + '</p>';
        OSelected.push(gamePiece);
        OMoveAudio.play();
        currentPlayer = 0;
        currentPlayerHTML.innerHTML = XIcon;
    } else {
        return;
    }

    gamePiece.isSelected = true;
    gamePiece.idElement.classList.remove("unclicked");
    checkWin();
}

function checkWin() {
    let XSelectedIDs = [];
    let OSelectedIDs = [];
    for(let i = 0; i < XSelected.length; ++i) {
        XSelectedIDs.push(XSelected[i].pieceNumber);
    }
    if(checkSelectedContainsWin(XSelectedIDs)) {
        gameResult = 0;
        currentTurnHTML.style.display = "none";
        playerWinNameHTML.innerHTML = XIcon;
        XScore++;
        XScoreHTML.innerHTML = XScore;
        whoWonHTML.style.display = "block";
        mainMenuButton.style.display = "block";
        settingsPostGameButton.style.display = "block";
        playAgainButton.style.display = "block";
    } else {
        for(let i = 0; i < OSelected.length; ++i) {
            OSelectedIDs.push(OSelected[i].pieceNumber);
        }
        if(checkSelectedContainsWin(OSelectedIDs)) {
            gameResult = 1;
            currentTurnHTML.style.display = "none";
            playerWinNameHTML.innerHTML = OIcon;
            OScore++;
            OScoreHTML.innerHTML = OScore;
            whoWonHTML.style.display = "block";
            mainMenuButton.style.display = "block";
            settingsPostGameButton.style.display = "block";
            playAgainButton.style.display = "block";
        } else {
            if(XSelectedIDs.length + OSelectedIDs.length == 9) {
                gameResult = 2;
                currentTurnHTML.style.display = "none";
                itsATieHTML.style.display = "block";
                mainMenuButton.style.display = "block";
                settingsPostGameButton.style.display = "block";
                playAgainButton.style.display = "block";
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

function showXSelectionOption(n) {
    if (n > Xselections.length - 1) {
        XIconSlideIndex = 0;
    }    
    if (n < 0) {
        XIconSlideIndex = Xselections.length - 1;
    }
    for (let i = 0; i < Xselections.length; i++) {
        Xselections[i].style.display = "none";  
    }


    Xselections[XIconSlideIndex].style.display = "flex";  
    XIcon = Xselections[XIconSlideIndex].innerHTML;
  }

  function showOSelectionOption(n) {
    if (n >= Oselections.length) {
        OIconSlideIndex = 0;
    }    
    if (n < 0) {
        OIconSlideIndex = Oselections.length - 1;
    }
    for (let i = 0; i < Oselections.length; i++) {
        Oselections[i].style.display = "none";  
    }
    Oselections[OIconSlideIndex].style.display = "flex";
    OIcon = Oselections[OIconSlideIndex].innerHTML;
  }