class gamePiece {
    constructor(idElement, pieceNumber) {
        this.idElement = idElement;
        this.pieceNumber = pieceNumber;
        this.isSelected = false;
    }
}

//Indexes of each square
const TOPLEFT = 0;
const TOPMIDDLE = 1;
const TOPRIGHT = 2;
const MIDDLELEFT = 3;
const CENTER = 4;
const MIDDLERIGHT = 5;
const BOTTOMLEFT = 6;
const BOTTOMMIDDLE = 7;
const BOTTOMRIGHT = 8;

const GAMEMENU = -3;
const MAINMENU = -2
const NOTFINISHED = -1;
const PLAYERONE = 0;
const PLAYERTWO = 1;
const DRAW = 2;

let gameData = {
    currentPlayer: PLAYERONE,
    playerOneScore: 0,
    playerTwoScore: 0,
    playerOneSelected: [],
    playerOneSelectedIds: [],
    playerTwoSelected: [],
    playerTwoSelectedIds: [],
    gameResult: GAMEMENU,
    whoStarts: PLAYERONE,
    AIwaitTime: 400,
    settingsBackFromLocation: 0,
    settingsData: {}
}


let currentPlayerHTML = document.getElementById("currentPlayer");
let currentTurnHTML = document.getElementById("currentTurn");
let whoWonHTML = document.getElementById("whoWon");
let playerWinNameHTML = document.getElementById("playerWinName");
let itsATieHTML = document.getElementById("itsATie");


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
let playerOneSelections = document.getElementsByClassName("playerOneselection");
let playerTwoSelections = document.getElementsByClassName("playerTwoselection");
let playerOneIconSelectionnext = document.getElementById("playerOneIconSelectionnext");
let playerOneIconSelectionprev = document.getElementById("playerOneIconSelectionprev");
let playerTwoIconSelectionnext = document.getElementById("playerTwoIconSelectionnext");
let playerTwoIconSelectionprev = document.getElementById("playerTwoIconSelectionprev");

//Document Elements related to instructions menu
let instructionsMenu = document.getElementById("instructionsMenu");
let instructionsTitle = document.getElementById("instructionsTitle");
let instructionsBackButton = document.getElementById("instructionsBackButton");


//Document Elements related to the game
let game = document.getElementById("game");
let scoreTitle = document.getElementsByClassName("scoreTitle");
let playerOneScoreHTML = document.getElementById("playerOneScore");
let playerTwoScoreHTML = document.getElementById("playerTwoScore");
let mainMenuButton = document.getElementById("mainMenuButton");
let settingsPostGameButton = document.getElementById("settingsPostGameButton")
let playAgainButton = document.getElementById("playAgainButton");
let saveGameBoard = document.getElementById("saveGameBoard");
let downloadImageLink = document.getElementById("downloadImageLink");
let downloadImageCanvas = document.getElementById("downloadImageCanvas");
let playerOneName = document.getElementById("playerOneName");
let playerTwoName = document.getElementById("playerTwoName");

//Audio Sounds
let playerOneMoveAudio = document.getElementById("playerOneMoveAudio");
let playerTwoMoveAudio = document.getElementById("playerTwoMoveAudio");
let hoverOverAudio = document.getElementById("hoverOverAudio");
let clickAudio = document.getElementById("clickAudio");
let gameStartAudio = document.getElementById("gameStartAudio");
let WinnerAudio =  document.getElementById("WinnerAudio");
let DrawAudio = document.getElementById("DrawAudio");

//Document Elements related to gameboard
let board = document.getElementById("board");
let topLeftId = document.getElementById("topLeft");
let topMiddleId = document.getElementById("topMiddle");
let topRightId = document.getElementById("topRight");
let middleLeftId = document.getElementById("middleLeft");
let centerId = document.getElementById("center");
let middleRightId = document.getElementById("middleRight");
let bottomLeftId = document.getElementById("bottomLeft");
let bottomMiddleId = document.getElementById("bottomMiddle");
let bottomRightId = document.getElementById("bottomRight");

