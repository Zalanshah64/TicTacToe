function squareClick(gamePiece, playerClicked) {
    //If the current player is player one, the game hasn't ended, and that gamePiece hasn't previously been clicked,
    //do everything needed to represent it being clicked
    if(gameData.currentPlayer == PLAYERONE && !gamePiece.isSelected && gameData.gameResult == NOTFINISHED) {
        gamePiece.idElement.innerHTML = '<p class="clicked">'+ gameData.settingsData["playerOneIcon"] + '</p>';
        gameData.playerOneSelected.push(gamePiece);
        gameData.playerOneSelectedIds.push(gamePiece.pieceNumber);
        if(!hoverOverAudio.paused) {
        hoverOverAudio.pause();
    };
        currentPlayerHTML.innerHTML = gameData.settingsData["playerTwoIcon"];

    //If the current player is player two, the game hasn't ended, and that gamePiece hasn't previously been clicked,
    //do everything needed to represent it being clicked
    } else if(!gamePiece.isSelected && gameData.gameResult == NOTFINISHED && ((!playerClicked && gameData.settingsData["AI"]) || (playerClicked && !gameData.settingsData["AI"]))) {
        gamePiece.idElement.innerHTML = '<p class="clicked">' + gameData.settingsData["playerTwoIcon"] + '</p>';
        gameData.playerTwoSelected.push(gamePiece);
        gameData.playerTwoSelectedIds.push(gamePiece.pieceNumber);
        if(!hoverOverAudio.paused) {
        hoverOverAudio.pause();
    };
        currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    } else {
        return;
    }

    //Remove that gamePiece from the possible list of clickable items
    gamePiece.isSelected = true;
    gamePiece.idElement.classList.remove("unclicked");

    //Check if the game has ended, and update information and play sounds accordingly
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

    //If the game hasn't ended and it's the AI's turn to play, have them move and slow down their rate of movement
    if(gameData.settingsData["AI"] && gameData.currentPlayer == PLAYERTWO && gameData.gameResult == NOTFINISHED) {
        setTimeout(function(){
            AIPlayMove();
        }, gameData.AIwaitTime);
        gameData.AIwaitTime += 75;
    }
}

function checkWin() {
    //If player one has won, update all relevant information
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
        if(!hoverOverAudio.paused) {
            hoverOverAudio.pause();
        };
        return PLAYERONE;
    } else {
        //If player two has won, update their relevant information
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
            if(!hoverOverAudio.paused) {
        hoverOverAudio.pause();
    };
            return PLAYERTWO;
        } else {
            //If the game is a tie, update all relevant information to reflect that
            if(gameData.playerOneSelectedIds.length + gameData.playerTwoSelectedIds.length == 9) {
                gameData.gameResult = DRAW;
                currentTurnHTML.style.display = "none";
                itsATieHTML.style.display = "block";
                mainMenuButton.style.display = "block";
                settingsPostGameButton.style.display = "block";
                playAgainButton.style.display = "block";
                saveGameBoard.style.display = "block";
                focusOn(mainMenuButton);
                if(!hoverOverAudio.paused) {
        hoverOverAudio.pause();
    };
                return DRAW;
            }
        }
    }
    return NOTFINISHED;
}

//Check every possible combination to see whether a player has selected any winning combination
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

//Given the AI's new difficulty, update relevant information
function showAIDifficultySelectionOption(n) {
    //If n is past the end of the carousel, bring it to the beginning
    if (n > AIDIfficultySelections.length - 1) {
        gameData.settingsData["AIDifficulty"] = 0;
    }
    //If n is less than 0, bring it to the end of the carousel
    if (n < 0) {
        gameData.settingsData["AIDifficulty"] = AIDIfficultySelections.length - 1;
    }

    //Turn off every other carousel option, and set the current one on
    for (let i = 0; i < AIDIfficultySelections.length; i++) {
        AIDIfficultySelections[i].style.display = "none";
    }

    AIDIfficultySelections[gameData.settingsData["AIDifficulty"]].style.display = "flex";
    document.cookie = "AIDifficulty=" + gameData.settingsData["AIDifficulty"] + ";";
}

