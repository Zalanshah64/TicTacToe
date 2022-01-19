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

const CHANGELOG = -6;
const SETTINGSMENU = -5;
const INSTRUCTIONSMENU = -4;
const GAMEMENU = -3;
const MAINMENU = -2
const NOTFINISHED = -1;
const PLAYERONE = 0;
const PLAYERTWO = 1;
const DRAW = 2;

const EASY = 0;
const NORMAL = 1;
const HARD = 2;
const IMPOSSIBLE = 3;


let currentPlayerHTML = document.getElementById("currentPlayer");
let currentTurnHTML = document.getElementById("currentTurn");
let whoWonHTML = document.getElementById("whoWon");
let playerWinNameHTML = document.getElementById("playerWinName");
let itsATieHTML = document.getElementById("itsATie");


//Document Elements related to entire webpage
let wrapper = document.getElementById("wrapper");
let hoverOverButtons = document.getElementsByClassName("hoverOverSound");
let clickSoundButtons = document.getElementsByClassName("clickSound");
let focusable = document.getElementsByClassName("focusable");

//Document Elements related to start menu
let startMenuWrapper = document.getElementById("startMenuWrapper");
let startMenuTitle = document.getElementById("startMenuTitle");
let startMenuCredits = document.getElementById("startMenuCredits");
let startMenuSubtitle = document.getElementById("startMenuSubtitle");

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
let AIDifficultySelection = document.getElementById("AIDifficultySelection");
let AIDIfficultySelections = document.getElementsByClassName("AIDifficultyselection");
let AIDifficultySelectionprev = document.getElementById("AIDifficultySelectionprev");
let fullscreenSwitch = document.getElementById("fullscreenSwitch");
let suggestionsSwitch = document.getElementById("suggestionsSwitch")
let switchTurnsSwitch = document.getElementById("switchTurnsSwitch");
let AISwitch = document.getElementById("AISwitch");
let fullscreenToggle = document.getElementById("fullscreenCheckBox");
let AIDifficultySelectionnext = document.getElementById("AIDifficultySelectionnext");
let canGray = document.getElementsByClassName("canGray");
let playerOneSelections = document.getElementsByClassName("playerOneselection");
let playerTwoSelections = document.getElementsByClassName("playerTwoselection");
let playerOneIconSelection = document.getElementById("playerOneIconSelection");
let playerTwoIconSelection = document.getElementById("playerTwoIconSelection");
let playerOneIconSelectionnext = document.getElementById("playerOneIconSelectionnext");
let playerOneIconSelectionprev = document.getElementById("playerOneIconSelectionprev");
let playerTwoIconSelectionnext = document.getElementById("playerTwoIconSelectionnext");
let playerTwoIconSelectionprev = document.getElementById("playerTwoIconSelectionprev");

//Document Elements related to instructions menu
let instructionsMenu = document.getElementById("instructionsMenu");
let instructionsTitle = document.getElementById("instructionsTitle");
let instructionsBackButton = document.getElementById("instructionsBackButton");
let changelogButton = document.getElementById("changelogButton");

//Document Elements related to changelog
let changelog = document.getElementById("changelogWrapper");
let changelogBackButton = document.getElementById("changelogBackButton");
let changelogTitle = document.getElementById("changelogTitle");

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

let gameData = {
    currentPlayer: PLAYERONE,
    playerOneScore: 0,
    playerTwoScore: 0,
    playerOneSelected: [],
    playerOneSelectedIds: [],
    playerTwoSelected: [],
    playerTwoSelectedIds: [],
    gameResult: GAMEMENU,
    currentMenu: GAMEMENU,
    currentFocus: startButton,
    ChangelogButtonOffset: 0,
    whoStarts: PLAYERONE,
    rememberedVolume: 0.5,
    AIwaitTime: 400,
    AIDifficultyChance: 0.8,
    settingsBackFromLocation: MAINMENU,
    fullscreenRequest: false,
    settingsData: {}
}