let gameboard = [new gamePiece(topLeftId, TOPLEFT),
                 new gamePiece(topMiddleId, TOPMIDDLE),
                 new gamePiece(topRightId, TOPRIGHT),
                 new gamePiece(middleLeftId, MIDDLELEFT),
                 new gamePiece(centerId, CENTER),
                 new gamePiece(middleRightId, MIDDLERIGHT),
                 new gamePiece(bottomLeftId, BOTTOMLEFT),
                 new gamePiece(bottomMiddleId, BOTTOMMIDDLE),
                 new gamePiece(bottomRightId, BOTTOMRIGHT)];

if(document.cookie.length == 0) {
    document.cookie = "volume=0.50;";
    document.cookie = "suggestions=true;";
    document.cookie = "switchTurns=false;"
    document.cookie = "AI=false";
    document.cookie = "playerOneIcon=X;";
    document.cookie = "playerTwoIcon=O;";
    document.cookie = "playerOneIconSlideIndex=0;"
    document.cookie = "playerTwoIconSlideIndex=1;"
    gameData.settingsData["volume"] = 0.50;
    gameData.settingsData["suggestions"] = true;
    gameData.settingsData["switchTurns"] = false;
    gameData.settingsData["AI"] = false;
    gameData.settingsData["playerOneIcon"] = "X";
    gameData.settingsData["playerTwoIcon"] = "O";
    gameData.settingsData["playerOneIconSlideIndex"] = PLAYERONE;
    gameData.settingsData["playerTwoIconSlideIndex"] = PLAYERTWO;

} else {
    let cookies = document.cookie.split(';');

    for(let i = 0; i < cookies.length; ++i) {
        if(cookies[i][0] == " ") {
            cookies[i] = cookies[i].substring(1);
        }
        gameData.settingsData[cookies[i].split("=")[0]] = cookies[i].split("=")[1];
    }
    volumeSlider.value = gameData.settingsData["volume"] * 100;

    gameData.settingsData["suggestions"] = gameData.settingsData["suggestions"] === "true";
    gameData.settingsData["switchTurns"] = gameData.settingsData["switchTurns"] === "true";
    gameData.settingsData["AI"] = gameData.settingsData["AI"] === "true";

    if(gameData.settingsData["suggestions"]) {
        suggestionsToggle.checked = true;
    }

    if(gameData.settingsData["switchTurns"]) {
        switchTurnsToggle.checked = true;
    }

    if(gameData.settingsData["AI"]) {
        AIToggle.checked = true;
    }

    gameData.settingsData["playerOneIconSlideIndex"] = parseInt(gameData.settingsData["playerOneIconSlideIndex"]);
    gameData.settingsData["playerTwoIconSlideIndex"] = parseInt(gameData.settingsData["playerTwoIconSlideIndex"]);
}
let dateCookiesExpire = new Date();
dateCookiesExpire.setDate(dateCookiesExpire.getDate() + 2);
document.cookie = "expires=" + dateCookiesExpire.toUTCString() + ";";

updateVolume();
showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);


document.addEventListener("keyup", function(event) {
    if(event.key === "Enter" && gameData.gameResult == GAMEMENU) {
        gameData.gameResult = MAINMENU;
        startMenuWrapper.style.display = "none";
        wrapper.style.display = "grid";
        gameStartAudio.play();
    }
});


for(let i = 0; i < 9; ++i) {
    gameboard[i].idElement.addEventListener("click", function() {squareClick(gameboard[i], true)});
    gameboard[i].idElement.addEventListener("mouseenter", function() {
        if(gameboard[i].isSelected || gameData.gameResult != NOTFINISHED || !gameData.settingsData["suggestions"]) {
            return;
        }
        if(gameData.currentPlayer == 0) {
            gameboard[i].idElement.innerHTML = '<p id="hoverOver">' + gameData.settingsData["playerOneIcon"] + '</p>';
        } else if(!gameData.settingsData["AI"]){
            gameboard[i].idElement.innerHTML = '<p id="hoverOver">'+ gameData.settingsData["playerTwoIcon"] + '</p>';
        } else {
            return;
        }
        stopHoverAudio();
        hoverOverAudio.play();
    });

    gameboard[i].idElement.addEventListener("mouseleave", function() {
        if(gameboard[i].isSelected || gameData.gameResult != NOTFINISHED || !gameData.settingsData["suggestions"]) {
            return;
        }
        gameboard[i].idElement.innerHTML = "";
    });
}