//Given the index of player one's icon, update relevant information
function showPlayerOneSelectionOption(n) {
    //If n is past the end of the carousel, bring it to the beginning
    if (n > playerOneSelections.length - 1) {
        gameData.settingsData["playerOneIconSlideIndex"] = 0;
    }

    //If n is less than 0, bring it to the end of the carousel
    if (n < 0) {
        gameData.settingsData["playerOneIconSlideIndex"] = playerOneSelections.length - 1;
    }

    //Turn off every other carousel option, and set the current one on
    for (let i = 0; i < playerOneSelections.length; i++) {
        playerOneSelections[i].style.display = "none";
    }

    playerOneSelections[gameData.settingsData["playerOneIconSlideIndex"]].style.display = "flex";
    gameData.settingsData["playerOneIcon"] = playerOneSelections[gameData.settingsData["playerOneIconSlideIndex"]].innerHTML;
    document.cookie = "playerOneIconSlideIndex=" + gameData.settingsData["playerOneIconSlideIndex"] + ";";
}

  //Given the index of player two's icon, update relevant information
function showPlayerTwoSelectionOption(n) {
    //If n is past the end of the carousel, bring it to the beginning
    if (n >= playerTwoSelections.length) {
        gameData.settingsData["playerTwoIconSlideIndex"] = 0;
    }

    //If n is less than 0, bring it to the end of the carousel
    if (n < 0) {
        gameData.settingsData["playerTwoIconSlideIndex"] = playerTwoSelections.length - 1;
    }

    //Turn off every other carousel option, and set the current one on
    for (let i = 0; i < playerTwoSelections.length; i++) {
        playerTwoSelections[i].style.display = "none";
    }
    playerTwoSelections[gameData.settingsData["playerTwoIconSlideIndex"]].style.display = "flex";
    gameData.settingsData["playerTwoIcon"] = playerTwoSelections[gameData.settingsData["playerTwoIconSlideIndex"]].innerHTML;
    document.cookie = "playerTwoIconSlideIndex=" + gameData.settingsData["playerTwoIconSlideIndex"] + ";";
}

  //Focus on the given element
function focusOn(element) {
    if(!maxWidth.matches) {
        gameData.currentFocus = element;
        element.focus();
    }
}


  //Update the volume and all it's relevant information
function updateVolume() {
    playerOneMoveAudio.volume = gameData.settingsData["volume"];
    playerTwoMoveAudio.volume = gameData.settingsData["volume"];
    hoverOverAudio.volume = gameData.settingsData["volume"];
    clickAudio.volume = gameData.settingsData["volume"];
    gameStartAudio.volume = gameData.settingsData["volume"];
    WinnerAudio.volume = gameData.settingsData["volume"];
    DrawAudio.volume = gameData.settingsData["volume"];
}