let startMenuData = {
    i: 0,
    title: "Tic-Tac-Toe",
    titleCompleted: false,
    credits: "A game by Zalan Shah",
    creditsCompleted: false,
    subtitle: "Press Enter to start",
    subtitleCompleted: false,
    speed: 150,
}


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
    document.cookie = "AI=true";
    document.cookie = "AIDifficulty=1";
    document.cookie = "playerOneIcon=X;";
    document.cookie = "playerTwoIcon=O;";
    document.cookie = "playerOneIconSlideIndex=0;";
    document.cookie = "playerTwoIconSlideIndex=1;";
    document.cookie = "fullscreen=false";
    gameData.settingsData["volume"] = 0.50;
    gameData.settingsData["suggestions"] = true;
    gameData.settingsData["switchTurns"] = false;
    gameData.settingsData["AI"] = true;
    gameData.settingsData["AIDifficulty"] = 1;
    gameData.settingsData["fullscreen"] = false;
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
    gameData.settingsData["AIDifficulty"] = parseInt(gameData.settingsData["AIDifficulty"]);
    gameData.settingsData["fullscreen"] = gameData.settingsData["fullscreen"] === "true";

    gameData.settingsData["playerOneIconSlideIndex"] = parseInt(gameData.settingsData["playerOneIconSlideIndex"]);
    gameData.settingsData["playerTwoIconSlideIndex"] = parseInt(gameData.settingsData["playerTwoIconSlideIndex"]);
}
suggestionsToggle.checked = gameData.settingsData["suggestions"];
switchTurnsToggle.checked = gameData.settingsData["switchTurns"];
AIToggle.checked = gameData.settingsData["AI"];
fullscreenToggle.checked = gameData.settingsData["fullscreen"];


let dateCookiesExpire = new Date();
dateCookiesExpire.setDate(dateCookiesExpire.getDate() + 2);
document.cookie = "expires=" + dateCookiesExpire.toUTCString() + ";";

updateVolume();
showAIDifficultySelectionOption(gameData.settingsData["AIDifficulty"]);
showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);

window.addEventListener("load", function() {
    setTimeout(writeStartMenu, 500);
});

document.addEventListener("keydown", function(event) {
    if((event.key === "s" || event.key === "S") && event.ctrlKey) {
        event.preventDefault();
    }
});

