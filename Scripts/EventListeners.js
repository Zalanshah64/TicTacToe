//When the page first loads up, start writing the start menu
window.addEventListener("load", function() {
    startMenuData.subtitle = maxWidth.matches ? "Tap anywhere to start" : "Press Enter to start";
    setTimeout(writeStartMenu, 500);
});

document.querySelector("body").addEventListener("click", function() {
    if(gameData.currentMenu === GAMEMENU && maxWidth.matches) {
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
})

//If a user presses ctrl + S, don't save the webpage
document.addEventListener("keydown", function(event) {
    if(((event.key === "s" || event.key === "S") && event.ctrlKey)
    || (event.key === "Down" || event.key === "ArrowDown")
    || (event.key === "Up" || event.key === "ArrowUp")) {
        event.preventDefault();
    }
});

document.addEventListener("keyup", function(event) {
    //If the user has already played a move and that move is currently taking place,
    //don't play another move
    if(gameData.keyPress) {
        return;
    }

    switch(event.key) {
        case "Enter":
            gameData.keyPress = true;
            //If the key pressed was enter and we are in the start menu, open the main menu
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
                gameData.keyPress = false;
                return;
            }
        case " ":
            gameData.keyPress = true;
            //If the game is currently being played, click that button
            if(gameData.currentMenu === NOTFINISHED && gameData.gameResult === NOTFINISHED && typeof gameData.currentFocus == "number") {
                gameboard[gameData.currentFocus].idElement.click();
            } else if(gameData.currentMenu === SETTINGSMENU) {
                if(gameData.currentFocus != volumeSlider) {
                    gameData.currentFocus.click()
                }
                gameData.keyPress = false;
                return;
            }
            gameData.keyPress = false;
            return;

        case "s":
        case "S":
            gameData.keyPress = true;
            if(gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED)) {
                if(event.ctrlKey) {
                    saveGameBoard.click();
                }
            }
            gameData.keyPress = false;
            return;
        case "Down":
        case "ArrowDown":
            gameData.keyPress = true;
            if(gameData.currentMenu == MAINMENU) {
                if(gameData.currentFocus === startButton) {
                    focusOn(instructionsButton);
                    gameData.keyPress = false;
                    return;
                } else if(gameData.currentFocus === instructionsButton) {
                    focusOn(settingsButton);
                    gameData.keyPress = false;
                    return;
                } else if(gameData.currentFocus === settingsButton) {
                    focusOn(startButton);
                    gameData.keyPress = false;
                    return;
                }
            } else if(gameData.currentMenu == INSTRUCTIONSMENU) {
                if(gameData.currentFocus === changelogButton) {
                    focusOn(instructionsBackButton);
                    gameData.keyPress = false;
                    return;
                } else {
                    focusOn(changelogButton);
                    gameData.keyPress = false;
                    return;
                }
            } else if(gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED)) {
                switch(gameData.currentFocus) {
                    case mainMenuButton:
                        focusOn(settingsPostGameButton);
                        gameData.keyPress = false;
                        return;
                    case settingsPostGameButton:
                        focusOn(mainMenuButton);
                        gameData.keyPress = false;
                        return;
                    case playAgainButton:
                        focusOn(saveGameBoard);
                        gameData.keyPress = false;
                        return;
                    case saveGameBoard:
                        focusOn(playAgainButton);
                        gameData.keyPress = false;
                        return;
                }
            } else if(gameData.currentMenu == SETTINGSMENU) {
                switch(gameData.currentFocus) {
                    case volumeSlider:
                        event.preventDefault();
                        focusOn(suggestionsSwitch);
                        gameData.keyPress = false;
                        return;
                    case suggestionsSwitch:
                        focusOn(switchTurnsSwitch);
                        gameData.keyPress = false;
                        return;
                    case switchTurnsSwitch:
                        focusOn(AISwitch);
                        gameData.keyPress = false;
                        return;
                    case AISwitch:
                        if(gameData.settingsData["AI"]) {
                            focusOn(AIDifficultySelection);
                            gameData.keyPress = false;
                            return;
                        } else {
                            focusOn(fullscreenSwitch);
                            gameData.keyPress = false;
                            return;
                        }
                    case AIDifficultySelection:
                        focusOn(fullscreenSwitch);
                        gameData.keyPress = false;
                        return;
                    case fullscreenSwitch:
                        focusOn(playerOneIconSelection);
                        gameData.keyPress = false;
                        return;
                    case playerOneIconSelection:
                        focusOn(playerTwoIconSelection);
                        gameData.keyPress = false;
                        return;
                    case playerTwoIconSelection:
                        focusOn(themeSelection);
                        gameData.keyPress = false;
                        return;
                    case themeSelection:
                        focusOn(settingsBackButton);
                        gameData.keyPress = false;
                        return;
                    case settingsBackButton:
                        focusOn(volumeSlider);
                        gameData.keyPress = false;
                        return;
                }
            }else if(gameData.currentMenu == NOTFINISHED && gameData.gameResult == NOTFINISHED) {
                if(!gameData.settingsData["suggestions"]) {
                    gameData.keyPress = false;
                    return;
                }

                moveSuggestion(DOWN);
            }
            gameData.keyPress = false;
            return;

        case "w":
        case "W":
        case "Up":
        case "ArrowUp":
            gameData.keyPress = true;
            if(gameData.currentMenu == MAINMENU) {
                if(gameData.currentFocus === startButton) {
                    focusOn(settingsButton);
                    gameData.keyPress = false;
                    return;
                } else if(gameData.currentFocus === instructionsButton) {
                    focusOn(startButton);
                    gameData.keyPress = false;
                    return;
                } else if(gameData.currentFocus === settingsButton) {
                    focusOn(instructionsButton);
                    gameData.keyPress = false;
                    return;
                }
            } else if(gameData.currentMenu == INSTRUCTIONSMENU) {
                if(gameData.currentFocus === changelogButton) {
                    focusOn(instructionsBackButton);
                    gameData.keyPress = false;
                    return;
                } else {
                    focusOn(changelogButton);
                    gameData.keyPress = false;
                    return;
                }
            } else if(gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED)) {
                switch(gameData.currentFocus) {
                    case mainMenuButton:
                        focusOn(settingsPostGameButton);
                        gameData.keyPress = false;
                        return;
                    case settingsPostGameButton:
                        focusOn(mainMenuButton);
                        gameData.keyPress = false;
                        return;
                    case playAgainButton:
                        focusOn(saveGameBoard);
                        gameData.keyPress = false;
                        return;
                    case saveGameBoard:
                        focusOn(playAgainButton);
                        gameData.keyPress = false;
                        return;
                }
            } else if(gameData.currentMenu == SETTINGSMENU) {
                switch(gameData.currentFocus) {
                    case volumeSlider:
                        event.preventDefault();
                        focusOn(settingsBackButton);
                        gameData.keyPress = false;
                        return;
                    case suggestionsSwitch:
                        focusOn(volumeSlider);
                        gameData.keyPress = false;
                        return;
                    case switchTurnsSwitch:
                        focusOn(suggestionsSwitch);
                        gameData.keyPress = false;
                        return;
                    case AISwitch:
                        focusOn(switchTurnsSwitch);
                        gameData.keyPress = false;
                        return;
                    case AIDifficultySelection:
                        focusOn(AISwitch);
                        gameData.keyPress = false;
                        return;
                    case fullscreenSwitch:
                        if(gameData.settingsData["AI"]) {
                            focusOn(AIDifficultySelection);
                            gameData.keyPress = false;
                            return;
                        } else {
                            focusOn(AISwitch);
                            gameData.keyPress = false;
                            return;
                        }
                    case playerOneIconSelection:
                        focusOn(fullscreenSwitch);
                        gameData.keyPress = false;
                        return;
                    case playerTwoIconSelection:
                        focusOn(playerOneIconSelection);
                        gameData.keyPress = false;
                        return;
                    case themeSelection:
                        focusOn(playerTwoIconSelection);
                        gameData.keyPress = false;
                        return;
                    case settingsBackButton:
                        focusOn(themeSelection);
                        gameData.keyPress = false;
                }
            } else if(gameData.currentMenu == NOTFINISHED) {
                if(!gameData.settingsData["suggestions"]) {
                    gameData.keyPress = false;
                    return;
                }

                moveSuggestion(UP);
            }
            gameData.keyPress = false;
            return;

        case "a":
        case "A":
        case "Left":
        case "ArrowLeft":
            gameData.keyPress = true;
            if((gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED))) {
                switch(gameData.currentFocus) {
                    case mainMenuButton:
                        focusOn(playAgainButton);
                        gameData.keyPress = false;
                        return;
                    case playAgainButton:
                        focusOn(mainMenuButton);
                        gameData.keyPress = false;
                        return;
                    case settingsPostGameButton:
                        focusOn(saveGameBoard);
                        gameData.keyPress = false;
                        return;
                    case saveGameBoard:
                        focusOn(settingsPostGameButton);
                        gameData.keyPress = false;
                        return;
                }
            } else if(gameData.currentMenu == NOTFINISHED) {
                if(!gameData.settingsData["suggestions"]) {
                    gameData.keyPress = false;
                    return;
                }

                moveSuggestion(LEFT);

            } else if(gameData.currentFocus == AIDifficultySelection) {
                AIDifficultySelectionprev.click();
            } else if(gameData.currentFocus == playerOneIconSelection) {
                playerOneIconSelectionprev.click();
            }else if(gameData.currentFocus == playerTwoIconSelection) {
                playerTwoIconSelectionprev.click();
            } else if(gameData.currentFocus == themeSelection) {
                themeSelectionPrev.click();
            }
            gameData.keyPress = false;
            return;

        case "d":
        case "D":
        case "Right":
        case "ArrowRight":
            gameData.keyPress = true;
            if((gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED))) {
                switch(gameData.currentFocus) {
                    case mainMenuButton:
                        focusOn(playAgainButton);
                        gameData.keyPress = false;
                        return;
                    case playAgainButton:
                        focusOn(mainMenuButton);
                        gameData.keyPress = false;
                        return;
                    case settingsPostGameButton:
                        focusOn(saveGameBoard);
                        gameData.keyPress = false;
                        return;
                    case saveGameBoard:
                        focusOn(settingsPostGameButton);
                        gameData.keyPress = false;
                        return;
                }
            } else if(gameData.currentMenu == NOTFINISHED) {
                if(!gameData.settingsData["suggestions"]) {
                    gameData.keyPress = false;
                    return;
                }

                gameData.keyPress = false;
                moveSuggestion(RIGHT);

            } else if(gameData.currentFocus == AIDifficultySelection) {
                AIDifficultySelectionnext.click();
            } else if(gameData.currentFocus == playerOneIconSelection) {
                playerOneIconSelectionnext.click();
            } else if(gameData.currentFocus == playerTwoIconSelection) {
                playerTwoIconSelectionnext.click();
            } else if(gameData.currentFocus == themeSelection) {
                themeSelectionNext.click();
            }
            gameData.keyPress = false;
            return;

        case "Escape":
            gameData.keyPress = true;
            if(gameData.currentMenu == NOTFINISHED) {
                mainMenuButton.click();
                gameData.keyPress = false;
                return;
            }
        case "Backspace":
            gameData.keyPress = true;
            if(gameData.currentMenu == INSTRUCTIONSMENU) {
                instructionsBackButton.click();
                gameData.keyPress = false;
            } else if(gameData.currentMenu == SETTINGSMENU) {
                settingsBackButton.click();
                gameData.keyPress = false;
            } else if(gameData.currentMenu == CHANGELOG) {
                changelogBackButton.click();
                gameData.keyPress = false;
            }
            gameData.keyPress = false;
            return;

        case "m":
        case "M":
            gameData.keyPress = true;
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
            gameData.keyPress = false;
            return;

        case "F":
        case "f":
            gameData.keyPress = true;
            fullscreenSwitch.click()
            gameData.keyPress = false;
            return;
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
});

