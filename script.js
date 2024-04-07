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
            tileTown.board.size = +idTree.chessBoard.getAttribute("width");
        } else {
            idTree.chessBoard.setAttribute("width", fullHeight);
            idTree.chessBoard.setAttribute("height", fullHeight);
            tileTown.board.size = +idTree.chessBoard.getAttribute("height");
        }

        tileTown.board.squareWidth = +tileTown.board.size / 8;
        tileTown.board.pieceWidth = +tileTown.board.squareWidth;
        tileTown.board.piecePadding = 0;
    },
    addAllPieces: function () {
        for (let i = 0; i < 8; i++) {
            let newFile = tileTown.numberToFile(i);
            tileTown.pieces.white.pawns[i + 1] = new tileTown.Piece("assets/pawn-w.svg", `${newFile}2`, `whitePawn${i + 1}`, "white pawn piece");
            tileTown.pieces.black.pawns[i + 1] = new tileTown.Piece("assets/pawn-b.svg", `${newFile}7`, `blackPawn${i + 1}`, "black pawn piece");
        }

        tileTown.pieces.white.rooks["1"] = new tileTown.Piece("assets/rook-w.svg", `a1`, `whiteRook1`, "white rook piece");
        tileTown.pieces.white.rooks["2"] = new tileTown.Piece("assets/rook-w.svg", `h1`, `whiteRook2`, "white rook piece");
        tileTown.pieces.white.rooks.count = 2;
        tileTown.pieces.black.rooks["1"] = new tileTown.Piece("assets/rook-b.svg", `a8`, `blackRook1`, "black rook piece");
        tileTown.pieces.black.rooks["2"] = new tileTown.Piece("assets/rook-b.svg", `h8`, `blackRook2`, "black rook piece");
        tileTown.pieces.black.rooks.count = 2;
        tileTown.pieces.white.knights["1"] = new tileTown.Piece("assets/knight-w.svg", `b1`, `whiteKnight1`, "white knight piece");
        tileTown.pieces.white.knights["2"] = new tileTown.Piece("assets/knight-w.svg", `g1`, `whiteKnight2`, "white knight piece");
        tileTown.pieces.white.knights.count = 2;
        tileTown.pieces.black.knights["1"] = new tileTown.Piece("assets/knight-b.svg", `b8`, `blackKnight1`, "black knight piece");
        tileTown.pieces.black.knights["2"] = new tileTown.Piece("assets/knight-b.svg", `g8`, `blackKnight2`, "black knight piece");
        tileTown.pieces.black.knights.count = 2;
        tileTown.pieces.white.bishops["1"] = new tileTown.Piece("assets/bishop-w.svg", `c1`, `whiteBishop1`, "white bishop piece");
        tileTown.pieces.white.bishops["2"] = new tileTown.Piece("assets/bishop-w.svg", `f1`, `whiteBishop2`, "white bishop piece");
        tileTown.pieces.white.bishops.count = 2;
        tileTown.pieces.black.bishops["1"] = new tileTown.Piece("assets/bishop-b.svg", `c8`, `blackBishop1`, "black bishop piece");
        tileTown.pieces.black.bishops["2"] = new tileTown.Piece("assets/bishop-b.svg", `f8`, `blackBishop2`, "black bishop piece");
        tileTown.pieces.black.bishops.count = 2;
        tileTown.pieces.white.queens["1"] = new tileTown.Piece("assets/queen-w.svg", `d1`, `whiteQueen1`, "white queen piece");
        tileTown.pieces.white.queens.count = 1;
        tileTown.pieces.white.kings["1"] = new tileTown.Piece("assets/king-w.svg", `e1`, `whiteKing`, "white king piece");
        tileTown.pieces.white.kings.count = 1;
        tileTown.pieces.black.queens["1"] = new tileTown.Piece("assets/queen-b.svg", `d8`, `blackQueen1`, "black queen piece");
        tileTown.pieces.black.queens.count = 1;
        tileTown.pieces.black.kings["1"] = new tileTown.Piece("assets/king-b.svg", `e8`, `blackKing`, "black king piece");
        tileTown.pieces.black.kings.count = 1;

        setupTree();
    },
    createBoard: function () {
        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                let newFile = tileTown.numberToFile(i);
                if ((j + i) % 2 === 1) {
                    idTree.chessBoard.innerHTML += `<rect id="${newFile}${Math.abs(j - 8)}" width="${tileTown.board.squareWidth}" height="${tileTown.board.squareWidth}" fill="${tileTown.board.darkSquareColor}" x="${i * tileTown.board.squareWidth}" y="${j * tileTown.board.squareWidth}"></rect>`;
                } else {
                    idTree.chessBoard.innerHTML += `<rect id="${newFile}${Math.abs(j - 8)}" width="${tileTown.board.squareWidth}" height="${tileTown.board.squareWidth}" fill="${tileTown.board.lightSquareColor}" x="${i * tileTown.board.squareWidth}" y="${j * tileTown.board.squareWidth}"></rect>`;
                }
            }
        }

        setupTree();
    },
    pieces: {
        whiteToMove: true,
        white: {
            pawns: {
                count: 0
            },
            knights: {
                count: 0
            },
            bishops: {
                count: 0
            },
            queens: {
                count: 0
            },
            rooks: {
                count: 0
            },
            kings: {
                count: 0
            },
            castleQueenside: false,
            castleKingside: false
        },
        black: {
            pawns: {
                count: 0
            },
            knights: {
                count: 0
            },
            bishops: {
                count: 0
            },
            queens: {
                count: 0
            },
            rooks: {
                count: 0
            },
            kings: {
                count: 0
            },
            castleQueenside: false,
            castleKingside: false
        }
    },
    removePiece: function (piece, pieceId) {
        delete tileTown.pieces[piece];
        id(pieceId).remove();
    },
    removeAllPieces: function () {
        tileTown.pieces = {
            white: {
                pawns: {
                    count: 0
                },
                knights: {
                    count: 0
                },
                bishops: {
                    count: 0
                },
                queens: {
                    count: 0
                },
                rooks: {
                    count: 0
                },
                kings: {
                    count: 0
                },
                castleQueenside: false,
                castleKingside: false
            },
            black: {
                pawns: {
                    count: 0
                },
                knights: {
                    count: 0
                },
                bishops: {
                    count: 0
                },
                queens: {
                    count: 0
                },
                rooks: {
                    count: 0
                },
                kings: {
                    count: 0
                },
                castleQueenside: false,
                castleKingside: false
            }
        }

        let allPieces = document.getElementsByClassName("piece");

        for (let i = allPieces.length - 1; i > -1; i--) {
            allPieces[i].remove();
        }
    },
    parseFen: function (fen) {
        tileTown.removeAllPieces();
        let fileNumber = 0;
        let rank = 8;
        let pastPosition = false;
        let positionFen = fen.slice(0, fen.indexOf(" "));
        let settingsFen = fen.slice(fen.indexOf(" ") + 1);
        for (let i = 0; i < positionFen.length; i++) {
            let fileName = tileTown.numberToFile(fileNumber);
            switch (positionFen[i]) {
                case "r":
                    tileTown.pieces.black.rooks.count += 1;
                    tileTown.pieces.black.rooks[(tileTown.pieces.black.rooks.count).toString()] = new tileTown.Piece("assets/rook-b.svg", `${fileName}${rank}`, `blackRook${(tileTown.pieces.black.rooks.count).toString()}`, "black rook piece");
                    break;
                case "n":
                    tileTown.pieces.black.knights.count += 1;
                    tileTown.pieces.black.knights[(tileTown.pieces.black.knights.count).toString()] = new tileTown.Piece("assets/knight-b.svg", `${fileName}${rank}`, `blackKnight${(tileTown.pieces.black.knights.count).toString()}`, "black knight piece");
                    break;
                case "b":
                    tileTown.pieces.black.bishops.count += 1;
                    tileTown.pieces.black.bishops[(tileTown.pieces.black.bishops.count).toString()] = new tileTown.Piece("assets/bishop-b.svg", `${fileName}${rank}`, `blackBishop${(tileTown.pieces.black.bishops.count).toString()}`, "black bishop piece");
                    break;
                case "q":
                    tileTown.pieces.black.queens.count += 1;
                    tileTown.pieces.black.queens[(tileTown.pieces.black.queens.count).toString()] = new tileTown.Piece("assets/queen-b.svg", `${fileName}${rank}`, `blackQueen${(tileTown.pieces.black.queens.count).toString()}`, "black queen piece");
                    break;
                case "k":
                    tileTown.pieces.black.kings.count += 1;
                    tileTown.pieces.black.kings[(tileTown.pieces.black.kings.count).toString()] = new tileTown.Piece("assets/king-b.svg", `${fileName}${rank}`, `blackKing${(tileTown.pieces.black.kings.count).toString()}`, "black king piece");
                    break;
                case "p":
                    tileTown.pieces.black.pawns.count += 1;
                    tileTown.pieces.black.pawns[(tileTown.pieces.black.pawns.count).toString()] = new tileTown.Piece("assets/pawn-b.svg", `${fileName}${rank}`, `blackPawn${(tileTown.pieces.black.pawns.count).toString()}`, "black pawn piece");
                    break;
                case "R":
                    tileTown.pieces.white.rooks.count += 1;
                    tileTown.pieces.white.rooks[(tileTown.pieces.white.rooks.count).toString()] = new tileTown.Piece("assets/rook-b.svg", `${fileName}${rank}`, `whiteRook${(tileTown.pieces.white.rooks.count).toString()}`, "white rook piece");
                    break;
                case "N":
                    tileTown.pieces.white.knights.count += 1;
                    tileTown.pieces.white.knights[(tileTown.pieces.white.knights.count).toString()] = new tileTown.Piece("assets/knight-b.svg", `${fileName}${rank}`, `whiteKnight${(tileTown.pieces.white.knights.count).toString()}`, "white knight piece");
                    break;
                case "B":
                    tileTown.pieces.white.bishops.count += 1;
                    tileTown.pieces.white.bishops[(tileTown.pieces.white.bishops.count).toString()] = new tileTown.Piece("assets/bishop-b.svg", `${fileName}${rank}`, `whiteBishop${(tileTown.pieces.white.bishops.count).toString()}`, "white bishop piece");
                    break;
                case "Q":
                    tileTown.pieces.white.queens.count += 1;
                    tileTown.pieces.white.queens[(tileTown.pieces.white.queens.count).toString()] = new tileTown.Piece("assets/queen-b.svg", `${fileName}${rank}`, `whiteQueen${(tileTown.pieces.white.queens.count).toString()}`, "white queen piece");
                    break;
                case "K":
                    tileTown.pieces.white.kings.count += 1;
                    tileTown.pieces.white.kings[(tileTown.pieces.white.kings.count).toString()] = new tileTown.Piece("assets/king-b.svg", `${fileName}${rank}`, `whiteKing${(tileTown.pieces.white.kings.count).toString()}`, "white king piece");
                    break;
                case "P":
                    tileTown.pieces.white.pawns.count += 1;
                    tileTown.pieces.white.pawns[(tileTown.pieces.white.pawns.count).toString()] = new tileTown.Piece("assets/pawn-b.svg", `${fileName}${rank}`, `whitePawn${(tileTown.pieces.white.pawns.count).toString()}`, "white pawn piece");
                    break;
                case "/":
                    fileNumber = -1;
                    rank--;
                    break;
                default:
                    if (+positionFen[i] >= 0 && +positionFen[i] <= 8) {
                        fileNumber += +positionFen[i];
                    }
                    break;
            }
            fileNumber++;
            if (fileNumber > 7) {
                fileNumber = 0;
                rank--;
            }
            console.log(positionFen[i]);
            console.log(fileNumber);
            console.log(rank);
        }
        for (let i = 0; i < settingsFen.length; i++) {
            switch (settingsFen[i]) {
                case "w":
                    tileTown.pieces.whiteToMove = true;
                case "b":
                    tileTown.pieces.whiteToMove = false;
                case "Q":
                    tileTown.pieces.white.castleQueenside = true;
                case "K":
                    tileTown.pieces.white.castleKingside = true;
                case "q":
                    tileTown.pieces.black.castleQueenside = true;
                case "k":
                    tileTown.pieces.black.castleKingside = true;
                default:
                    break;
            }
        }
    }
}

tileTown.updateSizing();
tileTown.createBoard();
tileTown.addAllPieces();

tileTown.parseFen("7p/2b3p1/3R1n2/1K1B4/2P1p1K1/1b3N2/1P1Q4/7k w - - 0 1");

document.documentElement.onresize = function (event) {
    tileTown.updateSizing();
}