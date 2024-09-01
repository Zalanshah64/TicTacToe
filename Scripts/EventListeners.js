//When the page first loads up, start writing the start menu
window.addEventListener("load", () => {
    faviconCanvas.width = FAVICONCANVASSIZE;
    faviconCanvas.height = FAVICONCANVASSIZE;

    redrawFavicon();
    redrawCursor();

    startMenuData.subtitle = maxWidth.matches ? "Tap anywhere to start" : "Press Enter to start";
    setTimeout(writeStartMenu, 500);

});

document.querySelector("body").addEventListener("click", () => {
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
document.addEventListener("keydown", (event) => {
    if(((event.key === "s" || event.key === "S") && event.ctrlKey)
        || (event.key === "Down" || event.key === "ArrowDown")
        || (event.key === "Up" || event.key === "ArrowUp")) {
        event.preventDefault();
    }
});

document.addEventListener("keyup", (event) => {
    //If the user has already played a move and that move is currently taking place,
    //don't play another move
    if(gameData.keyPress) {
        return;
    }

    gameData.keyPress = true;

    switch(event.key) {
        case "Enter":
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
            }

            break;
        case " ":
            //If the game is currently being played, click that button
            if(gameData.currentMenu === NOTFINISHED && gameData.gameResult === NOTFINISHED && typeof gameData.currentFocus == "number") {
                gameboard[gameData.currentFocus].idElement.click();
            } else if(gameData.currentMenu === SETTINGSMENU && gameData.currentFocus != volumeSlider) {
                gameData.currentFocus.click();
            }
            break;

        case "s":
        case "S":
            if(event.ctrlKey && gameData.currentMenu == NOTFINISHED && gameData.gameResult != NOTFINISHED) {
                shareGameBoard.click();
            }
            break;
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
                        break;

                    case settingsPostGameButton:
                        focusOn(mainMenuButton);
                        break;

                    case playAgainButton:
                        focusOn(shareGameBoard);
                        break;

                    case shareGameBoard:
                        focusOn(playAgainButton);
                        break;

                    case saveImageButton:
                        focusOn(copyToClipBoardButton);
                        break;

                    case copyToClipBoardButton:
                        focusOn(mobileShareButton);
                        break;

                    case mobileShareButton:
                        focusOn(exitPopupButton);
                        break;

                    case exitPopupButton:
                        focusOn(saveImageButton);
                        break;
                }
            } else if(gameData.currentMenu == SETTINGSMENU) {
                switch(gameData.currentFocus) {
                    case volumeSlider:
                        event.preventDefault();
                        focusOn(suggestionsSwitch);
                        break;
                    case suggestionsSwitch:
                        focusOn(switchTurnsSwitch);
                        break;
                    case switchTurnsSwitch:
                        focusOn(AISwitch);
                        break;
                    case AISwitch:
                        if(gameData.settingsData["AI"]) {
                            focusOn(AIDifficultySelection);
                        } else {
                            focusOn(fullscreenSwitch);
                        }
                        break;
                    case AIDifficultySelection:
                        focusOn(fullscreenSwitch);
                        break;
                    case fullscreenSwitch:
                        focusOn(playerOneIconSelection);
                        break;
                    case playerOneIconSelection:
                        focusOn(playerTwoIconSelection);
                        break;
                    case playerTwoIconSelection:
                        focusOn(themeSelection);
                        break;
                    case themeSelection:
                        focusOn(settingsBackButton);
                        break;
                    case settingsBackButton:
                        focusOn(volumeSlider);
                        break;
                }
            } else if(gameData.currentMenu == NOTFINISHED && gameData.gameResult == NOTFINISHED && gameData.settingsData["suggestions"]) {
                moveSuggestion(DOWN);
            }
            break;

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
                        break;

                    case settingsPostGameButton:
                        focusOn(mainMenuButton);
                        break;

                    case playAgainButton:
                        focusOn(shareGameBoard);
                        break;

                    case shareGameBoard:
                        focusOn(playAgainButton);
                        break;

                    case saveImageButton:
                        focusOn(exitPopupButton);
                        break;

                    case copyToClipBoardButton:
                        focusOn(saveImageButton);
                        break;

                    case mobileShareButton:
                        focusOn(copyToClipBoardButton);
                        break;

                    case exitPopupButton:
                        focusOn(mobileShareButton);
                        break;
                }
            } else if(gameData.currentMenu == SETTINGSMENU) {
                switch(gameData.currentFocus) {
                    case volumeSlider:
                        event.preventDefault();
                        focusOn(settingsBackButton);
                        break;

                    case suggestionsSwitch:
                        focusOn(volumeSlider);
                        break;

                    case switchTurnsSwitch:
                        focusOn(suggestionsSwitch);
                        break;

                    case AISwitch:
                        focusOn(switchTurnsSwitch);
                        break;

                    case AIDifficultySelection:
                        focusOn(AISwitch);
                        break;

                    case fullscreenSwitch:
                        if(gameData.settingsData["AI"]) {
                            focusOn(AIDifficultySelection);
                        } else {
                            focusOn(AISwitch);
                        }
                        break;

                    case playerOneIconSelection:
                        focusOn(fullscreenSwitch);
                        break;

                    case playerTwoIconSelection:
                        focusOn(playerOneIconSelection);
                        break;

                    case themeSelection:
                        focusOn(playerTwoIconSelection);
                        break;

                    case settingsBackButton:
                        focusOn(themeSelection);
                        break;
                }
            } else if(gameData.currentMenu == NOTFINISHED && gameData.settingsData["suggestions"]) {
                moveSuggestion(UP);
            }
            break;

        case "a":
        case "A":
        case "Left":
        case "ArrowLeft":
            if((gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED))) {
                switch(gameData.currentFocus) {
                    case mainMenuButton:
                        focusOn(playAgainButton);
                        break;

                    case playAgainButton:
                        focusOn(mainMenuButton);
                        break;

                    case settingsPostGameButton:
                        focusOn(shareGameBoard);
                        break;

                    case shareGameBoard:
                        focusOn(settingsPostGameButton);
                        break;
                }
            } else if(gameData.currentMenu == NOTFINISHED && gameData.settingsData["suggestions"]) {
                moveSuggestion(LEFT);
            } else if(gameData.currentFocus == AIDifficultySelection) {
                AIDifficultySelectionprev.click();
            } else if(gameData.currentFocus == playerOneIconSelection) {
                playerOneIconSelectionprev.click();
            } else if(gameData.currentFocus == playerTwoIconSelection) {
                playerTwoIconSelectionprev.click();
            } else if(gameData.currentFocus == themeSelection) {
                themeSelectionPrev.click();
            }
            break;

        case "d":
        case "D":
        case "Right":
        case "ArrowRight":
            if((gameData.currentMenu == NOTFINISHED && (gameData.gameResult != NOTFINISHED))) {
                switch(gameData.currentFocus) {
                    case mainMenuButton:
                        focusOn(playAgainButton);
                        break;

                    case playAgainButton:
                        focusOn(mainMenuButton);
                        break;

                    case settingsPostGameButton:
                        focusOn(shareGameBoard);
                        break;

                    case shareGameBoard:
                        focusOn(settingsPostGameButton);
                        break;
                }
            } else if(gameData.currentMenu == NOTFINISHED && gameData.settingsData["suggestions"]) {
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
            break;

        case "Escape":
        case "Backspace":
            handleReturn();

            break;

        case "m":
        case "M":
            toggleMute();
            break;

        case "F":
        case "f":
            fullscreenSwitch.click()
            break;

        case "Z":
        case "z":
            if(event.shiftKey && event.ctrlKey && gameData.currentMenu == NOTFINISHED) {
                redoMove();
            } else if(event.ctrlKey && gameData.currentMenu == NOTFINISHED) {
                undoMove();
            }
            break;
    }

    gameData.keyPress = false;
});