for(let i = 0; i < focusable.length; ++i) {
    focusable[i].addEventListener("focus", function() {
        playHoverAudio();
    });
}

for(let i = 0; i < 9; ++i) {
    gameboard[i].idElement.addEventListener("click", function() {squareClick(gameboard[i], true)});

    gameboard[i].idElement.addEventListener("mouseenter", function() {
        if(gameData.gameResult === NOTFINISHED) {
            clearSelections();
            gameData.currentFocus = gameboard[i].pieceNumber;
            gameboard[i].idElement.focus();
        }
    });

    gameboard[i].idElement.addEventListener("focus", function(e) {
        if(gameboard[i].isSelected || gameData.gameResult != NOTFINISHED || !gameData.settingsData["suggestions"]) {
            return;
        }
        clearSelections();
        if(gameData.currentPlayer == PLAYERONE) {
            gameboard[i].idElement.innerHTML = '<p class="selected">' + gameData.settingsData["playerOneIcon"] + '</p>';
        } else if(!gameData.settingsData["AI"]){
            gameboard[i].idElement.innerHTML = '<p class="selected">'+ gameData.settingsData["playerTwoIcon"] + '</p>';
        } else {
            return;
        }
        playHoverAudio();
    });

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
    gameData.gameResult = gameData.currentMenu = NOTFINISHED;
    gameData.whoStarts = PLAYERONE;
    mainMenu.style.display = "none";
    playerOneScoreHTML.innerHTML = gameData.playerOneScore;
    playerTwoScoreHTML.innerHTML = gameData.playerTwoScore;
    currentTurnHTML.style.display = "block";
    game.style.display = "grid";

    if(getComputedStyle(scoreTitle[PLAYERONE]).visibility != "hidden") {
        scoreTitle[PLAYERONE].style.display = scoreTitle[PLAYERTWO].style.display = "block";
    }
    playerOneName.innerHTML = gameData.settingsData["playerOneIcon"];
    playerTwoName.innerHTML = gameData.settingsData["playerTwoIcon"];
    currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    if(gameData.settingsData["suggestions"] && !maxWidth.matches) {
        setTimeout(function() {
            gameData.currentFocus = CENTER;
            gameboard[CENTER].idElement.focus();
        }, 100);
    }
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
    mainMenuButton.style.display = settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = saveGameBoard.style.display = "none";
    itsATieHTML.style.display = whoWonHTML.style.display = "none";
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
    gameData.currentMenu = SETTINGSMENU;
    settingsMenu.style.display = wrapper.style.display = "block";
    game.style.display = mainMenuButton.style.display = settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = saveGameBoard.style.display = "none";
    scoreTitle[PLAYERONE].style.display = scoreTitle[PLAYERTWO].style.display = "none";
    itsATieHTML.style.display = whoWonHTML.style.display = "none";
    gameData.settingsBackFromLocation = NOTFINISHED;
});

