//Refer to squares on the board
const TOPLEFT = 0;
const TOPMIDDLE = 1;
const TOPRIGHT = 2;
const MIDDLELEFT = 3;
const CENTER = 4;
const MIDDLERIGHT = 5;
const BOTTOMLEFT = 6;
const BOTTOMMIDDLE = 7;
const BOTTOMRIGHT = 8;

//Refer to the current menu as well as the current status of the game
const MULTIPLAYERMENU = -7;
const CHANGELOG = -6;
const SETTINGSMENU = -5;
const INSTRUCTIONSMENU = -4;
const GAMEMENU = -3;
const MAINMENU = -2
const NOTFINISHED = -1;
const PLAYERONE = 0;
const PLAYERTWO = 1;
const DRAW = 2;

//Refer to the AI's difficulty
const EASY = 0;
const NORMAL = 1;
const HARD = 2;
const IMPOSSIBLE = 3;

//Refer to the cardinal directions
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

//Refer to indexes of themes
const MONO = 0;
const GAMEBOY = 1;
const VAMPIRE = 2;
const SNES = 3;
const HALLOWEEN = 4;
const UMICH = 5;
const BUBBLEGUM = 6;

const maxWidth = window.matchMedia("(max-width: 500px)");

const FAVICONCANVASSIZE = 16;
const FAVICONSQUARESIZE = FAVICONCANVASSIZE / 3;
const FAVICONLINEWIDTH = 1;
const FAVICONLETTERWIDTH = 1;