document.addEventListener("fullscreenchange", () => {
    if(gameData.fullscreenRequest) {
        gameData.fullscreenRequest = false;
        return;
    } else {
        gameData.settingsData["fullscreen"] = false;
        document.cookie = "fullscreen=false;"
        fullscreenToggle.checked = !fullscreenToggle.checked;
        updateFullscreenButtons();
        document.isOpenFullScreen = false;
        playClickAudio();
    }
});

for(let i = 0; i < focusable.length; i++) {
    focusable[i].addEventListener("focus", () => {
        playHoverAudio();
    });
}

for(let i = 0; i < focusable.length; i++) {
    focusable[i].addEventListener("click", () => {
        contextReturnButton.style.display = "block";
    });
}

contextReturnButton.addEventListener("click", handleReturn);

for(let i = 0; i < 9; ++i) {
    gameboard[i].idElement.addEventListener("click", () => { squareClick(gameboard[i], true) });

    gameboard[i].idElement.addEventListener("mouseenter", () => {
        if(gameData.gameResult === NOTFINISHED) {
            clearSelections();
            gameData.currentFocus = gameboard[i].pieceNumber;
            gameboard[i].idElement.focus();
        }
    });

    gameboard[i].idElement.addEventListener("focus", (e) => {
        if(gameboard[i].isSelected || gameData.gameResult != NOTFINISHED || !gameData.settingsData["suggestions"]) {
            return;
        }
        clearSelections();
        if(gameData.currentPlayer == PLAYERONE) {
            gameboard[i].idElement.innerHTML = '<p class="selected">' + gameData.settingsData["playerOneIcon"] + '</p>';
        } else if(!gameData.settingsData["AI"]) {
            gameboard[i].idElement.innerHTML = '<p class="selected">' + gameData.settingsData["playerTwoIcon"] + '</p>';
        } else {
            return;
        }
        playHoverAudio();
    });

    gameboard[i].idElement.addEventListener("mouseleave", () => {
        if(gameData.gameResult === NOTFINISHED) {
            gameboard[i].idElement.blur();
        }
    });

    gameboard[i].idElement.addEventListener("blur", () => {
        if(gameboard[i].isSelected || gameData.gameResult != NOTFINISHED || !gameData.settingsData["suggestions"]) {
            return;
        }
        gameboard[i].idElement.innerHTML = "";
    }, true);

}