for(let i = 0; i < hoverOverButtons.length; ++i) {
    hoverOverButtons[i].addEventListener("mouseenter", function() {
        stopHoverAudio();
        hoverOverAudio.play();
    });
}

for(let i = 0; i < clickSoundButtons.length; ++i) {
    clickSoundButtons[i].addEventListener("click", function() {
        playClickAudio();
    });
}

startButton.addEventListener("click", function() {
    gameData.gameResult = NOTFINISHED;
    gameData.whoStarts = PLAYERONE;
    mainMenu.style.display = "none";
    playerOneScoreHTML.innerHTML = gameData.playerOneScore;
    playerTwoScoreHTML.innerHTML = gameData.playerTwoScore;
    currentTurnHTML.style.display = "block";
    game.style.display = "grid";
    scoreTitle[PLAYERONE].style.display = "block";
    scoreTitle[PLAYERTWO].style.display = "block";
    playerOneName.innerHTML = gameData.settingsData["playerOneIcon"];
    playerTwoName.innerHTML = gameData.settingsData["playerTwoIcon"];
    currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
});


playAgainButton.addEventListener("click", function() {
    if(gameData.whoStarts == PLAYERONE && gameData.settingsData["switchTurns"]) {
        gameData.whoStarts = PLAYERTWO;
        gameData.currentPlayer = PLAYERTWO;
        currentPlayerHTML.innerHTML = gameData.settingsData["playerTwoIcon"];
    } else {
        gameData.whoStarts = PLAYERONE;
        gameData.currentPlayer = PLAYERONE;
        currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    }
    gameData.playerOneSelected = [];
    gameData.playerOneSelectedIds = [];
    gameData.playerTwoSelected = [];
    gameData.playerTwoSelectedIds = [];
    gameData.AIwaitTime = 400;
    mainMenuButton.style.display = "none";
    settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = "none";
    saveGameBoard.style.display = "none";
    itsATieHTML.style.display = "none";
    whoWonHTML.style.display = "none";
    currentTurnHTML.style.display = "block";
    playerOneName.innerHTML = gameData.settingsData["playerOneIcon"];
    playerTwoName.innerHTML = gameData.settingsData["playerTwoIcon"];
    for(let i = 0; i < gameboard.length; ++i) {
        gameboard[i].isSelected = false;
        gameboard[i].idElement.innerHTML = "";
        gameboard[i].idElement.classList.add("unclicked");
    }
    gameData.gameResult = NOTFINISHED;

    if(gameData.whoStarts == PLAYERTWO) {
        AIPlayMove();
    }
});

saveGameBoard.addEventListener("click", function() {
    html2canvas(board).then(function(canvas) {
        let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        console.log(image);
        downloadImageLink.href = image;
        downloadImageLink.download = gameData.playerOneScore + "-" + gameData.playerTwoScore + ".png";
        downloadImageLink.click();
    });
})

settingsPostGameButton.addEventListener("click", function() {
    game.style.display = "none";
    settingsMenu.style.display = "block";
    mainMenuButton.style.display = "none";
    settingsPostGameButton.style.display = "none";
    wrapper.style.display = "block";
    playAgainButton.style.display = "none";
    saveGameBoard.style.display = "none";
    scoreTitle[PLAYERONE].style.display = "none";
    scoreTitle[PLAYERTWO].style.display = "none";
    itsATieHTML.style.display = "none";
    whoWonHTML.style.display = "none";
    gameData.settingsBackFromLocation = 1;
});