mainMenuButton.addEventListener("click", function() {
    gameData.playerOneSelected = [];
    gameData.playerOneSelectedIds = [];
    gameData.playerTwoSelected = [];
    gameData.playerTwoSelectedIds = [];
    gameData.playerOneScore = gameData.playerTwoScore = 0;
    gameData.currentPlayer = PLAYERONE;
    gameData.gameResult = gameData.currentMenu = MAINMENU;
    currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    whoWonHTML.style.display = currentTurnHTML.style.display = itsATieHTML.style.display = "none";
    for(let i = 0; i < gameboard.length; ++i) {
        gameboard[i].isSelected = false;
        gameboard[i].idElement.innerHTML = "";
    }

    mainMenu.style.display = "grid";
    game.style.display = scoreTitle[PLAYERONE].style.display = scoreTitle[PLAYERTWO].style.display = "none";
    mainMenuButton.style.display = settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = saveGameBoard.style.display = "none";
    focusOn(startButton);

    pauseHoverOverAudio();
});

settingsButton.addEventListener("click", function() {
    gameData.settingsBackFromLocation = MAINMENU;
    mainMenu.style.display = "none";
    settingsTitle.style.display = settingsMenu.style.display = wrapper.style.display = "block";
    gameData.currentMenu = SETTINGSMENU;
    setTimeout(function() {
        focusOn(volumeSlider);
        pauseHoverOverAudio();
    }, 100);
});

