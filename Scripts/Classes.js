//A class that refers to a square on the board
class gamePiece {
    constructor(idElement, pieceNumber) {
        this.idElement = idElement;
        this.pieceNumber = pieceNumber;
        this.isSelected = false;
    }
}

class Move {
    constructor(player, boardSquare) {
        this.player = player;
        this.boardSquare = boardSquare;
    }
}