mainMenuButton.addEventListener("click", function() {
    gameData.playerOneSelected = [];
    gameData.playerOneSelectedIds = [];
    gameData.playerTwoSelected = [];
    gameData.playerTwoSelectedIds = [];
    gameData.playerOneScore = 0;
    gameData.playerTwoScore = 0;
    gameData.currentPlayer = PLAYERONE;
    gameData.gameResult = MAINMENU;
    currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    whoWonHTML.style.display = "none";
    itsATieHTML.style.display = "none";
    for(let i = 0; i < gameboard.length; ++i) {
        gameboard[i].isSelected = false;
        gameboard[i].idElement.innerHTML = "";
    }

    game.style.display = "none";
    mainMenu.style.display = "grid";
    scoreTitle[PLAYERONE].style.display = "none";
    scoreTitle[PLAYERTWO].style.display = "none";
    mainMenuButton.style.display = "none";
    settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = "none";
    saveGameBoard.style.display = "none";
});

settingsButton.addEventListener("click", function() {
    gameData.settingsBackFromLocation = 0;
    mainMenu.style.display = "none";
    settingsTitle.style.display = "block";
    settingsMenu.style.display = "block";
    wrapper.style.display = "block";
});

playerOneIconSelectionprev.addEventListener("click", function() {
    (gameData.settingsData["playerOneIconSlideIndex"])--;
    showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    if(gameData.settingsData["playerOneIconSlideIndex"] == gameData.settingsData["playerTwoIconSlideIndex"]) {
        (gameData.settingsData["playerOneIconSlideIndex"])--;
        showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    }
});

playerOneIconSelectionnext.addEventListener("click", function() {
    (gameData.settingsData["playerOneIconSlideIndex"])++;
    showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    if(gameData.settingsData["playerOneIconSlideIndex"] == gameData.settingsData["playerTwoIconSlideIndex"]) {
        (gameData.settingsData["playerOneIconSlideIndex"])++;
        showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    }
});

playerTwoIconSelectionprev.addEventListener("click", function() {
    (gameData.settingsData["playerTwoIconSlideIndex"])--;
    showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    if(gameData.settingsData["playerTwoIconSlideIndex"] == gameData.settingsData["playerOneIconSlideIndex"]) {
        (gameData.settingsData["playerTwoIconSlideIndex"])--;
        showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    }
});

playerTwoIconSelectionnext.addEventListener("click", function() {
    (gameData.settingsData["playerTwoIconSlideIndex"])++;
    showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    if(gameData.settingsData["playerTwoIconSlideIndex"] == gameData.settingsData["playerOneIconSlideIndex"]) {
        (gameData.settingsData["playerTwoIconSlideIndex"])++;
        showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    }
});


settingsBackButton.addEventListener("click", function() {
    settingsMenu.style.display = "none";
    settingsTitle.style.display = "none";
    wrapper.style.display = "grid";
    if(gameData.settingsBackFromLocation == 0) {
        mainMenu.style.display = "grid";
    } else if(gameData.settingsBackFromLocation == 1) {
        game.style.display = "grid";
        scoreTitle[PLAYERONE].style.display = "block";
        scoreTitle[PLAYERTWO].style.display = "block";
        mainMenuButton.style.display = "block";
        settingsPostGameButton.style.display = "block";
        playAgainButton.style.display = "block";
        saveGameBoard.style.display = "block";
        if(gameData.gameResult == PLAYERONE || gameData.gameResult == PLAYERTWO) {
            whoWonHTML.style.display = "block";
        } else {
            itsATieHTML.style.display = "block";
        }

        playerOneName.innerHTML = gameData.settingsData["playerOneIcon"];
        playerTwoName.innerHTML = gameData.settingsData["playerTwoIcon"];
        if(gameData.gameResult == PLAYERONE) {
            playerWinNameHTML.innerHTML = gameData.settingsData["playerOneIcon"];
        } else {
            playerWinNameHTML.innerHTML = gameData.settingsData["playerTwoIcon"];
        }
        for(let i = 0; i < gameData.playerOneSelected.length; ++i) {
            gameboard[gameData.playerOneSelected[i].pieceNumber].idElement.innerHTML = gameData.settingsData["playerOneIcon"];
        }

        for(let i = 0; i < gameData.playerTwoSelected.length; ++i) {
            gameboard[gameData.playerTwoSelected[i].pieceNumber].idElement.innerHTML = gameData.settingsData["playerTwoIcon"];
        }
    }
});

