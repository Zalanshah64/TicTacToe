//Stores all the information related to the game's data
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
    AIwaitTime: 600,
    AIDifficultyChance: 0.8,
    settingsBackFromLocation: MAINMENU,
    fullscreenRequest: false,
    settingsData: {},
    keyPress: false
};

//Stores all settings for loading the start menu
let startMenuData = {
    i: 0,
    title: "Tic-Tac-Toe",
    titleCompleted: false,
    credits: "A game by Zalan Shah",
    creditsCompleted: false,
    subtitle: "[Press Enter]/[tap anywhere] to start",
    subtitleCompleted: false,
    speed: 150,
};

//The gameboard the entire game runs on
let gameboard = [
    new gamePiece(topLeftId, TOPLEFT),
    new gamePiece(topMiddleId, TOPMIDDLE),
    new gamePiece(topRightId, TOPRIGHT),
    new gamePiece(middleLeftId, MIDDLELEFT),
    new gamePiece(centerId, CENTER),
    new gamePiece(middleRightId, MIDDLERIGHT),
    new gamePiece(bottomLeftId, BOTTOMLEFT),
    new gamePiece(bottomMiddleId, BOTTOMMIDDLE),
    new gamePiece(bottomRightId, BOTTOMRIGHT)
];

let themes = [
    "mono",
    "gameboy",
    "vampire",
    "snes",
    "halloween",
    "umich",
    "bubblegum",
];

let themeSecondaryColors = {
    "mono": "#ffffff",
    "gameboy": "#8bac0f",
    "vampire": "#ff380d",
    "snes": "#4f43ae",
    "halloween": "#f4831b",
    "umich": "#FFFFFF",
    "bubblegum": "#c00000"
};