document.addEventListener("keyup", function(event) {

    switch(event.key) {
        case "Enter":
            if(gameData.currentMenu === GAMEMENU) {
                gameData.gameResult = MAINMENU;
                startMenuWrapper.style.display = "none";
                wrapper.style.display = "grid";
                gameStartAudio.play();

                if(gameData.settingsData["fullscreen"]) {
                    gameData.fullscreenRequest = true;
                    document.documentElement.requestFullscreen();
                }
                gameData.currentMenu = MAINMENU;
                focusOn(startButton);
                return;
            }

        case " ":
            if(gameData.currentMenu === NOTFINISHED && gameData.gameResult === NOTFINISHED && typeof gameData.currentFocus == "number") {
                gameboard[gameData.currentFocus].idElement.click();
            } else if(gameData.currentMenu === SETTINGSMENU) {
                if(gameData.currentFocus != volumeSlider) {
                    gameData.currentFocus.click()
                }
                return;
            }
            return;
        case "s":
        case "S":
            if(gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED)) {
                if(event.ctrlKey) {
                    saveGameBoard.click();
                    return;
                }
            }
        case "Down":
        case "ArrowDown":
            if(gameData.currentMenu == MAINMENU) {
                if(gameData.currentFocus === startButton) {
                    focusOn(instructionsButton);
                } else if(gameData.currentFocus === instructionsButton) {
                    focusOn(settingsButton);
                } else if(gameData.currentFocus === settingsButton) {
                    focusOn(startButton);
                }
            } else if(gameData.currentMenu == INSTRUCTIONSMENU) {
                if(gameData.currentFocus === changelogButton) {
                    focusOn(instructionsBackButton);
                } else {
                    focusOn(changelogButton);
                }
            } else if(gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED)) {
                switch(gameData.currentFocus) {
                    case mainMenuButton:
                        focusOn(settingsPostGameButton);
                        return;
                    case settingsPostGameButton:
                        focusOn(mainMenuButton);
                        return;
                    case playAgainButton:
                        focusOn(saveGameBoard);
                        return;
                    case saveGameBoard:
                        focusOn(playAgainButton);
                }
            } else if(gameData.currentMenu == SETTINGSMENU) {
                switch(gameData.currentFocus) {
                    case volumeSlider:
                        event.preventDefault();
                        focusOn(suggestionsSwitch);
                        return;
                    case suggestionsSwitch:
                        focusOn(switchTurnsSwitch);
                        return;
                    case switchTurnsSwitch:
                        focusOn(AISwitch);
                        return;
                    case AISwitch:
                        if(gameData.settingsData["AI"]) {
                            focusOn(AIDifficultySelection);
                            return;
                        } else {
                            focusOn(fullscreenSwitch);
                        }
                        return;
                    case AIDifficultySelection:
                        focusOn(fullscreenSwitch);
                        return;
                    case fullscreenSwitch:
                        focusOn(playerOneIconSelection);
                        return;
                    case playerOneIconSelection:
                        focusOn(playerTwoIconSelection);
                        return;
                    case playerTwoIconSelection:
                        focusOn(settingsBackButton);
                        return;
                    case settingsBackButton:
                        focusOn(volumeSlider);
                }
            }else if(gameData.currentMenu == NOTFINISHED && gameData.gameResult == NOTFINISHED) {
                if(gameData.currentFocus > MIDDLERIGHT || !gameData.settingsData["suggestions"]) {
                    return;
                }

                if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 3) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 3))) {
                    gameData.currentFocus += 3;
                    gameboard[gameData.currentFocus].idElement.focus();
                } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 6) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 6))) {
                    gameData.currentFocus += 6;
                    gameboard[gameData.currentFocus].idElement.focus();
                }
            }
            return;

        case "w":
        case "W":
        case "Up":
        case "ArrowUp":
            if(gameData.currentMenu == MAINMENU) {
                if(gameData.currentFocus === startButton) {
                    focusOn(settingsButton);
                } else if(gameData.currentFocus === instructionsButton) {
                    focusOn(startButton);
                } else if(gameData.currentFocus === settingsButton) {
                    focusOn(instructionsButton);
                }
            } else if(gameData.currentMenu == INSTRUCTIONSMENU) {
                if(gameData.currentFocus === changelogButton) {
                    focusOn(instructionsBackButton);
                } else {
                    focusOn(changelogButton);
                }
            } else if(gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED)) {
                switch(gameData.currentFocus) {
                    case mainMenuButton:
                        focusOn(settingsPostGameButton);
                        return;
                    case settingsPostGameButton:
                        focusOn(mainMenuButton);
                        return;
                    case playAgainButton:
                        focusOn(saveGameBoard);
                        return;
                    case saveGameBoard:
                        focusOn(playAgainButton);
                }
            } else if(gameData.currentMenu == SETTINGSMENU) {
                switch(gameData.currentFocus) {
                    case volumeSlider:
                        event.preventDefault();
                        focusOn(settingsBackButton);
                        return;
                    case suggestionsSwitch:
                        focusOn(volumeSlider);
                        return;
                    case switchTurnsSwitch:
                        focusOn(suggestionsSwitch);
                        return;
                    case AISwitch:
                        focusOn(switchTurnsSwitch);
                        return;
                    case AIDifficultySelection:
                        focusOn(AISwitch);
                        return;
                    case fullscreenSwitch:
                        if(gameData.settingsData["AI"]) {
                            focusOn(AIDifficultySelection)
                        } else {
                            focusOn(AISwitch);
                        }
                        return;
                    case playerOneIconSelection:
                        focusOn(fullscreenSwitch);
                        return;
                    case playerTwoIconSelection:
                        focusOn(playerOneIconSelection);
                        return;
                    case settingsBackButton:
                        focusOn(playerTwoIconSelection);
                }
            } else if(gameData.currentMenu == NOTFINISHED) {
                if(gameData.currentFocus < MIDDLELEFT || !gameData.settingsData["suggestions"]) {
                    return;
                }

                if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 3) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 3))) {
                    gameData.currentFocus -= 3;
                    gameboard[gameData.currentFocus].idElement.focus();
                } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 6) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 6))) {
                    gameData.currentFocus -= 6;
                    gameboard[gameData.currentFocus].idElement.focus();
                }
            }
            return;

        case "a":
        case "A":
        case "Left":
        case "ArrowLeft":
            if((gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED))) {
                switch(gameData.currentFocus) {
                    case mainMenuButton:
                        focusOn(playAgainButton);
                        return;
                    case playAgainButton:
                        focusOn(mainMenuButton);
                        return;
                    case settingsPostGameButton:
                        focusOn(saveGameBoard);
                        return;
                    case saveGameBoard:
                        focusOn(settingsPostGameButton);
                        return;
                }
            } else if(gameData.currentMenu == NOTFINISHED) {
                if(gameData.currentFocus % 3 == 0 || !gameData.settingsData["suggestions"]) {
                    return;
                }

                if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 1) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 1))) {
                    gameData.currentFocus--;
                    gameboard[gameData.currentFocus].idElement.focus();
                } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 2) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 2))
                          && (gameData.currentFocus - 1) % 3 != 0) {
                    gameData.currentFocus -= 2;
                    gameboard[gameData.currentFocus].idElement.focus();
                }
            } else if(gameData.currentFocus == AIDifficultySelection) {
                AIDifficultySelectionprev.click();
            } else if(gameData.currentFocus == playerOneIconSelection) {
                playerOneIconSelectionprev.click();
            }else if(gameData.currentFocus == playerTwoIconSelection) {
                playerTwoIconSelectionprev.click();
            }
            return;

        case "d":
        case "D":
        case "Right":
        case "ArrowRight":
            if((gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED))) {
                switch(gameData.currentFocus) {
                    case mainMenuButton:
                        focusOn(playAgainButton);
                        return;
                    case playAgainButton:
                        focusOn(mainMenuButton);
                        return;
                    case settingsPostGameButton:
                        focusOn(saveGameBoard);
                        return;
                    case saveGameBoard:
                        focusOn(settingsPostGameButton);
                        return;
                }
            } else if(gameData.currentMenu == NOTFINISHED) {
                if((gameData.currentFocus - 2) % 3 == 0 || !gameData.settingsData["suggestions"]) {
                    return;
                }

                if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 1) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 1))) {
                    gameData.currentFocus++;
                    gameboard[gameData.currentFocus].idElement.focus();
                } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 2) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 2))
                           && (gameData.currentFocus - 1) % 3 != 0) {
                    gameData.currentFocus += 2;
                    gameboard[gameData.currentFocus].idElement.focus();
                }
            } else if(gameData.currentFocus == AIDifficultySelection) {
                AIDifficultySelectionnext.click();
            } else if(gameData.currentFocus == playerOneIconSelection) {
                playerOneIconSelectionnext.click();
            } else if(gameData.currentFocus == playerTwoIconSelection) {
                playerTwoIconSelectionnext.click();
            }
            return;

        case "Escape":
            if(gameData.currentMenu == NOTFINISHED) {
                mainMenuButton.click();
                return;
            }
        case "Backspace":
            if(gameData.currentMenu == INSTRUCTIONSMENU) {
                instructionsBackButton.click();
            } else if(gameData.currentMenu == SETTINGSMENU) {
                settingsBackButton.click();
            } else if(gameData.currentMenu == CHANGELOG) {
                changelogBackButton.click();
            }
            return;

        case "m":
        case "M":
            if(gameData.settingsData["volume"] == 0) {
                gameData.settingsData["volume"] = gameData.rememberedVolume;
            } else {
                gameData.rememberedVolume = gameData.settingsData["volume"];
                gameData.settingsData["volume"] = 0;
            }

            volumeSlider.value = gameData.settingsData["volume"] * 100;
            document.cookie = "volume=" + gameData.settingsData["volume"] + ";";
            updateVolume();
            playClickAudio();
            return;

        case "F":
        case "f":
            gameData.settingsData["fullscreen"] = !gameData.settingsData["fullscreen"];
            document.cookie = "fullscreen=" + gameData.settingsData["fullscreen"] + ";";

            if(document.webkitIsFullScreen) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
    }
});