volumeSlider.addEventListener("input", function() {
    let newVolume = this.value / 100;
    gameData.settingsData["volume"] = newVolume;
    document.cookie = "volume=" + newVolume + ";";
    updateVolume();
});

volumeSlider.addEventListener("mouseup", function() {
    clickAudio.play();
});

suggestionsToggle.addEventListener("change", function() {
    gameData.settingsData["suggestions"] = !gameData.settingsData["suggestions"];
    document.cookie = "suggestions=" + gameData.settingsData["suggestions"] + ";";
});

switchTurnsCheckBox.addEventListener("change", function() {
    gameData.settingsData["switchTurns"] = !gameData.settingsData["switchTurns"];
    gameData.whoStarts = 0;
    document.cookie = "switchTurns=" + gameData.settingsData["switchTurns"] + ";";
});

AIToggle.addEventListener("change", function() {
    gameData.settingsData["AI"] = !gameData.settingsData["AI"];
    document.cookie = "AI=" + gameData.settingsData["AI"] + ";";
});

instructionsButton.addEventListener("click", function() {
    mainMenu.style.display = "none";
    instructionsMenu.style.display = "grid";
    instructionsTitle.style.display = "block";
    wrapper.style.display = "block"
});

instructionsBackButton.addEventListener("click", function() {
    instructionsMenu.style.display = "none";
    instructionsTitle.style.display = "none";
    mainMenu.style.display = "grid";
    wrapper.style.display = "grid";
});


function squareClick(gamePiece, playerClicked) {
    if(gameData.currentPlayer == PLAYERONE && !gamePiece.isSelected && gameData.gameResult == NOTFINISHED) {
        gamePiece.idElement.innerHTML = '<p class="clicked">'+ gameData.settingsData["playerOneIcon"] + '</p>';
        gameData.playerOneSelected.push(gamePiece);
        gameData.playerOneSelectedIds.push(gamePiece.pieceNumber);
        stopHoverAudio();
        currentPlayerHTML.innerHTML = gameData.settingsData["playerTwoIcon"];

    } else if(!gamePiece.isSelected && gameData.gameResult == NOTFINISHED && ((!playerClicked && gameData.settingsData["AI"]) || (playerClicked && !gameData.settingsData["AI"]))) {
        gamePiece.idElement.innerHTML = '<p class="clicked">' + gameData.settingsData["playerTwoIcon"] + '</p>';
        gameData.playerTwoSelected.push(gamePiece);
        gameData.playerTwoSelectedIds.push(gamePiece.pieceNumber);
        stopHoverAudio();
        currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    } else {
        return;
    }

    gamePiece.isSelected = true;
    gamePiece.idElement.classList.remove("unclicked");
    let result = checkWin();
    if(result == NOTFINISHED) {
        if(gameData.currentPlayer == PLAYERONE) {
            playerOneMoveAudio.play();
            gameData.currentPlayer = PLAYERTWO;
        } else {
            playerTwoMoveAudio.play();
            gameData.currentPlayer = PLAYERONE;
        }
    } else if(result != DRAW) {
        WinnerAudio.play();
    } else {
        DrawAudio.play();
    }

    if(gameData.settingsData["AI"] && gameData.currentPlayer == PLAYERTWO && gameData.gameResult == NOTFINISHED) {
        setTimeout(function(){
            AIPlayMove();
        }, gameData.AIwaitTime);
        gameData.AIwaitTime += 75;
    }
}

