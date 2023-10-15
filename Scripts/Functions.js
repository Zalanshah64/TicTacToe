function squareClick(gamePiece, playerClicked, redoMove = false) {
    //If the current player is player one, the game hasn't ended, and that gamePiece hasn't previously been clicked,
    //do everything needed to represent it being clicked
    if(gameData.currentPlayer == PLAYERONE && !gamePiece.isSelected && gameData.gameResult == NOTFINISHED) {
        gamePiece.idElement.innerHTML = '<p class="clicked">'+ gameData.settingsData["playerOneIcon"] + '</p>';
        gameData.playerOneSelected.push(gamePiece);
        gameData.playerOneSelectedIds.push(gamePiece.pieceNumber);

        drawFaviconX(Math.floor(gamePiece.pieceNumber / 3), (gamePiece.pieceNumber % 3));

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

        drawFaviconO(Math.floor(gamePiece.pieceNumber / 3), (gamePiece.pieceNumber % 3));

        if(!hoverOverAudio.paused) {
            hoverOverAudio.pause();
        };

        currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    } else {
        return;
    }

    gameData.moves.push(new Move(gameData.currentPlayer, gamePiece.pieceNumber));
    contextUndoButton.style.display = "block";

    if(!redoMove) {
        gameData.undoneMoves = [];
        contextRedoButton.style.display = "none";
    }

    //Remove that gamePiece from the possible list of clickable items
    gamePiece.isSelected = true;
    gamePiece.idElement.classList.remove("unclicked");

    window.navigator.vibrate(100);

    //Check if the game has ended, and update information and play sounds accordingly
    const result = checkWin();
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
    if(gameData.settingsData["AI"] && gameData.currentPlayer == PLAYERTWO && gameData.gameResult == NOTFINISHED && !redoMove) {
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
        whoWonHTML.style.display = mainMenuButton.style.display = settingsPostGameButton.style.display =
        playAgainButton.style.display = shareGameBoard.style.display = "block";
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
            whoWonHTML.style.display = mainMenuButton.style.display = settingsPostGameButton.style.display = "block";
            playAgainButton.style.display = shareGameBoard.style.display = "block";
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
                itsATieHTML.style.display = mainMenuButton.style.display = settingsPostGameButton.style.display =
                playAgainButton.style.display = shareGameBoard.style.display = "block";
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
    playerOneMoveAudio.volume = playerTwoMoveAudio.volume = gameData.settingsData["volume"];
    hoverOverAudio.volume = clickAudio.volume = gameData.settingsData["volume"];
    gameStartAudio.volume = WinnerAudio.volume = DrawAudio.volume = gameData.settingsData["volume"];

    updateContextVolumeButtons();
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

    root.style.setProperty("--main", "var(--" + themes[themeIndex] + "Main)");
    root.style.setProperty("--secondary", "var(--" + themes[themeIndex] + "Secondary)");
    root.style.setProperty("--highlight", "var(--" + themes[themeIndex] + "Highlight)");
    root.style.setProperty("--font", "var(--" + themes[themeIndex] + "Font)");

    redrawFavicon();
    redrawCursor();
    document.cookie = "theme=" + themeIndex + ";";
}

function generateTextCopy() {
    let result = "SCORE: " + gameData.playerOneScore + "-" + gameData.playerTwoScore + "\n\n" + " ";

    for(let i = 0; i < 9; ++i) {
        if(gameData.playerOneSelectedIds.includes(i)) {
            result += "X";
        } else if(gameData.playerTwoSelectedIds.includes(i)) {
            result += "O";
        } else {
            result += " ";
        }

        if(onEdge(i, RIGHT)) {
            result += " ";

            if(!onEdge(i, DOWN)) {
                result += "\n---+---+---\n ";
            }
        } else {
            result += " | ";
        }
    }

    return result;
}

  //Turn off the hover audio if it's currently playing, and play it from the start
function playHoverAudio() {
    if(!hoverOverAudio.paused) {
        hoverOverAudio.pause();
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
    clickAudio.play().catch(function() {
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
    const randomChance = Math.random();
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
    switch(edge) {
        case UP:
            return square < 3;

        case DOWN:
            return square > 5;

        case LEFT:
            return square % 3 == 0;

        case RIGHT:
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

function pauseHoverOverAudio() {
    if(!hoverOverAudio.paused) {
        hoverOverAudio.pause();
    };
}

function updateFavicon() {
    favicon.href = faviconCanvas.toDataURL('image/png');
}

function redrawFavicon() {
    faviconCtx.fillStyle = themeColors[themes[gameData.settingsData.theme]].main;
    // faviconCtx.fillStyle = "#00274C";
    faviconCtx.fillRect(0, 0, FAVICONCANVASSIZE, FAVICONCANVASSIZE);

    faviconCtx.strokeStyle = themeColors[themes[gameData.settingsData.theme]].secondary;
    faviconCtx.lineWidth = FAVICONLINEWIDTH;

    for (let i = 1; i < 3; i++) {
      // Vertical
      faviconCtx.beginPath();
      faviconCtx.moveTo(i * (FAVICONCANVASSIZE / 3), 0);
      faviconCtx.lineTo(i * (FAVICONCANVASSIZE / 3), FAVICONCANVASSIZE);
      faviconCtx.stroke();

      // Horizontal
      faviconCtx.beginPath();
      faviconCtx.moveTo(0, i * (FAVICONCANVASSIZE / 3));
      faviconCtx.lineTo(FAVICONCANVASSIZE, i * (FAVICONCANVASSIZE / 3));
      faviconCtx.stroke();
    }

    faviconCtx.strokeStyle = themeColors[themes[gameData.settingsData.theme]].highlight;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(gameboard[(i * 3) + j].isSelected &&
               gameboard[(i * 3) + j].idElement.textContent === 'X') {
                drawFaviconX(i, j);
            } else if(gameboard[(i * 3) + j].isSelected &&
                      gameboard[(i * 3) + j].idElement.textContent === 'O') {
                drawFaviconO(i, j);
            }
        }
    }

    updateFavicon();
}

function drawFaviconX(row, column) {
    const xOffset = column * FAVICONSQUARESIZE;
    const yOffset = row * FAVICONSQUARESIZE;

    faviconCtx.lineWidth = FAVICONLETTERWIDTH;

    faviconCtx.beginPath();
    faviconCtx.moveTo(xOffset + 1, yOffset + 1);
    faviconCtx.lineTo(xOffset + FAVICONSQUARESIZE - 1, yOffset + FAVICONSQUARESIZE - 1);
    faviconCtx.moveTo(xOffset + FAVICONSQUARESIZE - 1, yOffset + 1);
    faviconCtx.lineTo(xOffset + 1, yOffset + FAVICONSQUARESIZE - 1);
    faviconCtx.stroke();

    updateFavicon();
}

function drawFaviconO(row, column) {
    const xOffset = column * FAVICONSQUARESIZE + FAVICONSQUARESIZE / 2;
    const yOffset = row * FAVICONSQUARESIZE + FAVICONSQUARESIZE / 2;
    const radius = (FAVICONSQUARESIZE - 3) / 2;

    faviconCtx.lineWidth = FAVICONLETTERWIDTH;

    faviconCtx.beginPath();
    faviconCtx.arc(xOffset, yOffset, radius, 0, 2 * Math.PI);
    faviconCtx.stroke();

    updateFavicon();
}

function redrawCursor() {
    cursorDefaultCanvas.height = 15;
    cursorDefaultCanvas.width = 15;

    cursorClickDownCanvas.height = 15;
    cursorClickDownCanvas.width = 15;

    cursorDefaultCtx.imageSmoothingEnabled = false;
    cursorClickDownCtx.imageSmoothingEnabled = false;

    cursorDefaultCtx.arc(7.5, 7.5, 5, 0, Math.PI * 2);
    cursorDefaultCtx.fillStyle  = themeColors[themes[gameData.settingsData.theme]]["secondary"];
    cursorDefaultCtx.fill();

    cursorClickDownCtx.arc(7.5, 7.5, 4.5, 0, Math.PI * 2);
    cursorClickDownCtx.fillStyle  = themeColors[themes[gameData.settingsData.theme]]["highlight"];
    cursorClickDownCtx.fill();

    cursorDefaultCtx.lineWidth = 2;
    cursorDefaultCtx.strokeStyle = themeColors[themes[gameData.settingsData.theme]]["main"];
    cursorDefaultCtx.stroke();

    cursorClickDownCtx.lineWidth = 2.5;
    cursorClickDownCtx.strokeStyle = themeColors[themes[gameData.settingsData.theme]]["main"];
    cursorClickDownCtx.stroke();

    root.style.setProperty("--cursorURL", "url(" + cursorDefaultCanvas.toDataURL() + ") 10 10, auto");
    root.style.setProperty("--cursorClickDownURL", "url(" + cursorClickDownCanvas.toDataURL() + ") 10 10, auto");
}

function redrawInstructions(theme) {
    instructionFirstCanvas.height = 255;
    instructionFirstCanvas.width = 360;

    const ctxFirst = instructionFirstCanvas.getContext("2d");
    ctxFirst.clearRect(0, 0, instructionFirstCanvas.width, instructionFirstCanvas.height);

    ctxFirst.strokeStyle = themeColors[theme]["secondary"];
    ctxFirst.lineWidth = 10;

    for(let i = 1; i < 3; i++) {
        const x = i * 120;
        const y = i * 85;

        // Draw Horizontal Line
        ctxFirst.beginPath();
        ctxFirst.moveTo(x, 0);
        ctxFirst.lineTo(x, 255);
        ctxFirst.stroke();

        // Draw Vertical Line
        ctxFirst.beginPath();
        ctxFirst.moveTo(0, y);
        ctxFirst.lineTo(360, y);
        ctxFirst.stroke();
    }

    let playerOneIcon = gameData.settingsData.playerOneIcon;
    let playerTwoIcon = gameData.settingsData.playerTwoIcon;

    let playerOneTextSize = 43;
    let playerTwoTextSize = 43;

    switch(gameData.settingsData.playerOneIconSlideIndex) {
        // <3 OR &lt;3
        case 7:
            playerOneIcon = "<3"
            playerOneTextSize = 33;
        break;
            // </3 OR &lt;/3
        case 8:
            playerOneIcon = "</3"
            playerOneTextSize = 28;
            break;
    }

    switch(gameData.settingsData.playerTwoIconSlideIndex) {
        // <3 OR &lt;3
        case 7:
            playerTwoIcon = "<3"
            playerTwoTextSize = 33;
            break;
            // </3 OR &lt;/3
        case 8:
            playerTwoIcon = "</3"
            playerTwoTextSize = 28;
            break;
    }

    instructionSecondCanvas.height = 255;
    instructionSecondCanvas.width = 360;
    const ctxSecond = instructionSecondCanvas.getContext("2d");
    ctxSecond.drawImage(instructionFirstCanvas, 0, 0);
    ctxSecond.fillStyle = themeColors[theme]["secondary"];
    ctxSecond.lineWidth = 7;
    ctxSecond.font = `${playerOneTextSize}px ${theme}`;
    ctxSecond.fillText(playerOneIcon, 37, 60);

    instructionThirdCanvas.height = 255;
    instructionThirdCanvas.width = 360;
    const ctxThird = instructionThirdCanvas.getContext("2d");
    ctxThird.drawImage(instructionSecondCanvas, 0, 0);
    ctxThird.fillStyle = themeColors[theme]["secondary"];
    ctxThird.lineWidth = 7;
    ctxThird.font = `${playerTwoTextSize}px ${theme}`;
    ctxThird.fillText(playerTwoIcon, 160, 145);

    instructionFourthCanvas.height = 255;
    instructionFourthCanvas.width = 360;
    const ctxFourth = instructionFourthCanvas.getContext("2d");
    ctxFourth.drawImage(instructionThirdCanvas, 0, 0);
    ctxFourth.fillStyle = themeColors[theme]["secondary"];
    ctxFourth.lineWidth = 7;
    ctxFourth.font = `${playerOneTextSize}px ${theme}`;
    ctxFourth.fillText(playerOneIcon, 37, 145);
    ctxFourth.fillText(playerOneIcon, 37, 235);
    ctxFourth.font = `${playerTwoTextSize}px ${theme}`;
    ctxFourth.fillText(playerTwoIcon, 280, 60);

    instructionFifthCanvas.height = 255;
    instructionFifthCanvas.width = 360;
    const ctxFifth = instructionFifthCanvas.getContext("2d");
    ctxFifth.drawImage(instructionThirdCanvas, 0, 0);
    ctxFifth.fillStyle = themeColors[theme]["secondary"];
    ctxFifth.lineWidth = 7;

    ctxFifth.font = `${playerOneTextSize}px ${theme}`;
    ctxFifth.fillText(playerOneIcon, 280, 60);
    ctxFifth.fillText(playerOneIcon, 160, 60);

    ctxFifth.font = `${playerTwoTextSize}px ${theme}`;
    ctxFifth.fillText(playerTwoIcon, 37, 235);

    instructionSixthCanvas.height = 255;
    instructionSixthCanvas.width = 360;
    const ctxSixth = instructionSixthCanvas.getContext("2d");
    ctxSixth.drawImage(instructionSecondCanvas, 0, 0);
    ctxSixth.fillStyle = themeColors[theme]["secondary"];
    ctxSixth.lineWidth = 7;
    ctxSixth.font = `${playerOneTextSize}px ${theme}`;
    ctxSixth.fillText(playerOneIcon, 160, 145);
    ctxSixth.fillText(playerOneIcon, 280, 235);
    ctxSixth.font = `${playerTwoTextSize}px ${theme}`;
    ctxSixth.fillText(playerTwoIcon, 160, 60);
    ctxSixth.fillText(playerTwoIcon, 37, 145);

    instructionSeventhCanvas.height = 255;
    instructionSeventhCanvas.width = 360;
    const ctxSeventh = instructionSeventhCanvas.getContext("2d");
    ctxSeventh.drawImage(instructionThirdCanvas, 0, 0);
    ctxSeventh.fillStyle = themeColors[theme]["secondary"];
    ctxSeventh.lineWidth = 7;
    ctxSeventh.font = `${playerOneTextSize}px ${theme}`;
    ctxSeventh.fillText(playerOneIcon, 280, 60);
    ctxSeventh.fillText(playerOneIcon, 160, 60);
    ctxSeventh.fillText(playerOneIcon, 37, 235);
    ctxSeventh.fillText(playerOneIcon, 280, 145);
    ctxSeventh.font = `${playerTwoTextSize}px ${theme}`;
    ctxSeventh.fillText(playerTwoIcon, 37, 145);
    ctxSeventh.fillText(playerTwoIcon, 280, 235);
    ctxSeventh.fillText(playerTwoIcon, 160, 235);
}

function undoMove() {
    if(gameData.moves.length == 0) {
        mainMenuButton.click();
        return;
    }

    if(gameData.settingsData["AI"] && currentPlayer == PLAYERTWO) {
        return;
    }

    if(gameData.gameResult != NOTFINISHED) {
        currentTurnHTML.style.display = "block";
        if(gameData.gameResult == PLAYERONE) {
            gameData.playerOneScore--;
            playerOneScoreHTML.innerHTML = gameData.playerOneScore;
        } else {
            gameData.playerTwoScore--;
            playerTwoScoreHTML.innerHTML = gameData.playerTwoScore;
        }

        whoWonHTML.style.display = mainMenuButton.style.display = settingsPostGameButton.style.display =
        playAgainButton.style.display = shareGameBoard.style.display = itsATieHTML.style.display = "none";
        gameData.gameResult = NOTFINISHED;
    }

    if(!gameData.settingsData["AI"] || gameData.gameResult != NOTFINISHED) {
        let move = gameData.moves.pop();
        gameData.undoneMoves.push(move);
        redoMove.style.display = "block";

        if(move.player == PLAYERONE) {
            gameData.playerOneSelectedIds.pop();
            gameData.playerOneSelected.pop();
            currentPlayerHTML.innerHTML = gameData.settingsData["playerTwoIcon"];
            gameData.currentPlayer = PLAYERONE;
        } else {
            gameData.playerTwoSelectedIds.pop();
            gameData.playerTwoSelected.pop();
            currentPlayerHTML.innerHTML = gameData.settingsData["playerTwoIcon"];
            gameData.currentPlayer = PLAYERTWO;
        }

        gameboard[move.boardSquare].isSelected = false;
        gameboard[move.boardSquare].idElement.innerHTML = "";
        gameboard[move.boardSquare].idElement.classList.add("unclicked");
        redrawFavicon();

        if(gameData.moves.length == 0) {
            contextUndoButton.style.display = "none";
        }
        return;
    }

    gameData.playerOneSelectedIds.pop();
    gameData.playerOneSelected.pop();
    gameData.playerTwoSelectedIds.pop();
    gameData.playerTwoSelected.pop();

    for(let i = 0; i < 2; i++) {
        let move = gameData.moves.pop();
        gameData.undoneMoves.push(move);
        gameboard[move.boardSquare].isSelected = false;
        gameboard[move.boardSquare].idElement.innerHTML = "";
        gameboard[move.boardSquare].idElement.classList.add("unclicked");
    }

    contextRedoButton.style.display = "block";
    currentPlayerHTML.innerHTML = gameData.settingsData["playerOneIcon"];
    gameData.currentPlayer = PLAYERONE;
    redrawFavicon();

    if(gameData.moves.length == 0) {
        contextUndoButton.style.display = "none";
    }
}

function redoMove() {
    if(gameData.undoneMoves.length == 0) {
        return;
    }
    const move1 = gameData.undoneMoves.shift();

    if(gameData.settingsData["AI"]) {
        const move2 = gameData.undoneMoves.shift();

        squareClick(gameboard[move2.boardSquare], false, true);
    }

    squareClick(gameboard[move1.boardSquare], false, true);

    if(gameData.undoneMoves.length == 0) {
        contextRedoButton.style.display = "none";
    }

    if(gameData.settingsData["AI"]) {
        gameData.currentPlayer = PLAYERONE;

    }
}

// Width of page
function getWidth() {
return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
);
}

// Height of page
function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
    }

function openMainMenu() {
    gameData.gameResult = MAINMENU;
    gameData.currentMenu = MAINMENU;
    instructionsMenu.style.display = instructionsTitle.style.display =
    startMenuWrapper.style.display = "none";
    mainMenu.style.display = wrapper.style.display = "grid";
    gameData.currentMenu = MAINMENU;
    redrawFavicon();
    focusOn(startButton);
}

function clearGameInformation() {
    gameData.moves = [];
    gameData.undoneMoves = [];
    gameData.playerOneSelectedIds = [];
    gameData.playerOneSelected = [];
    gameData.playerTwoSelected = [];
    gameData.playerTwoSelectedIds = [];

    contextUndoButton.style.display = "none";
    contextRedoButton.style.display = "none";
}

function updateContextVolumeButtons() {
    if(gameData.settingsData["volume"] == 0) {
        contextUnmuteButton.style.display = "block";
        contextMuteButton.style.display = "none";
    } else {
        contextMuteButton.style.display = "block";
        contextUnmuteButton.style.display = "none";
    }
}

function updateFullscreenButtons() {
    if(gameData.settingsData["fullscreen"]) {
        contextWindowedButton.style.display = "block";
        contextFullscreenButton.style.display = "none";
    } else {
        contextFullscreenButton.style.display = "block";
        contextWindowedButton.style.display = "none";

    }
}

function toggleMute() {
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
}

function updateAIDifficulty() {
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

function handleReturn() {
    switch(gameData.currentMenu) {
        case NOTFINISHED:
                popupBackground.click();
                mainMenuButton.click();
            break;
            case INSTRUCTIONSMENU:
                instructionsBackButton.click();
            break;
            case SETTINGSMENU:
                settingsBackButton.click();
            break;
            case CHANGELOG:
                changelogBackButton.click();
            break;
    }

    if(gameData.currentMenu == MAINMENU) {
        contextReturnButton.style.display = "none";
    }
}