class gamePiece {
    constructor(idElement, pieceNumber) {
        this.idElement = idElement;
        this.pieceNumber = pieceNumber;
        this.isSelected = false;
    }
}

const topLeft = 0;
const topMiddle = 1;
const topRight = 2;
const middleLeft = 3;
const center = 4;
const middleRight = 5;
const bottomLeft = 6;
const bottomMiddle = 7;
const bottomRight = 8;
const corners = [topLeft, topRight, bottomLeft, bottomRight];
const edges = [topMiddle, middleRight, bottomMiddle, middleLeft];

//Document Elements related to entire webpage
let wrapper = document.getElementById("wrapper");
let hoverOverButtons = document.getElementsByClassName("hoverOverSound");
let clickSoundButtons = document.getElementsByClassName("clickSound");

//Document Elements related to start menu
let startMenuWrapper = document.getElementById("startMenuWrapper");

//Document Elements related to main menu
let mainMenu = document.getElementById("mainMenu");
let startButton = document.getElementById("startButton");
let instructionsButton = document.getElementById("instructionsButton");
let settingsButton = document.getElementById("settingsButton");


//Document Elements related to settings menu
let settingsMenu = document.getElementById("settingsMenu");
let volumeSlider = document.getElementById("volumeSlider");
let settingsBackButton = document.getElementById("settingsBackButton");
let settingsTitle = document.getElementById("settingsTitle");
let suggestionsToggle = document.getElementById("suggestionsCheckBox");
let switchTurnsToggle = document.getElementById("switchTurnsCheckBox");
let AIToggle = document.getElementById("AICheckBox");
let settingsBackFromLocation = 0;
let Xselections = document.getElementsByClassName("Xselection");
let Oselections = document.getElementsByClassName("Oselection");
let XIconSelectionnext = document.getElementById("XIconSelectionnext");
let XIconSelectionprev = document.getElementById("XIconSelectionprev");
let OIconSelectionnext = document.getElementById("OIconSelectionnext");
let OIconSelectionprev = document.getElementById("OIconSelectionprev");
let settingsData = {};


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

let currentPlayer = 0;
let XScore = 0;
let OScore = 0;
let currentPlayerHTML = document.getElementById("currentPlayer");
let currentTurnHTML = document.getElementById("currentTurn");
let whoWonHTML = document.getElementById("whoWon");
let playerWinNameHTML = document.getElementById("playerWinName");
let itsATieHTML = document.getElementById("itsATie");
let XSelected = [];
let XSelectedIds = [];
let OSelectedIds = [];
let OSelected = [];
let gameResult = -1;
let whoStarts = 0;
let roundNumber = 0;
let AIwaitTime = 400;

//Audio Sounds
let XMoveAudio = new Audio("resources/Sounds/PlayerOneMove.wav");
let OMoveAudio = new Audio("resources/Sounds/PlayerTwoMove.wav");
let hoverOverAudio = new Audio("resources/Sounds/HoverOverButton.wav");
let clickAudio = new Audio("resources/Sounds/ClickButton.wav");
let gameStartAudio = new Audio("resources/Sounds/GameStart.wav");
let WinnerAudio = new Audio("resources/Sounds/Winner.wav");
let DrawAudio = new Audio("resources/Sounds/Draw.wav");

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