function checkWin() {
    if(checkSelectedContainsWin(gameData.playerOneSelectedIds)) {
        gameData.gameResult = PLAYERONE;
        currentTurnHTML.style.display = "none";
        playerWinNameHTML.innerHTML = gameData.settingsData["playerOneIcon"];
        gameData.playerOneScore++;
        playerOneScoreHTML.innerHTML = gameData.playerOneScore;
        whoWonHTML.style.display = "block";
        mainMenuButton.style.display = "block";
        settingsPostGameButton.style.display = "block";
        playAgainButton.style.display = "block";
        saveGameBoard.style.display = "block";
        return PLAYERONE;
    } else {
        if(checkSelectedContainsWin(gameData.playerTwoSelectedIds)) {
            gameData.gameResult = PLAYERTWO;
            currentTurnHTML.style.display = "none";
            playerWinNameHTML.innerHTML = gameData.settingsData["playerTwoIcon"];
            gameData.playerTwoScore++;
            playerTwoScoreHTML.innerHTML = gameData.playerTwoScore;
            whoWonHTML.style.display = "block";
            mainMenuButton.style.display = "block";
            settingsPostGameButton.style.display = "block";
            playAgainButton.style.display = "block";
            saveGameBoard.style.display = "block";
            return PLAYERTWO;
        } else {
            if(gameData.playerOneSelectedIds.length + gameData.playerTwoSelectedIds.length == 9) {
                gameData.gameResult = DRAW;
                currentTurnHTML.style.display = "none";
                itsATieHTML.style.display = "block";
                mainMenuButton.style.display = "block";
                settingsPostGameButton.style.display = "block";
                playAgainButton.style.display = "block";
                saveGameBoard.style.display = "block";
                return DRAW;
            }
        }
    }
    return NOTFINISHED;
}

function checkSelectedContainsWin(selectedIds) {
    return (selectedIds.includes(TOPLEFT) && selectedIds.includes(TOPMIDDLE) && selectedIds.includes(TOPRIGHT))
        || (selectedIds.includes(MIDDLELEFT) && selectedIds.includes(CENTER) && selectedIds.includes(MIDDLERIGHT))
        || (selectedIds.includes(BOTTOMLEFT) && selectedIds.includes(BOTTOMMIDDLE) && selectedIds.includes(BOTTOMRIGHT))
        || (selectedIds.includes(TOPLEFT) && selectedIds.includes(MIDDLELEFT) && selectedIds.includes(BOTTOMLEFT))
        || (selectedIds.includes(TOPMIDDLE) && selectedIds.includes(CENTER) && selectedIds.includes(BOTTOMMIDDLE))
        || (selectedIds.includes(TOPRIGHT) && selectedIds.includes(MIDDLERIGHT) && selectedIds.includes(BOTTOMRIGHT))
        || (selectedIds.includes(TOPLEFT) && selectedIds.includes(CENTER) && selectedIds.includes(BOTTOMRIGHT))
        || (selectedIds.includes(TOPRIGHT) && selectedIds.includes(CENTER) && selectedIds.includes(BOTTOMLEFT));
}