document.addEventListener("fullscreenchange", function() {
    if(gameData.fullscreenRequest) {
        gameData.fullscreenRequest = false;
        return;
    } else {
        gameData.settingsData["fullscreen"] = false;
        document.cookie = "fullscreen=false;"
        fullscreenToggle.checked = !fullscreenToggle.checked;
        document.isOpenFullScreen = false;
        playClickAudio();
    }
})

for(let i = 0; i < focusable.length; ++i) {
    focusable[i].addEventListener("focus", function() {
        stopHoverAudio();
        hoverOverAudio.play();
    });
}

for(let i = 0; i < 9; ++i) {
    gameboard[i].idElement.addEventListener("click", function() {squareClick(gameboard[i], true)});

    gameboard[i].idElement.addEventListener("mouseenter", function() {
        if(gameData.gameResult === NOTFINISHED) {
            gameData.currentFocus = gameboard[i].pieceNumber;
            gameboard[i].idElement.focus();
        }
    });

    gameboard[i].idElement.addEventListener("focus", function(e) {
        if(gameboard[i].isSelected || gameData.gameResult != NOTFINISHED || !gameData.settingsData["suggestions"]) {
            return;
        }
        if(gameData.currentPlayer == PLAYERONE) {
            gameboard[i].idElement.innerHTML = '<p id="hoverOver">' + gameData.settingsData["playerOneIcon"] + '</p>';
        } else if(!gameData.settingsData["AI"]){
            gameboard[i].idElement.innerHTML = '<p id="hoverOver">'+ gameData.settingsData["playerTwoIcon"] + '</p>';
        } else {
            return;
        }
        stopHoverAudio();
        hoverOverAudio.play();
    }, true);

    gameboard[i].idElement.addEventListener("mouseleave", function() {
        if(gameData.gameResult === NOTFINISHED) {
            gameboard[i].idElement.blur();
        }
    });

    gameboard[i].idElement.addEventListener("blur", function(e) {
        if(gameboard[i].isSelected || gameData.gameResult != NOTFINISHED || !gameData.settingsData["suggestions"]) {
            return;
        }
        gameboard[i].idElement.innerHTML = "";
    }, true);

}