if(document.cookie.length == 0) {
    
    document.cookie = "volume=0.75;";
    document.cookie = "suggestions=true;";
    document.cookie = "switchTurns=false;"
    document.cookie = "AI=false";
    document.cookie = "XIcon=X;";
    document.cookie = "OIcon=O;";
    document.cookie = "XIconSlideIndex=0;"
    document.cookie = "OIconSlideIndex=1;"
    settingsData["volume"] = 0.75;
    settingsData["suggestions"] = true;
    settingsData["switchTurns"] = false;
    settingsData["AI"] = false;
    AIToggle.checked = !AIToggle.checked;
    settingsData["XIcon"] = "X";
    settingsData["OIcon"] = "O";
    settingsData["XIconSlideIndex"] = 0;
    settingsData["OIconSlideIndex"] = 1;

} else {
    let cookies = document.cookie.split(';');

    for(let i = 0; i < cookies.length; ++i) {
        if(cookies[i][0] == " ") {
            cookies[i] = cookies[i].substring(1);
        }
        settingsData[cookies[i].split("=")[0]] = cookies[i].split("=")[1];
    }
    volumeSlider.value = settingsData["volume"] * 100;
    if(settingsData["suggestions"] === "true") {
        settingsData["suggestions"] = true;
        suggestionsToggle.checked = !suggestionsToggle.checked;
    } else {
        settingsData["suggestions"] = false;
    }

    if(settingsData["switchTurns"] === "true") {
        settingsData["switchTurns"] = true;
        switchTurnsToggle.checked = !switchTurnsToggle.checked;
    } else {
        settingsData["switchTurns"] = false;
    }

    if(settingsData["AI"] === "true") {
        settingsData["AI"] = true;
        AIToggle.checked = !AIToggle.checked;
    } else {
        settingsData["AI"] = false;
    }

    settingsData["XIconSlideIndex"] = parseInt(settingsData["XIconSlideIndex"]);
    settingsData["OIconSlideIndex"] = parseInt(settingsData["OIconSlideIndex"]);
}
let dateCookiesExpire = new Date();
dateCookiesExpire.setDate(dateCookiesExpire.getDate() + 2);
document.cookie = "expires=" + dateCookiesExpire.toUTCString() + ";";

updateVolume();
showXSelectionOption(settingsData["XIconSlideIndex"]);
showOSelectionOption(settingsData["OIconSlideIndex"]);


document.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        // setTimeout(function() {
        startMenuWrapper.style.display = "none";
        wrapper.style.display = "grid";
        // }, 250);
        // startMenuWrapper.classList.add("hidden");
        gameStartAudio.play();
    }
})


for(let i = 0; i < 9; ++i) {
    gameboard[i].idElement.addEventListener("click", function() {squareClick(gameboard[i], true)});
    gameboard[i].idElement.addEventListener("mouseenter", function() {
        if(gameboard[i].isSelected || gameResult != -1 || !settingsData["suggestions"]) {
            return;
        }
        if(currentPlayer == 0) {
            gameboard[i].idElement.innerHTML = '<p id="hoverOver">' + settingsData["XIcon"] + '</p>';
        } else if(!settingsData["AI"]){
            gameboard[i].idElement.innerHTML = '<p id="hoverOver">'+ settingsData["OIcon"] + '</p>';
        } else {
            return;
        }
        stopHoverAudio();
        hoverOverAudio.play();
    });
    gameboard[i].idElement.addEventListener("mouseleave", function() {
        if(gameboard[i].isSelected || gameResult != -1 || !settingsData["suggestions"]) {
            return;
        }
        gameboard[i].idElement.innerHTML = "";
    })
}

for(let i = 0; i < hoverOverButtons.length; ++i) {
    hoverOverButtons[i].addEventListener("mouseenter", function() {
        stopHoverAudio();
        hoverOverAudio.play();
    })
}

for(let i = 0; i < clickSoundButtons.length; ++i) {
    clickSoundButtons[i].addEventListener("click", function() {
        stopHoverAudio();
        clickAudio.play();
    })
}

startButton.addEventListener("click", function() {
    whoStarts = 0;
    mainMenu.style.display = "none";
    XScoreHTML.innerHTML = XScore;
    OScoreHTML.innerHTML = OScore;
    currentTurnHTML.style.display = "block";
    game.style.display = "block";
    scoreTitle[0].style.display = "block";
    scoreTitle[1].style.display = "block";
    XName.innerHTML = settingsData["XIcon"];
    OName.innerHTML = settingsData["OIcon"];
    currentPlayerHTML.innerHTML = settingsData["XIcon"];
})