AIDifficultySelectionprev.addEventListener("click", function() {
    if(gameData.settingsData["AI"]) {
        (gameData.settingsData["AIDifficulty"])--;
        showAIDifficultySelectionOption(gameData.settingsData["AIDifficulty"]);

        switch(gameData.settingsData["AIDifficulty"]) {
            case EASY:
                gameData.AIDifficultyChance = 0.6;
            return;

            case NORMAL:
                gameData.AIDifficultyChance = 0.8;
            return;

            case HARD:
                gameData.AIDifficultyChance = 0.9;
            return;

            case IMPOSSIBLE:
                gameData.AIDifficultyChance = 1;
            return;
        }

    }
});

AIDifficultySelectionnext.addEventListener("click", function() {
    if(gameData.settingsData["AI"]) {
        (gameData.settingsData["AIDifficulty"])++;
        showAIDifficultySelectionOption(gameData.settingsData["AIDifficulty"]);
    }

    switch(gameData.settingsData["AIDifficulty"]) {
        case EASY:
            gameData.AIDifficultyChance = 0.6;
        return;

        case NORMAL:
            gameData.AIDifficultyChance = 0.8;
        return;

        case HARD:
            gameData.AIDifficultyChance = 0.9;
        return;

        case IMPOSSIBLE:
            gameData.AIDifficultyChance = 1;
        return;
    }
});