function updateTheme(themeIndex) {

    if(themeIndex > themeSelections.length - 1) {
        themeIndex = 0;
    } else if(themeIndex < 0) {
        themeIndex = themeSelections.length - 1;
    }

    for(let i = 0; i < themeSelections.length; ++i) {
        themeSelections[i].style.display = "none";
    }

    gameData.settingsData["theme"] = themeIndex;
    themeSelections[themeIndex].style.display = "flex";

    switch(themeIndex) {
        case MONO:
            root.style.setProperty("--main", "var(--monoMain)");
            root.style.setProperty("--secondary", "var(--monoSecondary)");
            root.style.setProperty("--highlight", "var(--monoHighlight)");
            break;
        case GAMEBOY:
            root.style.setProperty("--main", "var(--gameboyMain)");
            root.style.setProperty("--secondary", "var(--gameboySecondary)");
            root.style.setProperty("--highlight", "var(--gameboyHighlight)");
            break;
        case VAMPIRE:
            root.style.setProperty("--main", "var(--vampireMain)");
            root.style.setProperty("--secondary", "var(--vampireSecondary)");
            root.style.setProperty("--highlight", "var(--vampireHighlight)");
            break;
        case SNES:
            root.style.setProperty("--main", "var(--snesMain)");
            root.style.setProperty("--secondary", "var(--snesSecondary)");
            root.style.setProperty("--highlight", "var(--snesHighlight)");
            break;
        case HALLOWEEN:
            root.style.setProperty("--main", "var(--halloweenMain)");
            root.style.setProperty("--secondary", "var(--halloweenSecondary)");
            root.style.setProperty("--highlight", "var(--halloweenHighlight)");
            break;
        case UMICH:
            root.style.setProperty("--main", "var(--umichMain)");
            root.style.setProperty("--secondary", "var(--umichSecondary)");
            root.style.setProperty("--highlight", "var(--umichHighlight)");
            break;
        case BUBBLEGUM:
            root.style.setProperty("--main", "var(--bubblegumMain)");
            root.style.setProperty("--secondary", "var(--bubblegumSecondary)");
            root.style.setProperty("--highlight", "var(--bubblegumHighlight)");
            break;
    }

    document.cookie = "theme=" + themeIndex + ";";


}

  //Turn off the hover audio if it's currently playing, and play it from the start
function playHoverAudio() {
    if(!hoverOverAudio.paused) {
        hoverOverAudio.pause();
        hoverOverAudio.currentTime = 0;
    }

    hoverOverAudio.play().catch(function() {
        hoverOverAudio.currentTime = 0;
    });
}

  //Turn off the click audio if it's currently playing, and play it from the start
function playClickAudio() {
    if(!clickAudio.paused) {
        clickAudio.pause();
    }
    let promise = clickAudio.play();

    promise.catch(function() {
        clickAudio.currentTime = 0;
    });
 }

//Update whether the AI difficulty is grayed out or not depending on whether AI is active
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


//Have the AI play a move
  function AIPlayMove() {
      //Generate a random number, and see if that random number passes the AI difficulty
      //threshold. If it does, check for a valid move in this order:
      //    - See if a square would cause a win, and play it to win
      //    - See if a square would cause you to win, and play it to block
      //    - See if center square is played, and play it
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

    //If the threshold was not passed or none of the checks were passed, play a random valid square
    let potentialSquare = Math.floor(Math.random() * 9);
    while((gameData.playerOneSelectedIds.includes(potentialSquare) || gameData.playerTwoSelectedIds.includes(potentialSquare))) {
        potentialSquare = Math.floor(Math.random() * 9);
    }
    squareClick(gameboard[potentialSquare], false);
  }

//Check if the AI should block a specific edge that the opponent could win with
function AIEdgeBlockTest(edge, horizontalOne, horizontalTwo, verticalOne, verticalTwo) {
    return (!gameData.playerTwoSelectedIds.includes(edge) && gameData.playerOneSelectedIds.includes(horizontalOne) && gameData.playerOneSelectedIds.includes(horizontalTwo))
        || (!gameData.playerTwoSelectedIds.includes(edge) && gameData.playerOneSelectedIds.includes(verticalOne) && gameData.playerOneSelectedIds.includes(verticalTwo));
}

//Check if the AI should block a specific corner that the opponent could win with
function AICornerBlockTest(corner, horizontalOne, horizontalTwo, verticalOne, verticalTwo, diagonal) {
    return (!gameData.playerTwoSelectedIds.includes(corner) && gameData.playerOneSelectedIds.includes(horizontalOne) && gameData.playerOneSelectedIds.includes(horizontalTwo))
        || (!gameData.playerTwoSelectedIds.includes(corner) && gameData.playerOneSelectedIds.includes(verticalOne) && gameData.playerOneSelectedIds.includes(verticalTwo))
        || (!gameData.playerTwoSelectedIds.includes(corner) && gameData.playerOneSelectedIds.includes(CENTER) && gameData.playerOneSelectedIds.includes(diagonal));
}

