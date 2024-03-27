setupTree();

let tileTown = {
    board: {
        size: null,
        squareWidth: null,
        pieceWidth: null,
        piecePadding: null,
        lightSquareColor: "White",
        darkSquareColor: "hsl(240, 50%, 50%)"
    },
    Piece: function (href, square, newId, newClass) {
        idTree.chessBoard.innerHTML += `<image class="${newClass}" href="${href}" id="${newId}" width="${tileTown.board.pieceWidth}" height="${tileTown.board.pieceWidth}"/>`;
        tileTown.movePiece(id(newId), square);
        this.coordinate = square;
    },
    movePiece: function (object, square) {
        object.setAttribute("x", +idTree[square].getAttribute("x") + tileTown.board.piecePadding);
        object.setAttribute("y", +idTree[square].getAttribute("y") + tileTown.board.piecePadding);
    },
    numberToFile: function (number) {
        let file;
        switch (number) {
            case 0:
                file = "a";
                break;
            case 1:
                file = "b";
                break;
            case 2:
                file = "c";
                break;
            case 3:
                file = "d";
                break;
            case 4:
                file = "e";
                break;
            case 5:
                file = "f";
                break;
            case 6:
                file = "g";
                break;
            case 7:
                file = "h";
                break;
            default:
                break;
        }
        return file;
    },
    updateSizing: function () {
        if (window.innerWidth < window.innerHeight) {
            idTree.chessBoard.setAttribute("width", fullWidth);
            idTree.chessBoard.setAttribute("height", fullWidth);
            this.board.size = +idTree.chessBoard.getAttribute("width");
        } else {
            idTree.chessBoard.setAttribute("width", fullHeight);
            idTree.chessBoard.setAttribute("height", fullHeight);
            this.board.size = +idTree.chessBoard.getAttribute("height");
        }

        this.board.squareWidth = +this.board.size / 8;
        this.board.pieceWidth = +this.board.squareWidth;
        this.board.piecePadding = 0;
    },
    addPieces: function () {
        for (let i = 0; i < 8; i++) {
            let newFile = tileTown.numberToFile(i);
            tileTown.pieces.white.pawns[newFile] = new this.Piece("assets/pawn-w.svg", `${newFile}2`, `whitePawn${newFile.toUpperCase()}`, "white pawn");
            tileTown.pieces.black.pawns[newFile] = new this.Piece("assets/pawn-b.svg", `${newFile}7`, `blackPawn${newFile.toUpperCase()}`, "black pawn");
        }
        
        tileTown.pieces.white.rookQ = new this.Piece("assets/rook-w.svg", `a1`, `whiteRookQ`, "white rook");
        tileTown.pieces.white.rookK = new this.Piece("assets/rook-w.svg", `h1`, `whiteRookK`, "white rook");
        tileTown.pieces.black.rookQ = new this.Piece("assets/rook-b.svg", `a8`, `blackRookQ`, "black rook");
        tileTown.pieces.black.rookK = new this.Piece("assets/rook-b.svg", `h8`, `blackRookK`, "black rook");
        tileTown.pieces.white.knightQ = new this.Piece("assets/knight-w.svg", `b1`, `whiteKnightQ`, "white knight");
        tileTown.pieces.white.knightK = new this.Piece("assets/knight-w.svg", `g1`, `whiteKnightK`, "white knight");
        tileTown.pieces.black.knightQ = new this.Piece("assets/knight-b.svg", `b8`, `blackKnightQ`, "black knight");
        tileTown.pieces.black.knightK = new this.Piece("assets/knight-b.svg", `g8`, `blackKnightK`, "black knight");
        tileTown.pieces.white.bishopQ = new this.Piece("assets/bishop-w.svg", `c1`, `whiteBishopQ`, "white bishop");
        tileTown.pieces.white.bishopK = new this.Piece("assets/bishop-w.svg", `f1`, `whiteBishopK`, "white bishop");
        tileTown.pieces.black.bishopQ = new this.Piece("assets/bishop-b.svg", `c8`, `blackBishopQ`, "black bishop");
        tileTown.pieces.black.bishopK = new this.Piece("assets/bishop-b.svg", `f8`, `blackBishopK`, "black bishop");
        tileTown.pieces.white.queen = new this.Piece("assets/queen-w.svg", `d1`, `whiteQueen`, "white queen");
        tileTown.pieces.white.king = new this.Piece("assets/king-w.svg", `e1`, `whiteKing`, "white king");
        tileTown.pieces.black.queen = new this.Piece("assets/queen-b.svg", `d8`, `blackQueen`, "black queen");
        tileTown.pieces.black.king = new this.Piece("assets/king-b.svg", `e8`, `blackKing`, "black king");
    
        setupTree();
    },
    createBoard: function () {
        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                let newFile = this.numberToFile(i);
                if ((j + i) % 2 === 1) {
                    idTree.chessBoard.innerHTML += `<rect id="${newFile}${Math.abs(j - 8)}" width="${this.board.squareWidth}" height="${this.board.squareWidth}" fill="${this.board.darkSquareColor}" x="${i * this.board.squareWidth}" y="${j * this.board.squareWidth}"></rect>`;
                } else {
                    idTree.chessBoard.innerHTML += `<rect id="${newFile}${Math.abs(j - 8)}" width="${this.board.squareWidth}" height="${this.board.squareWidth}" fill="${this.board.lightSquareColor}" x="${i * this.board.squareWidth}" y="${j * this.board.squareWidth}"></rect>`;
                }
            }
        }
    },
    pieces: {
        white: {
            pawns: {

            }
        },
        black: {
            pawns: {

            }
        }
    }
}

tileTown.updateSizing();

setupTree();

tileTown.createBoard();
tileTown.addPieces();

document.body.onresize = function (event) {
    tileTown.updateSizing();
}