playerOneIconSelectionprev.addEventListener("click", function() {
    (gameData.settingsData["playerOneIconSlideIndex"])--;
    showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    if(gameData.settingsData["playerOneIconSlideIndex"] == gameData.settingsData["playerTwoIconSlideIndex"]) {
        gameData.settingsData["playerOneIconSlideIndex"]--;
        showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    }
});

playerOneIconSelectionnext.addEventListener("click", function() {
    (gameData.settingsData["playerOneIconSlideIndex"])++;
    showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    if(gameData.settingsData["playerOneIconSlideIndex"] == gameData.settingsData["playerTwoIconSlideIndex"]) {
        gameData.settingsData["playerOneIconSlideIndex"]++;
        showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    }
});

playerTwoIconSelectionprev.addEventListener("click", function() {
    (gameData.settingsData["playerTwoIconSlideIndex"])--;
    showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    if(gameData.settingsData["playerTwoIconSlideIndex"] == gameData.settingsData["playerOneIconSlideIndex"]) {
        gameData.settingsData["playerTwoIconSlideIndex"]--;
        showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    }
});

playerTwoIconSelectionnext.addEventListener("click", function() {
    (gameData.settingsData["playerTwoIconSlideIndex"])++;
    showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    if(gameData.settingsData["playerTwoIconSlideIndex"] == gameData.settingsData["playerOneIconSlideIndex"]) {
        gameData.settingsData["playerTwoIconSlideIndex"]++;
        showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    }
});