//Check if the AI should play a specific edge to win the game
function AIEdgeWinTest(edge, horizontalOne, horizontalTwo, verticalOne, verticalTwo) {
    return (!gameData.playerOneSelectedIds.includes(edge) && gameData.playerTwoSelectedIds.includes(horizontalOne) && gameData.playerTwoSelectedIds.includes(horizontalTwo))
        || (!gameData.playerOneSelectedIds.includes(edge) && gameData.playerTwoSelectedIds.includes(verticalOne) && gameData.playerTwoSelectedIds.includes(verticalTwo));
}

//Check if the AI should play a specific corner to win the game
function AICornerWinTest(corner, horizontalOne, horizontalTwo, verticalOne, verticalTwo, diagonal) {
    return (!gameData.playerOneSelectedIds.includes(corner) && gameData.playerTwoSelectedIds.includes(horizontalOne) && gameData.playerTwoSelectedIds.includes(horizontalTwo))
        || (!gameData.playerOneSelectedIds.includes(corner) && gameData.playerTwoSelectedIds.includes(verticalOne) && gameData.playerTwoSelectedIds.includes(verticalTwo))
        || (!gameData.playerOneSelectedIds.includes(corner) && gameData.playerTwoSelectedIds.includes(CENTER) && gameData.playerTwoSelectedIds.includes(diagonal));
}