for(let i = 0; i < hoverOverButtons.length; ++i) {
    hoverOverButtons[i].addEventListener("mouseenter", () => {
        focusOn(hoverOverButtons[i]);
    });
}

for(let i = 0; i < clickSoundButtons.length; ++i) {
    clickSoundButtons[i].addEventListener("click", playClickAudio);
}
updateGrayedOut();

startButton.addEventListener("click", () => {
    gameData.gameResult = gameData.currentMenu = NOTFINISHED;
    gameData.whoStarts = PLAYERONE;
    mainMenu.style.display = "none";
    playerOneScoreHTML.innerHTML = gameData.playerOneScore;
    playerTwoScoreHTML.innerHTML = gameData.playerTwoScore;
    currentTurnHTML.style.display = "block";
    game.style.display = "grid";

    redrawFavicon();

    if(getComputedStyle(scoreTitle[PLAYERONE]).visibility != "hidden") {
        scoreTitle[PLAYERONE].style.display = scoreTitle[PLAYERTWO].style.display = "block";
    }
    playerOneName.innerHTML = gameData.settingsData["playerOneIcon"];
    playerTwoName.innerHTML = gameData.settingsData["playerTwoIcon"];
    currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    if(gameData.settingsData["suggestions"] && !maxWidth.matches) {
        setTimeout(() => {
            gameData.currentFocus = CENTER;
            gameboard[CENTER].idElement.focus();
        }, 100);
    }
});

