//Document Elements related to entire webpage
let wrapper = document.getElementById("wrapper");
let root = document.querySelector(":root");
let hoverOverButtons = document.getElementsByClassName("hoverOverSound");
let clickSoundButtons = document.getElementsByClassName("clickSound");
let focusable = document.getElementsByClassName("focusable");


//Document elements related to the header
let currentPlayerHTML = document.getElementById("currentPlayer");
let currentTurnHTML = document.getElementById("currentTurn");
let whoWonHTML = document.getElementById("whoWon");
let playerWinNameHTML = document.getElementById("playerWinName");
let itsATieHTML = document.getElementById("itsATie");


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
let themeSelectionNext = document.getElementById("themeSelectionnext");
let themeSelectionPrev = document.getElementById("themeSelectionprev");
let themeSelections = document.getElementsByClassName("themeselection")
let themeSelection = document.getElementById("themeSelection");

//Document Elements related to instructions menu
let instructionsMenu = document.getElementById("instructionsMenu");
let instructionsTitle = document.getElementById("instructionsTitle");
let instructionsBackButton = document.getElementById("instructionsBackButton");
let changelogButton = document.getElementById("changelogButton");
let instructionFirstCanvas = document.getElementById("instructionFirstCanvas");
let instructionSecondCanvas = document.getElementById("instructionSecondCanvas");
let instructionThirdCanvas = document.getElementById("instructionThirdCanvas");
let instructionFourthCanvas = document.getElementById("instructionFourthCanvas");
let instructionFifthCanvas = document.getElementById("instructionFifthCanvas");
let instructionSixthCanvas = document.getElementById("instructionSixthCanvas");
let instructionSeventhCanvas = document.getElementById("instructionSeventhCanvas");

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
let shareGameBoard = document.getElementById("shareGameBoard");
let downloadImageLink = document.getElementById("downloadImageLink");
let downloadImageCanvas = document.getElementById("downloadImageCanvas");
let playerOneName = document.getElementById("playerOneName");
let playerTwoName = document.getElementById("playerTwoName");


//Document Elements related to the popup menu
let popupWrapper = document.getElementById("popupWrapper");
let popupBackground = document.getElementById("popupBackground");
let shareGameStatus = document.getElementById("shareGameStatus");
let saveImageButton = document.getElementById("saveImageButton");
let mobileShareButton = document.getElementById("mobileShareButton");
let copyToClipBoardButton = document.getElementById("copyToClipBoardButton");
let exitPopupButton = document.getElementById("exitPopupButton");

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

// Dynamic Favicon
let favicon = document.getElementById('favicon')
let faviconCanvas = document.getElementById("faviconCanvas");
let faviconCtx = faviconCanvas.getContext('2d');