//When the webpage first loads, animate the opening screen to show text appearing
function writeStartMenu() {

    //Show "Tic-Tac-Toe"
    if(!startMenuData.titleCompleted) {
        startMenuTitle.innerHTML += startMenuData.title.charAt(startMenuData.i);
        startMenuData.i++;
        if(startMenuData.i == startMenuData.title.length) {
        startMenuData.i = 0;
        startMenuData.titleCompleted = true;
    }
    setTimeout(writeStartMenu, startMenuData.speed);
    } else if(!startMenuData.creditsCompleted) {
        //Show "A game by Zalan Shah"
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
        //Show "Press Enter to Start"
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

//If the game is currently being played and the user wants to go up, down, left, or right, play
//the valid location they are able to go to
function moveSuggestion(direction) {
    switch(direction) {
        case UP:
            if(onEdge(gameData.currentFocus, UP)) {
                return;
            }

            if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus - 3)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus - 3)))) {
                gameData.currentFocus -= 3;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus - 6)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus - 6)))
                   && onEdge(gameData.currentFocus, DOWN)) {
                gameData.currentFocus -= 6;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus - 4)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus - 4)))
                   && !onEdge(gameData.currentFocus, UP) && !onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus -= 4;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 2) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 2))
                   && !onEdge(gameData.currentFocus, UP) && !onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus -= 2;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 7) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 7))
                    && onEdge(gameData.currentFocus, DOWN) && !onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus -= 7;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 5) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 5))
                   && !onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus -= 5;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 5) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 5))
                   && onEdge(gameData.currentFocus, DOWN) && onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus -= 5;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 8) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 8))
                   && onEdge(gameData.currentFocus, DOWN) && onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus -= 8;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 1) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 1))
                   && onEdge(gameData.currentFocus, DOWN) && onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus--;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 4) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 4))
                   && onEdge(gameData.currentFocus, DOWN) && onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus -= 4;
                gameboard[gameData.currentFocus].idElement.focus();
            }

            return;

        case DOWN:
            if(onEdge(gameData.currentFocus, DOWN)) {
                return;
            }

            if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus + 3)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus + 3)))) {
                gameData.currentFocus += 3;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus + 6)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus + 6)))
                   && onEdge(gameData.currentFocus, UP)) {
                gameData.currentFocus += 6;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus + 2)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus + 2)))
                    && !onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus += 2;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 4) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 4))
                    && !onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus += 4;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 5) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 5))
                    && onEdge(gameData.currentFocus, UP) && !onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus += 5;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 7) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 7))
                    && onEdge(gameData.currentFocus, UP) && !onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus += 7;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 5) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 5))
            && onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus += 5;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 8) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 8))
            && onEdge(gameData.currentFocus, UP) && onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus += 8;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 1) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 1))
            && onEdge(gameData.currentFocus, UP) && onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus++;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 4) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 4))
            && onEdge(gameData.currentFocus, UP) && onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus += 4;
                gameboard[gameData.currentFocus].idElement.focus();
            }

            return;

        case LEFT:
            if(onEdge(gameData.currentFocus, LEFT)) {
                return;
            }

            if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus - 1)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus - 1)))) {
                gameData.currentFocus--;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus - 2)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus - 2)))
                   && onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus -= 2;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus - 4)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus - 4)))
                   && !onEdge(gameData.currentFocus, UP)) {
                gameData.currentFocus -= 4;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 2) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 2))
                   && !onEdge(gameData.currentFocus, DOWN)) {
                gameData.currentFocus += 2;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 1) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 1))
                   && onEdge(gameData.currentFocus, RIGHT) && !onEdge(gameData.currentFocus, DOWN)) {
                gameData.currentFocus++;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 5) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 5))
                   && !onEdge(gameData.currentFocus, DOWN) && onEdge(gameData.currentFocus, UP)) {
                gameData.currentFocus += 5;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 4) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 4))
                   && onEdge(gameData.currentFocus, RIGHT) && onEdge(gameData.currentFocus, UP)) {
                gameData.currentFocus += 4;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 5) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 5))
                   && onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus -= 5;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 7) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 7))
                   && onEdge(gameData.currentFocus, DOWN) && onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus -= 7;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 8) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 8))
                   && onEdge(gameData.currentFocus, DOWN) && onEdge(gameData.currentFocus, RIGHT)) {
                gameData.currentFocus -= 8;
                gameboard[gameData.currentFocus].idElement.focus();
            }

            return;

        case RIGHT:
            if(onEdge(gameData.currentFocus, RIGHT)) {
                return;
            }

            if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus + 1)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus + 1)))) {
                gameData.currentFocus++;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus + 2)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus + 2)))
                   && onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus += 2;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes((gameData.currentFocus - 2)) || gameData.playerTwoSelectedIds.includes((gameData.currentFocus - 2)))
                   && !onEdge(gameData.currentFocus, UP)) {
                gameData.currentFocus -= 2;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 4) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 4))
                   && !onEdge(gameData.currentFocus, DOWN)) {
                gameData.currentFocus += 4;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 1) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 1))
                   && onEdge(gameData.currentFocus, LEFT) && !onEdge(gameData.currentFocus, UP)) {
                gameData.currentFocus--;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 5) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 5))
                   && !onEdge(gameData.currentFocus, DOWN) && onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus += 5;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 7) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 7))
                   && onEdge(gameData.currentFocus, LEFT) && onEdge(gameData.currentFocus, UP)) {
                gameData.currentFocus += 7;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus + 8) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus + 8))
                   && onEdge(gameData.currentFocus, LEFT) && onEdge(gameData.currentFocus, UP)) {
                gameData.currentFocus += 8;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 5) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 5))
                   && onEdge(gameData.currentFocus, DOWN) && onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus -= 5;
                gameboard[gameData.currentFocus].idElement.focus();
            } else if(!(gameData.playerOneSelectedIds.includes(gameData.currentFocus - 4) || gameData.playerTwoSelectedIds.includes(gameData.currentFocus - 4))
                   && onEdge(gameData.currentFocus, DOWN) && onEdge(gameData.currentFocus, LEFT)) {
                gameData.currentFocus -= 4;
                gameboard[gameData.currentFocus].idElement.focus();
            }

            return;
    }
}

//Figure out whether a square is on a certain edge
function onEdge(square, edge) {
    if(edge == UP) {
        return square < 3;
    } else if(edge == DOWN) {
        return square > 5;
    } else if(edge == LEFT) {
        return square % 3 == 0;
    } else if(edge == RIGHT) {
        return (square - 2) % 3 == 0;
    }
}

//Clear the selections
function clearSelections() {
    toBeDeleted = document.getElementsByClassName("selected");
    while(toBeDeleted.length != 0) {
        toBeDeleted[0].parentNode.removeChild(toBeDeleted[0]);
    }
}