playAgainButton.addEventListener("click", () => {
    if(gameData.whoStarts == PLAYERONE && gameData.settingsData["switchTurns"]) {
        gameData.whoStarts = PLAYERTWO;
        gameData.currentPlayer = PLAYERTWO;
        currentPlayerHTML.innerHTML = gameData.settingsData["playerTwoIcon"];
    } else {
        gameData.whoStarts = PLAYERONE;
        gameData.currentPlayer = PLAYERONE;
        currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    }

    clearGameInformation();
    gameData.AIwaitTime = 400;
    mainMenuButton.style.display = settingsPostGameButton.style.display =
        playAgainButton.style.display = shareGameBoard.style.display =
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

    redrawFavicon();

    if(gameData.whoStarts == PLAYERTWO) {
        AIPlayMove();
    }
});

shareGameBoard.addEventListener("click", () => {
    popupShareWrapper.style.display = "flex";
    popupWrapper.style.display = "flex";
    popupShareWrapper.style.display = "flex";
    undoMoveButton.style.display = "none";
    redoMoveButton.style.display = "none";
    focusOn(saveImageButton);
});

popupBackground.addEventListener("click", () => {
    exitPopupButton.click();
});

saveImageButton.addEventListener("click", () => {
    shareGameStatus.innerText = "Saving Image...";
    shareGameStatus.style.visibility = "visible";
    html2canvas(board).then((canvas) => {
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        downloadImageLink.href = image;
        downloadImageLink.download = gameData.playerOneScore + "-" + gameData.playerTwoScore + ".png";
        downloadImageLink.click();
    });
    shareGameStatus.innerHTML = "Saved Image";

    setTimeout(() => {
        shareGameStatus.style.visibility = "hidden";
    }, 1000);
});

copyToClipBoardButton.addEventListener("click", () => {
    const result = generateTextCopy();

    navigator.clipboard.writeText(result);

    shareGameStatus.innerText = "Copied to clipboard";
    shareGameStatus.style.visibility = "visible";

    setTimeout(() => {
        shareGameStatus.style.visibility = "hidden";
    }, 1000);
});

mobileShareButton.addEventListener("click", () => {
    const data = {
        title: 'Tic-Tac-Toe',
        text: 'Come play Tic-Tac-Toe!',
        url: '${url}'
    }

    if(navigator.canShare && navigator.canShare(data)) {
        navigator.share(data);
    } else {
        shareGameStatus.innerText = "Unable to share";
        shareGameStatus.style.visibility = "visible";
        setTimeout(() => {
            shareGameStatus.style.visibility = "hidden";
        }, 1000);
    }
});

exitPopupButton.addEventListener("click", () => {
    popupWrapper.style.display = "none";

    if(gameData.currentMenu == MULTIPLAYERMENU) {
        gameData.currentMenu = MAINMENU;
        socket.emit("cancelNewGame");
        popupMultiplayerWrapper.style.display = "none";
        gameData.playingMultiplayer = false;
        gameData.multiplayerPassword = "";
        gameData.multiplayerPlayerNum = null;
        socket.on("gameStart", null);

    } else {
        popupShareWrapper.style.display = "none";
        undoMoveButton.style.display = "block";
        if(gameData.undoMoves.length != 0) {
            redoMoveButton.style.display = "none";
        }
        focusOn(shareGameBoard);
    }
});

settingsPostGameButton.addEventListener("click", () => {
    gameData.currentMenu = SETTINGSMENU;
    settingsMenu.style.display = wrapper.style.display = "block";
    game.style.display = mainMenuButton.style.display = settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = shareGameBoard.style.display = "none";
    scoreTitle[PLAYERONE].style.display = scoreTitle[PLAYERTWO].style.display = "none";
    itsATieHTML.style.display = whoWonHTML.style.display = "none";
    gameData.settingsBackFromLocation = NOTFINISHED;
    setTimeout(() => {
        focusOn(volumeSlider);
        pauseHoverOverAudio();
    }, 100);
});