settingsBackButton.addEventListener("click", function() {
    settingsMenu.style.display = settingsTitle.style.display = "none";
    wrapper.style.display = "grid";
    if(gameData.settingsBackFromLocation == MAINMENU) {
        gameData.currentMenu = MAINMENU;
        mainMenu.style.display = "grid";
        focusOn(settingsButton);
        pauseHoverOverAudio();
    } else if(gameData.settingsBackFromLocation == NOTFINISHED) {
        game.style.display = "grid";
        if(getComputedStyle(scoreTitle[PLAYERONE]).visibility != "hidden") {
            scoreTitle[PLAYERONE].style.display = scoreTitle[PLAYERTWO].style.display = "block";
        }
        mainMenuButton.style.display = settingsPostGameButton.style.display = playAgainButton.style.display = saveGameBoard.style.display = "block";
        gameData.currentMenu = NOTFINISHED;
        focusOn(settingsPostGameButton);
        pauseHoverOverAudio();
        if(gameData.gameResult == PLAYERONE || gameData.gameResult == PLAYERTWO) {
            whoWonHTML.style.display = "block";
        } else {
            itsATieHTML.style.display = "block";
        }

        playerOneName.innerHTML = gameData.settingsData["playerOneIcon"];
        playerTwoName.innerHTML = gameData.settingsData["playerTwoIcon"];

        playerWinNameHTML.innerHTML = (gameData.gameResult == PLAYERONE) ? gameData.settingsData["playerOneIcon"] : gameData.settingsData["playerTwoIcon"];

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
    pauseHoverOverAudio();
});

switchTurnsCheckBox.addEventListener("change", function() {
    gameData.settingsData["switchTurns"] = !gameData.settingsData["switchTurns"];
    gameData.whoStarts = PLAYERONE;
    document.cookie = "switchTurns=" + gameData.settingsData["switchTurns"] + ";";
    focusOn(switchTurnsSwitch);
    pauseHoverOverAudio();
});

AIToggle.addEventListener("change", function() {
    gameData.settingsData["AI"] = !gameData.settingsData["AI"];
    document.cookie = "AI=" + gameData.settingsData["AI"] + ";";

    focusOn(AISwitch);
    pauseHoverOverAudio();
    updateGrayedOut();
});

fullscreenToggle.addEventListener("change", function() {
    gameData.settingsData["fullscreen"] = !gameData.settingsData["fullscreen"];
    document.cookie = "fullscreen=" + gameData.settingsData["fullscreen"] + ";";
    gameData.fullscreenRequest = true;
    focusOn(fullscreenSwitch);
    pauseHoverOverAudio();

    if(document.webkitIsFullScreen) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
})

instructionsButton.addEventListener("click", function() {
    mainMenu.style.display = "none";
    instructionsMenu.style.display = "grid";
    instructionsTitle.style.display = wrapper.style.display = "block";
    gameData.currentMenu = INSTRUCTIONSMENU;
    focusOn(changelogButton);
    pauseHoverOverAudio();
    window.scrollTo(0, 0);
});

changelogButton.addEventListener("click", function() {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "auto";
    gameData.currentMenu = CHANGELOG;
    gameData.ChangelogButtonOffset = window.pageYOffset;
    instructionsMenu.style.display = instructionsTitle.style.display = "none";
    changelog.style.display = "grid";
    changelogTitle.style.display = "block";
    focusOn(changelogBackButton);
    pauseHoverOverAudio();
    window.scrollTo(0, 0);
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
});

changelogBackButton.addEventListener("click", function() {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "auto";
    gameData.currentMenu = INSTRUCTIONSMENU;
    instructionsMenu.style.display = "grid";
    instructionsTitle.style.display = "block";
    changelog.style.display = changelogTitle.style.display = "none";
    focusOn(changelogButton);
    pauseHoverOverAudio();
    window.scrollTo(0, gameData.ChangelogButtonOffset);
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
})

instructionsBackButton.addEventListener("click", function() {
    instructionsMenu.style.display = instructionsTitle.style.display = "none";
    mainMenu.style.display = wrapper.style.display = "grid";
    gameData.currentMenu = MAINMENU;
    focusOn(startButton);
    pauseHoverOverAudio();
});

themeSelectionNext.addEventListener("click", function() {
    updateTheme(gameData.settingsData["theme"] + 1);
});

themeSelectionPrev.addEventListener("click", function() {
    updateTheme(gameData.settingsData["theme"] - 1);
});