playAgainButton.addEventListener("click", function() {
    if(whoStarts == 0 && settingsData["switchTurns"]) {
        whoStarts = 1;
        currentPlayer = 1;
        currentPlayerHTML.innerHTML = settingsData["OIcon"];
    } else {
        whoStarts = 0;
        currentPlayer = 0;
        currentPlayerHTML.innerHTML = settingsData["XIcon"];
    }
    XSelected = [];
    XSelectedIds = [];
    OSelected = [];
    OSelectedIds = [];
    AIwaitTime = 400;
    mainMenuButton.style.display = "none";
    settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = "none";
    itsATieHTML.style.display = "none";
    whoWonHTML.style.display = "none";
    currentTurnHTML.style.display = "block";
    XName.innerHTML = settingsData["XIcon"];
    OName.innerHTML = settingsData["OIcon"];
    for(let i = 0; i < gameboard.length; ++i) {
        gameboard[i].isSelected = false;
        gameboard[i].idElement.innerHTML = "";
        gameboard[i].idElement.classList.add("unclicked");
    }
    gameResult = -1

    if(whoStarts == 1) {
        AIPlayMove();
    }
})

settingsPostGameButton.addEventListener("click", function() {
    game.style.display = "none";
    settingsMenu.style.display = "block";
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
    XSelectedIds = [];
    OSelected = [];
    OSelectedIds = [];
    currentPlayer = 0;
    gameResult = -1
    currentPlayerHTML.innerHTML = settingsData["XIcon"];
    whoWonHTML.style.display = "none";
    itsATieHTML.style.display = "none";
    for(let i = 0; i < gameboard.length; ++i) {
        gameboard[i].isSelected = false;
        gameboard[i].idElement.innerHTML = "";
    }

    game.style.display = "none";
    mainMenu.style.display = "grid";
    scoreTitle[0].style.display = "none";
    scoreTitle[1].style.display = "none";
    mainMenuButton.style.display = "none";
    settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = "none";
})

settingsButton.addEventListener("click", function() {
    settingsBackFromLocation = 0;
    mainMenu.style.display = "none";
    settingsTitle.style.display = "block";
    settingsMenu.style.display = "block";
    wrapper.style.display = "block";
})

XIconSelectionprev.addEventListener("click", function() {
    settingsData["XIconSlideIndex"] -= 1;
    showXSelectionOption(settingsData["XIconSlideIndex"]);
})
  
XIconSelectionnext.addEventListener("click", function() {
    settingsData["XIconSlideIndex"] += 1;
    showXSelectionOption(settingsData["XIconSlideIndex"]);
})

OIconSelectionprev.addEventListener("click", function() {
    settingsData["OIconSlideIndex"] -= 1;
    showOSelectionOption(settingsData["OIconSlideIndex"]);
})
  
OIconSelectionnext.addEventListener("click", function() {
    settingsData["OIconSlideIndex"] += 1;
    showOSelectionOption(settingsData["OIconSlideIndex"]);
})


settingsBackButton.addEventListener("click", function() {
    settingsMenu.style.display = "none";
    settingsTitle.style.display = "none";
    wrapper.style.display = "grid";
    if(settingsBackFromLocation == 0) {
        mainMenu.style.display = "grid";
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

        XName.innerHTML = settingsData["XIcon"];
        OName.innerHTML = settingsData["OIcon"];
        if(gameResult == 0) {
            playerWinNameHTML.innerHTML = settingsData["XIcon"];
        } else {
            playerWinNameHTML.innerHTML = settingsData["OIcon"];
        }
        for(let i = 0; i < XSelected.length; ++i) {
            gameboard[XSelected[i].pieceNumber].idElement.innerHTML = settingsData["XIcon"];
        }

        for(let i = 0; i < OSelected.length; ++i) {
            gameboard[OSelected[i].pieceNumber].idElement.innerHTML = settingsData["OIcon"];
        }
    }
})