mainMenuButton.addEventListener("click", () => {
    clearGameInformation();
    gameData.playerOneScore = gameData.playerTwoScore = 0;
    gameData.currentPlayer = PLAYERONE;
    gameData.gameResult = gameData.currentMenu = MAINMENU;
    currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    whoWonHTML.style.display = currentTurnHTML.style.display = itsATieHTML.style.display = "none";
    for(let i = 0; i < gameboard.length; ++i) {
        gameboard[i].isSelected = false;
        gameboard[i].idElement.innerHTML = "";
    }

    mainMenu.style.display = "flex";
    redrawFavicon();
    game.style.display = scoreTitle[PLAYERONE].style.display = scoreTitle[PLAYERTWO].style.display = "none";
    mainMenuButton.style.display = settingsPostGameButton.style.display = "none";
    playAgainButton.style.display = shareGameBoard.style.display = "none";
    focusOn(startButton);

    pauseHoverOverAudio();
});

settingsButton.addEventListener("click", () => {
    gameData.settingsBackFromLocation = MAINMENU;
    mainMenu.style.display = "none";
    settingsTitle.style.display = settingsMenu.style.display = wrapper.style.display = "block";
    gameData.currentMenu = SETTINGSMENU;
    setTimeout(() => {
        focusOn(volumeSlider);
        pauseHoverOverAudio();
    }, 100);
});

AIDifficultySelectionprev.addEventListener("click", () => {
    if(gameData.settingsData["AI"]) {
        (gameData.settingsData["AIDifficulty"])--;
        showAIDifficultySelectionOption(gameData.settingsData["AIDifficulty"]);

        updateAIDifficulty();
    }
});

AIDifficultySelectionnext.addEventListener("click", () => {
    if(gameData.settingsData["AI"]) {
        (gameData.settingsData["AIDifficulty"])++;
        showAIDifficultySelectionOption(gameData.settingsData["AIDifficulty"]);
    }

    updateAIDifficulty();
});

playerOneIconSelectionprev.addEventListener("click", () => {
    (gameData.settingsData["playerOneIconSlideIndex"])--;
    showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    if(gameData.settingsData["playerOneIconSlideIndex"] == gameData.settingsData["playerTwoIconSlideIndex"]) {
        gameData.settingsData["playerOneIconSlideIndex"]--;
        showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    }
});

playerOneIconSelectionnext.addEventListener("click", () => {
    (gameData.settingsData["playerOneIconSlideIndex"])++;
    showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    if(gameData.settingsData["playerOneIconSlideIndex"] == gameData.settingsData["playerTwoIconSlideIndex"]) {
        gameData.settingsData["playerOneIconSlideIndex"]++;
        showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
    }
});

playerTwoIconSelectionprev.addEventListener("click", () => {
    (gameData.settingsData["playerTwoIconSlideIndex"])--;
    showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    if(gameData.settingsData["playerTwoIconSlideIndex"] == gameData.settingsData["playerOneIconSlideIndex"]) {
        gameData.settingsData["playerTwoIconSlideIndex"]--;
        showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    }
});

playerTwoIconSelectionnext.addEventListener("click", () => {
    (gameData.settingsData["playerTwoIconSlideIndex"])++;
    showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    if(gameData.settingsData["playerTwoIconSlideIndex"] == gameData.settingsData["playerOneIconSlideIndex"]) {
        gameData.settingsData["playerTwoIconSlideIndex"]++;
        showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
    }
});