function showPlayerOneSelectionOption(n) {
    if (n > playerOneSelections.length - 1) {
        gameData.settingsData["playerOneIconSlideIndex"] = 0;
    }
    if (n < 0) {
        gameData.settingsData["playerOneIconSlideIndex"] = playerOneSelections.length - 1;
    }
    for (let i = 0; i < playerOneSelections.length; i++) {
        playerOneSelections[i].style.display = "none";  
    }

    playerOneSelections[gameData.settingsData["playerOneIconSlideIndex"]].style.display = "flex";  
    gameData.settingsData["playerOneIcon"] = playerOneSelections[gameData.settingsData["playerOneIconSlideIndex"]].innerHTML;
    document.cookie = "playerOneIconSlideIndex=" + gameData.settingsData["playerOneIconSlideIndex"] + ";";
  }

  function showPlayerTwoSelectionOption(n) {
    if (n >= playerTwoSelections.length) {
        gameData.settingsData["playerTwoIconSlideIndex"] = 0;
    }
    if (n < 0) {
        gameData.settingsData["playerTwoIconSlideIndex"] = playerTwoSelections.length - 1;
    }
    for (let i = 0; i < playerTwoSelections.length; i++) {
        playerTwoSelections[i].style.display = "none";  
    }
    playerTwoSelections[gameData.settingsData["playerTwoIconSlideIndex"]].style.display = "flex";
    gameData.settingsData["playerTwoIcon"] = playerTwoSelections[gameData.settingsData["playerTwoIconSlideIndex"]].innerHTML;
    document.cookie = "playerTwoIconSlideIndex=" + gameData.settingsData["playerTwoIconSlideIndex"] + ";";
  }

  function updateVolume() {
      playerOneMoveAudio.volume = gameData.settingsData["volume"];
      playerTwoMoveAudio.volume = gameData.settingsData["volume"];
      hoverOverAudio.volume = gameData.settingsData["volume"];
      clickAudio.volume = gameData.settingsData["volume"];
      gameStartAudio.volume = gameData.settingsData["volume"];
      WinnerAudio.volume = gameData.settingsData["volume"];
      DrawAudio.volume = gameData.settingsData["volume"];
  }

  function stopHoverAudio() {
    if(!hoverOverAudio.paused) {
        hoverOverAudio.pause();
    }
      hoverOverAudio.currentTime = 0;
  }

  function playClickAudio() {
    if(!clickAudio.paused) {
        clickAudio.pause();
        clickAudio.currentTime = 0;
    }
    let promise = clickAudio.play();

    promise.catch(function() {
        clickAudio.currentTime = 0;
    });
 }

  function AIPlayMove() {
    let randomChance = Math.random();
    if(randomChance < 0.80) {
      if(AIEdgeWinTest(TOPMIDDLE, TOPLEFT, TOPRIGHT, CENTER, BOTTOMMIDDLE)) {
          squareClick(gameboard[TOPMIDDLE], false);
          return;
      } else if(AIEdgeWinTest(MIDDLERIGHT, CENTER, MIDDLELEFT, TOPRIGHT, BOTTOMRIGHT)) {
          squareClick(gameboard[MIDDLERIGHT], false);
          return;
      } else if(AIEdgeWinTest(BOTTOMMIDDLE, BOTTOMLEFT, BOTTOMRIGHT, CENTER, TOPMIDDLE)) {
          squareClick(gameboard[BOTTOMMIDDLE], false);
          return;
      } else if(AIEdgeWinTest(MIDDLELEFT, CENTER, MIDDLERIGHT, BOTTOMLEFT, TOPLEFT)) {
          squareClick(gameboard[MIDDLELEFT], false);
          return;
      } else if(AICornerWinTest(TOPLEFT, TOPMIDDLE, TOPRIGHT, MIDDLELEFT, BOTTOMLEFT, BOTTOMRIGHT)) {
          squareClick(gameboard[TOPLEFT], false);
          return;
      } else if(AICornerWinTest(TOPRIGHT, TOPMIDDLE, TOPLEFT, MIDDLERIGHT, BOTTOMRIGHT, BOTTOMLEFT)) {
          squareClick(gameboard[TOPRIGHT], false);
          return;
      } else if(AICornerWinTest(BOTTOMLEFT, BOTTOMMIDDLE, BOTTOMRIGHT, MIDDLELEFT, TOPLEFT, TOPRIGHT)) {
          squareClick(gameboard[BOTTOMLEFT], false);
          return;
      } else if(AICornerWinTest(BOTTOMRIGHT, BOTTOMMIDDLE, BOTTOMLEFT, MIDDLERIGHT, TOPRIGHT, TOPLEFT)) {
          squareClick(gameboard[BOTTOMRIGHT], false);
          return;
      } else if(AIEdgeBlockTest(TOPMIDDLE, TOPLEFT, TOPRIGHT, CENTER, BOTTOMMIDDLE)) {
          squareClick(gameboard[TOPMIDDLE], false);
          return;
      } else if(AIEdgeBlockTest(MIDDLERIGHT, CENTER, MIDDLELEFT, TOPRIGHT, BOTTOMRIGHT)) {
          squareClick(gameboard[MIDDLERIGHT], false);
          return;
      } else if(AIEdgeBlockTest(BOTTOMMIDDLE, BOTTOMLEFT, BOTTOMRIGHT, CENTER, TOPMIDDLE)) {
          squareClick(gameboard[BOTTOMMIDDLE], false);
          return;
      } else if(AIEdgeBlockTest(MIDDLELEFT, CENTER, MIDDLERIGHT, BOTTOMLEFT, TOPLEFT)) {
          squareClick(gameboard[MIDDLELEFT], false);
          return;
      } else if(AICornerBlockTest(TOPLEFT, TOPMIDDLE, TOPRIGHT, MIDDLELEFT, BOTTOMLEFT, BOTTOMRIGHT)) {
          squareClick(gameboard[TOPLEFT], false);
          return;
      } else if(AICornerBlockTest(TOPRIGHT, TOPMIDDLE, TOPLEFT, MIDDLERIGHT, BOTTOMRIGHT, BOTTOMLEFT)) {
          squareClick(gameboard[TOPRIGHT], false);
          return;
      } else if(AICornerBlockTest(BOTTOMLEFT, BOTTOMMIDDLE, BOTTOMRIGHT, MIDDLELEFT, TOPLEFT, TOPRIGHT)) {
          squareClick(gameboard[BOTTOMLEFT], false);
          return;
      } else if(AICornerBlockTest(BOTTOMRIGHT, BOTTOMMIDDLE, BOTTOMLEFT, MIDDLERIGHT, TOPRIGHT, TOPLEFT)) {
          squareClick(gameboard[BOTTOMRIGHT], false);
          return;
      } else if(!gameData.playerOneSelected.includes(gameboard[CENTER]) && !gameData.playerTwoSelected.includes(gameboard[CENTER])) {
          squareClick(gameboard[CENTER], false);
          return;
      }
    }
      let potentialSquare = Math.floor(Math.random() * 9);
      while((gameData.playerOneSelectedIds.includes(potentialSquare) || gameData.playerTwoSelectedIds.includes(potentialSquare))) {
          potentialSquare = Math.floor(Math.random() * 9);
      }
      squareClick(gameboard[potentialSquare], false);
  }

    function AIEdgeBlockTest(edge, horizontalOne, horizontalTwo, verticalOne, verticalTwo) {
        return (!gameData.playerTwoSelectedIds.includes(edge) && gameData.playerOneSelectedIds.includes(horizontalOne) && gameData.playerOneSelectedIds.includes(horizontalTwo))
            || (!gameData.playerTwoSelectedIds.includes(edge) && gameData.playerOneSelectedIds.includes(verticalOne) && gameData.playerOneSelectedIds.includes(verticalTwo));
     }

    function AICornerBlockTest(corner, horizontalOne, horizontalTwo, verticalOne, verticalTwo, diagonal) {
        return (!gameData.playerTwoSelectedIds.includes(corner) && gameData.playerOneSelectedIds.includes(horizontalOne) && gameData.playerOneSelectedIds.includes(horizontalTwo))
            || (!gameData.playerTwoSelectedIds.includes(corner) && gameData.playerOneSelectedIds.includes(verticalOne) && gameData.playerOneSelectedIds.includes(verticalTwo))
            || (!gameData.playerTwoSelectedIds.includes(corner) && gameData.playerOneSelectedIds.includes(CENTER) && gameData.playerOneSelectedIds.includes(diagonal));
    }

    function AIEdgeWinTest(edge, horizontalOne, horizontalTwo, verticalOne, verticalTwo) {
        return (!gameData.playerOneSelectedIds.includes(edge) && gameData.playerTwoSelectedIds.includes(horizontalOne) && gameData.playerTwoSelectedIds.includes(horizontalTwo))
            || (!gameData.playerOneSelectedIds.includes(edge) && gameData.playerTwoSelectedIds.includes(verticalOne) && gameData.playerTwoSelectedIds.includes(verticalTwo));
     }

     function AICornerWinTest(corner, horizontalOne, horizontalTwo, verticalOne, verticalTwo, diagonal) {
        return (!gameData.playerOneSelectedIds.includes(corner) && gameData.playerTwoSelectedIds.includes(horizontalOne) && gameData.playerTwoSelectedIds.includes(horizontalTwo))
            || (!gameData.playerOneSelectedIds.includes(corner) && gameData.playerTwoSelectedIds.includes(verticalOne) && gameData.playerTwoSelectedIds.includes(verticalTwo))
            || (!gameData.playerOneSelectedIds.includes(corner) && gameData.playerTwoSelectedIds.includes(CENTER) && gameData.playerTwoSelectedIds.includes(diagonal));
     }