for(let i = 0; i < hoverOverButtons.length; ++i) {
    hoverOverButtons[i].addEventListener("mouseenter", function() {
        focusOn(hoverOverButtons[i]);
    });
}

for(let i = 0; i < clickSoundButtons.length; ++i) {
    clickSoundButtons[i].addEventListener("click", playClickAudio);
}
updateGrayedOut();

startButton.addEventListener("click", function() {
    gameData.gameResult = NOTFINISHED;
    gameData.currentMenu = NOTFINISHED;
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
    setTimeout(function() {
        gameData.currentFocus = CENTER;
        gameboard[CENTER].idElement.focus()
    }, 100);
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
        downloadImageLink.href = image;
        downloadImageLink.download = gameData.playerOneScore + "-" + gameData.playerTwoScore + ".png";
        downloadImageLink.click();
    });
})

settingsPostGameButton.addEventListener("click", function() {
    game.style.display = "none";
    gameData.currentMenu = SETTINGSMENU;
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
    gameData.settingsBackFromLocation = NOTFINISHED;
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
    gameData.currentMenu = MAINMENU;
    currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    whoWonHTML.style.display = "none";
    currentTurnHTML.style.display = "none";
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
    focusOn(startButton);
    stopHoverAudio();
});

settingsButton.addEventListener("click", function() {
    gameData.settingsBackFromLocation = MAINMENU;
    mainMenu.style.display = "none";
    settingsTitle.style.display = "block";
    gameData.currentMenu = SETTINGSMENU;
    settingsMenu.style.display = "block";
    wrapper.style.display = "block";
    setTimeout(function() {
        focusOn(volumeSlider);
        stopHoverAudio();
    }, 100);
});

