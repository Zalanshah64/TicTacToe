//Get the cookies, and parse through them
const cookies = document.cookie.split(';');

for(let i = 0; i < cookies.length; ++i) {
    if(cookies[i][0] == " ") {
        cookies[i] = cookies[i].substring(1);
    }
    gameData.settingsData[cookies[i].split("=")[0]] = cookies[i].split("=")[1];
}


//For each type of cookie, check if it exists.
//If it doesn't, generate it. If it does, get its value from the cookie
if(gameData.settingsData["volume"]) {
    volumeSlider.value = gameData.settingsData["volume"] * 100;
} else {
    document.cookie = document.cookie = "volume=0.50;";
    gameData.settingsData["volume"] = 0.50;
}

if(gameData.settingsData["suggestions"]) {
    gameData.settingsData["suggestions"] = gameData.settingsData["suggestions"] === "true";
} else {
    document.cookie = "suggestions=true;";
    gameData.settingsData["suggestions"] = true;
}

if(gameData.settingsData["switchTurns"]) {
    gameData.settingsData["switchTurns"] = gameData.settingsData["switchTurns"] === "true";
} else {
    document.cookie = "switchTurns=false;"
    gameData.settingsData["switchTurns"] = false;
}

if(gameData.settingsData["AI"]) {
    gameData.settingsData["AI"] = gameData.settingsData["AI"] === "true";
} else {
    document.cookie = "AI=true;";
    gameData.settingsData["AI"] = true;
}

if(gameData.settingsData["AIDifficulty"]) {
    gameData.settingsData["AIDifficulty"] = parseInt(gameData.settingsData["AIDifficulty"]);
    switch(gameData.settingsData["AIDifficulty"]) {
        case EASY:
            gameData.AIDifficultyChance = 0.6;
        break;

        case NORMAL:
            gameData.AIDifficultyChance = 0.8;
        break;

        case HARD:
            gameData.AIDifficultyChance = 0.9;
        break;

        case IMPOSSIBLE:
            gameData.AIDifficultyChance = 1;
        break;
    }
} else {
    document.cookie = "AIDifficulty=1;";
    gameData.settingsData["AIDifficulty"] = NORMAL;
    gameData.AIDifficultyChance = 0.8;
}

if(gameData.settingsData["fullscreen"]) {
    gameData.settingsData["fullscreen"] = gameData.settingsData["fullscreen"] === "true";
} else {
    document.cookie = "fullscreen=false;";
    gameData.settingsData["fullscreen"] = false;
}

if(gameData.settingsData["playerOneIconSlideIndex"]
&& gameData.settingsData["playerTwoIconSlideIndex"]) {
    gameData.settingsData["playerOneIconSlideIndex"] = parseInt(gameData.settingsData["playerOneIconSlideIndex"]);
    gameData.settingsData["playerTwoIconSlideIndex"] = parseInt(gameData.settingsData["playerTwoIconSlideIndex"]);
} else {
    document.cookie = "playerOneIconSlideIndex=0;";
    document.cookie = "playerTwoIconSlideIndex=1;";
    gameData.settingsData["playerOneIcon"] = "X";
    gameData.settingsData["playerTwoIcon"] = "O";
    gameData.settingsData["playerOneIconSlideIndex"] = PLAYERONE;
    gameData.settingsData["playerTwoIconSlideIndex"] = PLAYERTWO;
}

if(gameData.settingsData["theme"]) {
    gameData.settingsData["theme"] = parseInt(gameData.settingsData["theme"]);
} else {
    document.cookie = "theme=0;";
    gameData.settingsData["theme"] = MONO;
}

//Update all visual information to reflect the settings
suggestionsToggle.checked = gameData.settingsData["suggestions"];
switchTurnsToggle.checked = gameData.settingsData["switchTurns"];
AIToggle.checked = gameData.settingsData["AI"];
fullscreenToggle.checked = gameData.settingsData["fullscreen"];
updateVolume();
showAIDifficultySelectionOption(gameData.settingsData["AIDifficulty"]);
showPlayerOneSelectionOption(gameData.settingsData["playerOneIconSlideIndex"]);
showPlayerTwoSelectionOption(gameData.settingsData["playerTwoIconSlideIndex"]);
updateTheme(gameData.settingsData["theme"]);

//Generate the new expiry date for the cookies
const dateCookiesExpire = new Date();
dateCookiesExpire.setDate(dateCookiesExpire.getDate() + 2);
document.cookie = "expires=" + dateCookiesExpire.toUTCString() + ";";