volumeSlider.onmouseup = function() {
    clickAudio.play();
}

volumeSlider.oninput = function() {
    let newVolume = this.value / 100;
    settingsData["volume"] = newVolume;
    document.cookie = "volume=" + newVolume + ";";
    updateVolume();
}

suggestionsToggle.addEventListener("change", function() {
    if(settingsData["suggestions"]) {
        settingsData["suggestions"] = false;
        document.cookie = "suggestions=false;";
    } else {
        settingsData["suggestions"] = true;
        document.cookie = "suggestions=true;";
    }
})

switchTurnsCheckBox.addEventListener("change", function() {
    settingsData["switchTurns"] = !settingsData["switchTurns"];
    document.cookie = "switchTurns=" + settingsData["switchTurns"] + ";";
})

AIToggle.addEventListener("change", function() {
    settingsData["AI"] = !settingsData["AI"];
    document.cookie = "AI=" + settingsData["AI"] + ";";
})

instructionsButton.addEventListener("click", function() {
    mainMenu.style.display = "none";
    instructionsMenu.style.display = "grid";
    instructionsTitle.style.display = "block";
    wrapper.style.display = "block"
})

instructionsBackButton.addEventListener("click", function() {
    instructionsMenu.style.display = "none";
    instructionsTitle.style.display = "none";
    mainMenu.style.display = "grid";
    wrapper.style.display = "grid";
})


function squareClick(gamePiece, playerClicked) {
    if(currentPlayer == 0 && !gamePiece.isSelected && gameResult == -1) {
        gamePiece.idElement.innerHTML = '<p class="clicked">'+ settingsData["XIcon"] + '</p>';
        XSelected.push(gamePiece);
        XSelectedIds.push(gamePiece.pieceNumber);
        stopHoverAudio();
        currentPlayerHTML.innerHTML = settingsData["OIcon"];

    } else if(!gamePiece.isSelected && gameResult == -1 && ((!playerClicked && settingsData["AI"]) || (playerClicked && !settingsData["AI"]))) {
        gamePiece.idElement.innerHTML = '<p class="clicked">' + settingsData["OIcon"] + '</p>';
        OSelected.push(gamePiece);
        OSelectedIds.push(gamePiece.pieceNumber);
        stopHoverAudio();
        currentPlayerHTML.innerHTML = settingsData["XIcon"];
    } else {
        console.log("Error on line 446");
        return;
    }

    gamePiece.isSelected = true;
    gamePiece.idElement.classList.remove("unclicked");
    let result = checkWin();
    if(result == -1) {
        if(currentPlayer == 0) {
            XMoveAudio.play();
            currentPlayer = 1;
        } else {
            OMoveAudio.play();
            currentPlayer = 0;
        }
    } else if(result != 2) {
        WinnerAudio.play();
    } else {
        DrawAudio.play();
    }

    if(settingsData["AI"] && currentPlayer == 1 && gameResult == -1) {
        setTimeout(function(){
            AIPlayMove();
        }, AIwaitTime);
        AIwaitTime += 75;
    }
}

