//Stores all the information related to the game's data
let gameData = {
    currentPlayer: PLAYERONE,
    playerOneScore: 0,
    playerTwoScore: 0,
    playerOneSelected: [],
    playerOneSelectedIds: [],
    playerTwoSelected: [],
    playerTwoSelectedIds: [],
    moves: [],
    undoneMoves: [],
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
    keyPress: false,
    playerOneGamepadIndex: null,
    playerTwoGamepadIndex: null,
    playingMultiplayer: false,
    multiplayerPassword: "",
    multiplayerPlayerNum: null
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

let themeColors = {
    "mono": {
        main: "#000000",
        secondary: "#ffffff",
        highlight: "#d3d3d3"
    },
    "gameboy": {
        main: "#0f380f",
        secondary: "#8bac0f",
        highlight: "#9bbc0f"
    },
    "vampire": {
        main: "#180704",
        secondary: "#ff380d",
        highlight: "#ffffff"
    },
    "snes": {
        main: "#cec9cc",
        secondary: "#4f43ae",
        highlight: "#211a21"
    },
    "halloween": {
        main: "#1c1c1c",
        secondary: "#f4831b",
        highlight: "#902ebb"
    },
    "umich": {
        main: "#00274C",
        secondary: "#FFFFFF",
        highlight: "#FFCB05"
    },
    "bubblegum": {
        main: "#ff6f77",
        secondary: "#c00000",
        highlight: "#ffdee3"
    }
};

let socket = null;