AIDifficultySelectionprev.addEventListener("click", function() {
    if(gameData.settingsData["AI"]) {
        (gameData.settingsData["AIDifficulty"])--;
        showAIDifficultySelectionOption(gameData.settingsData["AIDifficulty"]);
        if(gameData.settingsData["AIDifficulty"] == EASY) {
            gameData.AIDifficultyChance = 0.6;
        } else if(gameData.settingsData["AIDiffculty"] == NORMAL) {
            gameData.AIDifficultyChance = 0.8;
        } else if(gameData.settingsData["AIDifficulty"] == HARD) {
            gameData.AIDifficultyChance = 0.9;
        } else {
            gameData.AIDifficultyChance = 1;
        }
    }
});

AIDifficultySelectionnext.addEventListener("click", function() {
    if(gameData.settingsData["AI"]) {
        (gameData.settingsData["AIDifficulty"])++;
        showAIDifficultySelectionOption(gameData.settingsData["AIDifficulty"]);
    }
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
    if(gameData.settingsBackFromLocation == MAINMENU) {
        gameData.currentMenu = MAINMENU;
        mainMenu.style.display = "grid";
        focusOn(settingsButton);
        stopHoverAudio();
    } else if(gameData.settingsBackFromLocation == NOTFINISHED) {
        game.style.display = "grid";
        scoreTitle[PLAYERONE].style.display = "block";
        scoreTitle[PLAYERTWO].style.display = "block";
        mainMenuButton.style.display = "block";
        settingsPostGameButton.style.display = "block";
        playAgainButton.style.display = "block";
        saveGameBoard.style.display = "block";
        gameData.currentMenu = NOTFINISHED;
        focusOn(settingsPostGameButton);
        stopHoverAudio();
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
    focusOn(suggestionsSwitch);
    stopHoverAudio();
});

switchTurnsCheckBox.addEventListener("change", function() {
    gameData.settingsData["switchTurns"] = !gameData.settingsData["switchTurns"];
    gameData.whoStarts = 0;
    document.cookie = "switchTurns=" + gameData.settingsData["switchTurns"] + ";";
    focusOn(switchTurnsSwitch);
    stopHoverAudio();
});

AIToggle.addEventListener("change", function() {
    gameData.settingsData["AI"] = !gameData.settingsData["AI"];
    document.cookie = "AI=" + gameData.settingsData["AI"] + ";";

    focusOn(AISwitch);
    stopHoverAudio();
    updateGrayedOut();
});

fullscreenToggle.addEventListener("change", function() {
    gameData.settingsData["fullscreen"] = !gameData.settingsData["fullscreen"];
    document.cookie = "fullscreen=" + gameData.settingsData["fullscreen"] + ";";
    gameData.fullscreenRequest = true;
    focusOn(fullscreenSwitch);
    stopHoverAudio();

    if(document.webkitIsFullScreen) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
})

instructionsButton.addEventListener("click", function() {
    mainMenu.style.display = "none";
    instructionsMenu.style.display = "grid";
    instructionsTitle.style.display = "block";
    wrapper.style.display = "block"
    gameData.currentMenu = INSTRUCTIONSMENU;
    focusOn(changelogButton);
    stopHoverAudio();
    window.scrollTo(0, 0);
});

changelogButton.addEventListener("click", function() {
    gameData.currentMenu = CHANGELOG;
    gameData.ChangelogButtonOffset = window.pageYOffset;
    instructionsMenu.style.display = "none";
    instructionsTitle.style.display = "none";
    changelog.style.display = "grid";
    changelogTitle.style.display = "block";
    focusOn(changelogBackButton);
    stopHoverAudio();
    window.scrollTo(0, 0);
});

changelogBackButton.addEventListener("click", function() {
    gameData.currentMenu = INSTRUCTIONSMENU;
    instructionsMenu.style.display = "grid";
    instructionsTitle.style.display = "block";
    changelog.style.display = "none";
    changelogTitle.style.display = "none";
    focusOn(changelogButton);
    stopHoverAudio();
    window.scrollTo(0, gameData.ChangelogButtonOffset);
})

instructionsBackButton.addEventListener("click", function() {
    instructionsMenu.style.display = "none";
    instructionsTitle.style.display = "none";
    mainMenu.style.display = "grid";
    wrapper.style.display = "grid";
    gameData.currentMenu = MAINMENU;
    focusOn(startButton);
    stopHoverAudio();
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
        focusOn(mainMenuButton);
        stopHoverAudio();
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
            focusOn(mainMenuButton);
            stopHoverAudio();
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
                focusOn(mainMenuButton);
                stopHoverAudio();
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

function showAIDifficultySelectionOption(n) {
    if (n > AIDIfficultySelections.length - 1) {
        gameData.settingsData["AIDifficulty"] = 0;
    }
    if (n < 0) {
        gameData.settingsData["AIDifficulty"] = AIDIfficultySelections.length - 1;
    }
    for (let i = 0; i < AIDIfficultySelections.length; i++) {
        AIDIfficultySelections[i].style.display = "none";
    }

    AIDIfficultySelections[gameData.settingsData["AIDifficulty"]].style.display = "flex";
    document.cookie = "AIDifficulty=" + gameData.settingsData["AIDifficulty"] + ";";
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

  function focusOn(element) {
      gameData.currentFocus = element;
      element.focus();
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

 function updateGrayedOut() {
    if(gameData.settingsData["AI"]) {
        for(let i = 0; i < canGray.length; ++i) {
            canGray[i].classList.remove("grayedOut");
        }
        canGray[4].addEventListener("click", playClickAudio);
        canGray[9].addEventListener("click", playClickAudio);
    } else {
        for(let i = 0; i < canGray.length; ++i) {
            canGray[i].classList.add("grayedOut");
        }
        canGray[4].removeEventListener("click", playClickAudio);
        canGray[9].removeEventListener("click", playClickAudio);
    }
 }

  function AIPlayMove() {
    let randomChance = Math.random();
    if(randomChance < gameData.AIDifficultyChance) {
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

     function writeStartMenu() {
         if(!startMenuData.titleCompleted) {
             startMenuTitle.innerHTML += startMenuData.title.charAt(startMenuData.i);
             startMenuData.i++;
             if(startMenuData.i == startMenuData.title.length) {
                startMenuData.i = 0;
                startMenuData.titleCompleted = true;
            }
            setTimeout(writeStartMenu, startMenuData.speed);
         } else if(!startMenuData.creditsCompleted) {
            startMenuCredits.innerHTML += startMenuData.credits.charAt(startMenuData.i);
            startMenuData.i++;
            if(startMenuData.i == startMenuData.credits.length) {
                startMenuData.i = 0;
                startMenuData.creditsCompleted = true;
            }

            if(startMenuData.credits.charAt(startMenuData.i) == " ") {
                startMenuCredits.innerHTML += startMenuData.credits.charAt(startMenuData.i);
                startMenuData.i++;
            }

            setTimeout(writeStartMenu, startMenuData.speed);
         } else if(!startMenuData.subtitleCompleted) {
            startMenuSubtitle.innerHTML += startMenuData.subtitle.charAt(startMenuData.i);
            startMenuData.i++;
            if(startMenuData.i == startMenuData.subtitle.length) {
                startMenuData.i = 0;
                startMenuData.subtitleCompleted = true;
            }

            if(startMenuData.subtitle.charAt(startMenuData.i) == " ") {
                startMenuSubtitle.innerHTML += startMenuData.subtitle.charAt(startMenuData.i);
                startMenuData.i++;
            }

            setTimeout(writeStartMenu, startMenuData.speed);
         }
    }