settingsBackButton.addEventListener("click", () => {
    settingsMenu.style.display = settingsTitle.style.display = "none";
    wrapper.style.display = "grid";
    if(gameData.settingsBackFromLocation == MAINMENU) {
        openMainMenu();
        pauseHoverOverAudio();
    } else if(gameData.settingsBackFromLocation == NOTFINISHED) {
        game.style.display = "grid";
        if(getComputedStyle(scoreTitle[PLAYERONE]).visibility != "hidden") {
            scoreTitle[PLAYERONE].style.display = scoreTitle[PLAYERTWO].style.display = "block";
        }
        mainMenuButton.style.display = settingsPostGameButton.style.display = playAgainButton.style.display = shareGameBoard.style.display = "block";
        gameData.currentMenu = NOTFINISHED;
        focusOn(settingsPostGameButton);
        pauseHoverOverAudio();
        if(gameData.gameResult != DRAW) {
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

volumeSlider.addEventListener("input", (e) => {
    const newVolume = e.target.value / 100;
    gameData.settingsData["volume"] = newVolume;
    document.cookie = "volume=" + newVolume + ";";
    updateVolume();
});

volumeSlider.addEventListener("mouseup", () => {
    clickAudio.play();
});

suggestionsToggle.addEventListener("change", () => {
    gameData.settingsData["suggestions"] = !gameData.settingsData["suggestions"];
    document.cookie = "suggestions=" + gameData.settingsData["suggestions"] + ";";
    focusOn(suggestionsSwitch);
    pauseHoverOverAudio();
});

switchTurnsCheckBox.addEventListener("change", () => {
    gameData.settingsData["switchTurns"] = !gameData.settingsData["switchTurns"];
    gameData.whoStarts = PLAYERONE;
    document.cookie = "switchTurns=" + gameData.settingsData["switchTurns"] + ";";
    focusOn(switchTurnsSwitch);
    pauseHoverOverAudio();
});

AIToggle.addEventListener("change", () => {
    gameData.settingsData["AI"] = !gameData.settingsData["AI"];
    document.cookie = "AI=" + gameData.settingsData["AI"] + ";";

    focusOn(AISwitch);
    pauseHoverOverAudio();
    updateGrayedOut();
});

fullscreenToggle.addEventListener("change", () => {
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
    updateFullscreenButtons();
});

instructionsButton.addEventListener("click", () => {
    redrawInstructions(themes[gameData.settingsData.theme]);
    mainMenu.style.display = "none";
    instructionsMenu.style.display = "grid";
    instructionsTitle.style.display = wrapper.style.display = "block";
    gameData.currentMenu = INSTRUCTIONSMENU;
    focusOn(changelogButton);
    pauseHoverOverAudio();
    window.scrollTo(0, 0);
});

changelogButton.addEventListener("click", () => {
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

changelogBackButton.addEventListener("click", () => {
    document.getElementsByTagName("html")[0].style.scrollBehavior = "auto";
    gameData.currentMenu = INSTRUCTIONSMENU;
    instructionsMenu.style.display = "grid";
    instructionsTitle.style.display = "block";
    changelog.style.display = changelogTitle.style.display = "none";
    focusOn(changelogButton);
    pauseHoverOverAudio();
    window.scrollTo(0, gameData.ChangelogButtonOffset);
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
});

instructionsBackButton.addEventListener("click", () => {
    openMainMenu();
    pauseHoverOverAudio();
});

themeSelectionNext.addEventListener("click", () => {
    updateTheme(gameData.settingsData["theme"] + 1);
});

themeSelectionPrev.addEventListener("click", () => {
    updateTheme(gameData.settingsData["theme"] - 1);
});

document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    contextMenu.style.display = "flex";
    if(event.pageX + contextMenu.offsetWidth > getWidth()) {
        contextMenu.style.left = (event.pageX - contextMenu.offsetWidth) + "px";
    } else {
        contextMenu.style.left = event.pageX + "px";
    }
    if(event.pageY + contextMenu.offsetHeight > getHeight()) {
        contextMenu.style.top = (event.pageY - contextMenu.offsetHeight) + "px";
    } else {
        contextMenu.style.top = event.pageY + "px";
    }
});

document.addEventListener("click", () => {
    contextMenu.style.display = "none";
});

contextFullscreenButton.addEventListener("click", () => {
    fullscreenToggle.click();
});

contextWindowedButton.addEventListener("click", () => {
    fullscreenToggle.click();
});

contextMuteButton.addEventListener("click", toggleMute);

contextUnmuteButton.addEventListener("click", toggleMute);

contextUndoButton.addEventListener("click", undoMove);

contextRedoButton.addEventListener("click", redoMove);

window.addEventListener("gamepadconnected", (event) => {
    const gamepad = navigator.getGamepads()[event.gamepad.index];
    if(gameData.playerOneGamepad == null) {
        console.log("YUHHH")
        gameData.playerOneGamepadIndex = gamepad.index;
        checkGamepadState();
    } else if(gameData.playerTwoGamepad == null) {
        gameData.playerTwoGamepadIndex = gamepad.index;
    }
});

multiplayerButton.addEventListener("click", () => {
    socket = io('https://zalanshah.com/api/TicTacToe', {
        path: '/socket.io',
        transports: ['websocket', 'polling'],  // Allows WebSocket and polling as fallback
        timeout: 5000
    });
    // socket = io('localhost:8000', {
    //     path: '/api/TicTacToe',
    //     transports: ['websocket', 'polling'],  // Allows WebSocket and polling as fallback
    //     timeout: 5000
    // });

    let numDots = 1;
    let connected = false;

    let connectionAnimation = setInterval(() => {
        if(socket == null) {
            clearInterval(connectionAnimation)
            return;
            // TODO: Put something here to show the connection couldn't be made
        }

        if(connected) {
            clearInterval(connectionAnimation);
            return;
        }

        connectingToServer.innerHTML = "Connecting to server" + ".".repeat(numDots);

        numDots = (numDots + 1) % 4;
    }, 400);

    gameData.currentMenu = MULTIPLAYERMENU;
    mainMenu.style.display = "none";
    multiplayerMenuWrapper.style.display = "flex";

    let connectionTimeout = setTimeout(() => {
        socket.disconnect();
        socket = null;
        alert("Unable to connect")
    }, 5000);

    socket.on("connectACK", (data) => {
        clearTimeout(connectionTimeout);
        clearTimeout(connectionAnimation);

        connectingToServer.style.display = "none";
        multiplayerMenu.style.display = "flex";
    })
});


multiplayerNewGameButton.addEventListener("click", () => {
    if(socket == null) return;

    socket.on("newGameACK", (password) => {
        gameData.multiplayerPassword = password;
        gameData.playingMultiplayer = true;
        gameData.multiplayerPlayerNum = PLAYERONE;
        popupMultiplayerWrapper.style.display = "flex";
        popupWrapper.style.display = "flex";

        gamePasswordText.innerText = password;
        socket.on("disconnect", handleMultiplayerDisconnect)
        socket.on("newGameACK", null);
        socket.on("gameStart", startMultiplayerGame);
    })
    socket.emit("newGame");
});

MultiplayerBackButton.addEventListener("click", () => {
    socket.disconnect();
    socket = null;

    multiplayerMenuWrapper.style.display = "none";
    multiplayerMenu.style.display = "none";
    openMainMenu();
})

multiplayerJoinGameButton.addEventListener("click", () => {
    if(socket == null) return;

    socket.on("joinGameACK", () => {
        gameData["multiplayerPassword"] = multiplayerJoinGameInput.value;
        gameData["playingMultiplayer"] = true;
        gameData["multiplayerPlayerNum"] = PLAYERTWO;

        multiplayerJoinGameInput.value = "";
        socket.on("joinGameACK", null);
        socket.on("joinGameNACK", null);
        socket.on("gameStart", startMultiplayerGame);

        socket.on("makeMove", (data) => {
            squareClick(gameboard[data.pieceNumber], false, false, true);
            socket.on("makeMove", null);
        });

        socket.on("disconnect", handleMultiplayerDisconnect)
    })

    socket.on("joinGameNACK", () => {
        alert("Unable to join game")
        socket.on("joinGameNACK", null);
        socket.on("joinGameACK", null);
    });

    socket.emit("joinGame", multiplayerJoinGameInput.value);
});