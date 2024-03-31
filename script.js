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
            let newFile = this.numberToFile(i);
            tileTown.pieces.white.pawns[newFile] = new tileTown.Piece("assets/pawn-w.svg", `${newFile}2`, `whitePawn${newFile.toUpperCase()}`, "white pawn piece");
            tileTown.pieces.black.pawns[newFile] = new tileTown.Piece("assets/pawn-b.svg", `${newFile}7`, `blackPawn${newFile.toUpperCase()}`, "black pawn piece");
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
        tileTown.pieces.white.king = new tileTown.Piece("assets/king-w.svg", `e1`, `whiteKing`, "white king piece");
        tileTown.pieces.black.queens["1"] = new tileTown.Piece("assets/queen-b.svg", `d8`, `blackQueen1`, "black queen piece");
        tileTown.pieces.black.queens.count = 1;
        tileTown.pieces.black.king = new tileTown.Piece("assets/king-b.svg", `e8`, `blackKing`, "black king piece");

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
            }
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
            }
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
                }
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
                }
            }
        }

        let allPieces = document.getElementsByClassName("piece");
        console.log(allPieces);

        for (let i = allPieces.length - 1; i > -1; i--) {
            allPieces[i].remove();
        }
    },
    parseFen: function (fen) {
        tileTown.removeAllPieces();
        let file = "a";
        let rank = "8";
        for (let i = 0; i < fen.length; i++) {
            switch (fen[i]) {
                case "r":
                    tileTown.pieces.black.rooks.count += 1;
                    tileTown.pieces.black.rooks[(tileTown.pieces.black.rooks.count).toString()] = new tileTown.Piece("assets/rook-b.svg", `${file}${rank}`, `blackRook${(tileTown.pieces.black.rooks.count).toString()}`, "black rook piece");
                    break;
                default:
                    break;
            }
        }
    }
}

tileTown.updateSizing();
tileTown.createBoard();
tileTown.addAllPieces();

tileTown.parseFen("r7/8/8/8/8/8/8/8 w - - 0 1");

document.documentElement.onresize = function (event) {
    tileTown.updateSizing();
}