function checkWin() {
    if(checkSelectedContainsWin(XSelectedIds)) {
        gameResult = 0;
        currentTurnHTML.style.display = "none";
        playerWinNameHTML.innerHTML = settingsData["XIcon"];
        XScore++;
        XScoreHTML.innerHTML = XScore;
        whoWonHTML.style.display = "block";
        mainMenuButton.style.display = "block";
        settingsPostGameButton.style.display = "block";
        playAgainButton.style.display = "block";
        return 0;
    } else {
        if(checkSelectedContainsWin(OSelectedIds)) {
            gameResult = 1;
            currentTurnHTML.style.display = "none";
            playerWinNameHTML.innerHTML = settingsData["OIcon"];
            OScore++;
            OScoreHTML.innerHTML = OScore;
            whoWonHTML.style.display = "block";
            mainMenuButton.style.display = "block";
            settingsPostGameButton.style.display = "block";
            playAgainButton.style.display = "block";
            return 1;
        } else {
            if(XSelectedIds.length + OSelectedIds.length == 9) {
                gameResult = 2;
                currentTurnHTML.style.display = "none";
                itsATieHTML.style.display = "block";
                mainMenuButton.style.display = "block";
                settingsPostGameButton.style.display = "block";
                playAgainButton.style.display = "block";
                return 2;
            }
        }
    }
    return -1;
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
        settingsData["XIconSlideIndex"] = 0;
    }    
    if (n < 0) {
        settingsData["XIconSlideIndex"] = Xselections.length - 1;
    }
    for (let i = 0; i < Xselections.length; i++) {
        Xselections[i].style.display = "none";  
    }


    Xselections[settingsData["XIconSlideIndex"]].style.display = "flex";  
    settingsData["XIcon"] = Xselections[settingsData["XIconSlideIndex"]].innerHTML;
    document.cookie = "XIconSlideIndex=" + settingsData["XIconSlideIndex"] + ";";
  }

  function showOSelectionOption(n) {
    if (n >= Oselections.length) {
        settingsData["OIconSlideIndex"] = 0;
    }    
    if (n < 0) {
        settingsData["OIconSlideIndex"] = Oselections.length - 1;
    }
    for (let i = 0; i < Oselections.length; i++) {
        Oselections[i].style.display = "none";  
    }
    Oselections[settingsData["OIconSlideIndex"]].style.display = "flex";
    settingsData["OIcon"] = Oselections[settingsData["OIconSlideIndex"]].innerHTML;
    document.cookie = "OIconSlideIndex=" + settingsData["OIconSlideIndex"] + ";";
  }

  function updateVolume() {
      XMoveAudio.volume = settingsData["volume"];
      OMoveAudio.volume = settingsData["volume"];
      hoverOverAudio.volume = settingsData["volume"];
      clickAudio.volume = settingsData["volume"];
      gameStartAudio.volume = settingsData["volume"];
      WinnerAudio.volume = settingsData["volume"];
      DrawAudio.volume = settingsData["volume"];
  }

  function stopHoverAudio() {
    if(!hoverOverAudio.paused) {
        hoverOverAudio.pause();
    }
      hoverOverAudio.currentTime = 0;
  }

  function AIPlayMove() {
      let randomChance = Math.random();
      if(randomChance < 0.85) {
        if(AIEdgeWinTest(topMiddle, topLeft, topRight, center, bottomMiddle)) {
            squareClick(gameboard[topMiddle], false);
            return;
        } else if(AIEdgeWinTest(middleRight, center, middleLeft, topRight, bottomRight)) {
            squareClick(gameboard[middleRight], false);
            return;
        } else if(AIEdgeWinTest(bottomMiddle, bottomLeft, bottomRight, center, topMiddle)) {
            squareClick(gameboard[bottomMiddle], false);
            return;
        } else if(AIEdgeWinTest(middleLeft, center, middleRight, bottomLeft, topLeft)) {
            squareClick(gameboard[middleLeft], false);
            return;
        } else if(AICornerWinTest(topLeft, topMiddle, topRight, middleLeft, bottomLeft, bottomRight)) {
            squareClick(gameboard[topLeft], false);
            return;
        } else if(AICornerWinTest(topRight, topMiddle, topLeft, middleRight, bottomRight, bottomLeft)) {
            squareClick(gameboard[topRight], false);
            return;
        } else if(AICornerWinTest(bottomLeft, bottomMiddle, bottomRight, middleLeft, topLeft, topRight)) {
            squareClick(gameboard[bottomLeft], false);
            return;
        } else if(AICornerWinTest(bottomRight, bottomMiddle, bottomLeft, middleRight, topRight, topLeft)) {
            squareClick(gameboard[bottomRight], false);
            return;
        } else if(AIEdgeBlockTest(topMiddle, topLeft, topRight, center, bottomMiddle)) {
            squareClick(gameboard[topMiddle], false);
            return;
        } else if(AIEdgeBlockTest(middleRight, center, middleLeft, topRight, bottomRight)) {
            squareClick(gameboard[middleRight], false);
            return;
        } else if(AIEdgeBlockTest(bottomMiddle, bottomLeft, bottomRight, center, topMiddle)) {
            squareClick(gameboard[bottomMiddle], false);
            return;
        } else if(AIEdgeBlockTest(middleLeft, center, middleRight, bottomLeft, topLeft)) {
            squareClick(gameboard[middleLeft], false);
            return;
        } else if(AICornerBlockTest(topLeft, topMiddle, topRight, middleLeft, bottomRight)) {
            squareClick(gameboard[topLeft], false);
            return;
        } else if(AICornerBlockTest(topRight, topMiddle, topLeft, middleRight, bottomRight, bottomLeft)) {
            squareClick(gameboard[topRight], false);
            return;
        } else if(AICornerBlockTest(bottomRight, bottomMiddle, bottomRight, middleLeft, topLeft, topRight)) {
            squareClick(gameboard[bottomLeft], false);
            return;
        } else if(AICornerBlockTest(bottomRight, bottomMiddle, bottomLeft, middleRight, topRight, topLeft)) {
            squareClick(gameboard[bottomRight], false);
            return;
        } else if(!XSelected.includes(gameboard[center]) && !OSelected.includes(gameboard[center])) {
            squareClick(gameboard[center], false);
            return;
        }
      }
        let potentialSquare = Math.floor(Math.random() * 9);
        while((XSelectedIds.includes(potentialSquare) || OSelectedIds.includes(potentialSquare))) {
            potentialSquare = Math.floor(Math.random() * 9);
        }
        squareClick(gameboard[potentialSquare], false);
    }

    function AIEdgeBlockTest(edge, horizontalOne, horizontalTwo, verticalOne, verticalTwo) {
        if(
            (!OSelectedIds.includes(edge) && XSelectedIds.includes(horizontalOne) && XSelectedIds.includes(horizontalTwo))
         || (!OSelectedIds.includes(edge) && XSelectedIds.includes(verticalOne) && XSelectedIds.includes(verticalTwo))) {
             return true;
         } else {
             return false;
         }
     }

    function AICornerBlockTest(corner, horizontalOne, horizontalTwo, verticalOne, verticalTwo, diagonal) {
        if(
           (!OSelectedIds.includes(corner) && XSelectedIds.includes(horizontalOne) && XSelectedIds.includes(horizontalTwo))
        || (!OSelectedIds.includes(corner) && XSelectedIds.includes(verticalOne) && XSelectedIds.includes(verticalTwo))
        || (!OSelectedIds.includes(corner) && XSelectedIds.includes(center) && XSelectedIds.includes(diagonal))) {
            return true;
        } else {
            return false;
        }
    }

    function AIEdgeWinTest(edge, horizontalOne, horizontalTwo, verticalOne, verticalTwo) {
        if(
            (!XSelectedIds.includes(edge) && OSelectedIds.includes(horizontalOne) && OSelectedIds.includes(horizontalTwo))
         || (!XSelectedIds.includes(edge) && OSelectedIds.includes(verticalOne) && OSelectedIds.includes(verticalTwo))) {
             return true;
         } else {
             return false;
         }
     }

     function AICornerWinTest(corner, horizontalOne, horizontalTwo, verticalOne, verticalTwo, diagonal) {
        if(
           (!XSelectedIds.includes(corner) && OSelectedIds.includes(horizontalOne) && OSelectedIds.includes(horizontalTwo))
        || (!XSelectedIds.includes(corner) && OSelectedIds.includes(verticalOne) && OSelectedIds.includes(verticalTwo))
        || (!XSelectedIds.includes(corner) && OSelectedIds.includes(center) && OSelectedIds.includes(diagonal))) {
            return true;
        } else {
            return false;
        }
    }