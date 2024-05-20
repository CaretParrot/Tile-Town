setupTree();

let tileTown = {
    board: {
        size: null,
        squareWidth: null,
        pieceWidth: null,
        piecePadding: null,
        selectedPieceId: "",
        lightSquareColor: "White",
        darkSquareColor: "hsl(240, 50%, 50%)"
    },
    Piece: function (href, square, newId, newClass) {
        idTree.chessBoard.innerHTML += `<image class="${newClass}" href="${href}" id="${newId}" onmousedown="clickPieceHandler(document.getElementById('${newId}'))" width="${tileTown.board.pieceWidth}" height="${tileTown.board.pieceWidth}"/>`;
        tileTown.movePiece(id(newId), square);
        this.coordinate = square;
    },
    movePiece: function (object, square) {
        object.setAttribute("x", +idTree[square].getAttribute("x") + tileTown.board.piecePadding);
        object.setAttribute("y", +idTree[square].getAttribute("y") + tileTown.board.piecePadding);
        object.setAttribute("id", `${object.id.slice(0, -2)}${square}`);
        object.setAttribute("onmousedown", `clickPieceHandler(document.getElementById('${object.id.slice(0, -2)}${square}'))`);
        setupTree();
    },
    numberToFile: function (number) {
        switch (number) {
            case 0:
                return "a";
                break;
            case 1:
                return "b";
                break;
            case 2:
                return "c";
                break;
            case 3:
                return "d";
                break;
            case 4:
                return "e";
                break;
            case 5:
                return "f";
                break;
            case 6:
                return "g";
                break;
            case 7:
                return "h";
                break;
            default:
                break;
        }
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
            tileTown.pieces.white.pawns[i + 1] = new tileTown.Piece("assets/pawn-w.svg", `${newFile}2`, `whitePawn${newFile.toUpperCase()}-${newFile}2`, "white pawn piece");
            tileTown.pieces.black.pawns[i + 1] = new tileTown.Piece("assets/pawn-b.svg", `${newFile}7`, `blackPawn${newFile.toUpperCase()}-${newFile}7`, "black pawn piece");
        }

        tileTown.pieces.white.rooks["1"] = new tileTown.Piece("assets/rook-w.svg", `a1`, `whiteRook1-a1`, "white rook piece");
        tileTown.pieces.white.rooks["2"] = new tileTown.Piece("assets/rook-w.svg", `h1`, `whiteRook2-h1`, "white rook piece");
        tileTown.pieces.white.rooks.count = 2;
        tileTown.pieces.black.rooks["1"] = new tileTown.Piece("assets/rook-b.svg", `a8`, `blackRook1-a8`, "black rook piece");
        tileTown.pieces.black.rooks["2"] = new tileTown.Piece("assets/rook-b.svg", `h8`, `blackRook2-h8`, "black rook piece");
        tileTown.pieces.black.rooks.count = 2;
        tileTown.pieces.white.knights["1"] = new tileTown.Piece("assets/knight-w.svg", `b1`, `whiteKnight1-b1`, "white knight piece");
        tileTown.pieces.white.knights["2"] = new tileTown.Piece("assets/knight-w.svg", `g1`, `whiteKnight2-g1`, "white knight piece");
        tileTown.pieces.white.knights.count = 2;
        tileTown.pieces.black.knights["1"] = new tileTown.Piece("assets/knight-b.svg", `b8`, `blackKnight1-b8`, "black knight piece");
        tileTown.pieces.black.knights["2"] = new tileTown.Piece("assets/knight-b.svg", `g8`, `blackKnight2-g8`, "black knight piece");
        tileTown.pieces.black.knights.count = 2;
        tileTown.pieces.white.bishops["1"] = new tileTown.Piece("assets/bishop-w.svg", `c1`, `whiteBishop1-c1`, "white bishop piece");
        tileTown.pieces.white.bishops["2"] = new tileTown.Piece("assets/bishop-w.svg", `f1`, `whiteBishop2-f1`, "white bishop piece");
        tileTown.pieces.white.bishops.count = 2;
        tileTown.pieces.black.bishops["1"] = new tileTown.Piece("assets/bishop-b.svg", `c8`, `blackBishop1-c8`, "black bishop piece");
        tileTown.pieces.black.bishops["2"] = new tileTown.Piece("assets/bishop-b.svg", `f8`, `blackBishop2-f8`, "black bishop piece");
        tileTown.pieces.black.bishops.count = 2;
        tileTown.pieces.white.queens["1"] = new tileTown.Piece("assets/queen-w.svg", `d1`, `whiteQueen1-d1`, "white queen piece");
        tileTown.pieces.white.queens.count = 1;
        tileTown.pieces.white.kings["1"] = new tileTown.Piece("assets/king-w.svg", `e1`, `whiteKing1-e1`, "white king piece");
        tileTown.pieces.white.kings.count = 1;
        tileTown.pieces.black.queens["1"] = new tileTown.Piece("assets/queen-b.svg", `d8`, `blackQueen1-d8`, "black queen piece");
        tileTown.pieces.black.queens.count = 1;
        tileTown.pieces.black.kings["1"] = new tileTown.Piece("assets/king-b.svg", `e8`, `blackKing1-e8`, "black king piece");
        tileTown.pieces.black.kings.count = 1;

        setupTree();
    },
    createBoard: function () {
        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                let newFile = tileTown.numberToFile(i);
                if ((j + i) % 2 === 1) {
                    idTree.chessBoard.innerHTML += `<rect id="${newFile}${Math.abs(j - 8)}" onmousedown="clickTileHandler(document.getElementById('${newFile}${Math.abs(j - 8)}'))" class="tile" width="${tileTown.board.squareWidth}" height="${tileTown.board.squareWidth}" fill="${tileTown.board.darkSquareColor}" x="${i * tileTown.board.squareWidth}" y="${j * tileTown.board.squareWidth}"></rect>`;
                } else {
                    idTree.chessBoard.innerHTML += `<rect id="${newFile}${Math.abs(j - 8)}" onmousedown="clickTileHandler(document.getElementById('${newFile}${Math.abs(j - 8)}'))" class="tile" width="${tileTown.board.squareWidth}" height="${tileTown.board.squareWidth}" fill="${tileTown.board.lightSquareColor}" x="${i * tileTown.board.squareWidth}" y="${j * tileTown.board.squareWidth}"></rect>`;
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
        let positionFen = fen.slice(0, fen.indexOf(" "));
        let settingsFen = fen.slice(fen.indexOf(" ") + 1);
        for (let i = 0; i < positionFen.length; i++) {
            let fileName = tileTown.numberToFile(fileNumber);
            if (rank < 1) {
                break;
            }
            switch (positionFen[i]) {
                case "r":
                    tileTown.pieces.black.rooks.count += 1;
                    tileTown.pieces.black.rooks[(tileTown.pieces.black.rooks.count).toString()] = new tileTown.Piece("assets/rook-b.svg", `${fileName}${rank}`, `blackRook${(tileTown.pieces.black.rooks.count).toString()}-${fileName}${rank}`, "black rook piece");
                    break;
                case "n":
                    tileTown.pieces.black.knights.count += 1;
                    tileTown.pieces.black.knights[(tileTown.pieces.black.knights.count).toString()] = new tileTown.Piece("assets/knight-b.svg", `${fileName}${rank}`, `blackKnight${(tileTown.pieces.black.knights.count).toString()}-${fileName}${rank}`, "black knight piece");
                    break;
                case "b":
                    tileTown.pieces.black.bishops.count += 1;
                    tileTown.pieces.black.bishops[(tileTown.pieces.black.bishops.count).toString()] = new tileTown.Piece("assets/bishop-b.svg", `${fileName}${rank}`, `blackBishop${(tileTown.pieces.black.bishops.count).toString()}-${fileName}${rank}`, "black bishop piece");
                    break;
                case "q":
                    tileTown.pieces.black.queens.count += 1;
                    tileTown.pieces.black.queens[(tileTown.pieces.black.queens.count).toString()] = new tileTown.Piece("assets/queen-b.svg", `${fileName}${rank}`, `blackQueen${(tileTown.pieces.black.queens.count).toString()}-${fileName}${rank}`, "black queen piece");
                    break;
                case "k":
                    tileTown.pieces.black.kings.count += 1;
                    tileTown.pieces.black.kings[(tileTown.pieces.black.kings.count).toString()] = new tileTown.Piece("assets/king-b.svg", `${fileName}${rank}`, `blackKing${(tileTown.pieces.black.kings.count).toString()}-${fileName}${rank}`, "black king piece");
                    break;
                case "p":
                    tileTown.pieces.black.pawns.count += 1;
                    tileTown.pieces.black.pawns[(tileTown.pieces.black.pawns.count).toString()] = new tileTown.Piece("assets/pawn-b.svg", `${fileName}${rank}`, `blackPawn${(tileTown.pieces.black.pawns.count).toString()}-${fileName}${rank}`, "black pawn piece");
                    break;
                case "R":
                    tileTown.pieces.white.rooks.count += 1;
                    tileTown.pieces.white.rooks[(tileTown.pieces.white.rooks.count).toString()] = new tileTown.Piece("assets/rook-w.svg", `${fileName}${rank}`, `whiteRook${(tileTown.pieces.white.rooks.count).toString()}-${fileName}${rank}`, "white rook piece");
                    break;
                case "N":
                    tileTown.pieces.white.knights.count += 1;
                    tileTown.pieces.white.knights[(tileTown.pieces.white.knights.count).toString()] = new tileTown.Piece("assets/knight-w.svg", `${fileName}${rank}`, `whiteKnight${(tileTown.pieces.white.knights.count).toString()}-${fileName}${rank}`, "white knight piece");
                    break;
                case "B":
                    tileTown.pieces.white.bishops.count += 1;
                    tileTown.pieces.white.bishops[(tileTown.pieces.white.bishops.count).toString()] = new tileTown.Piece("assets/bishop-w.svg", `${fileName}${rank}`, `whiteBishop${(tileTown.pieces.white.bishops.count).toString()}-${fileName}${rank}`, "white bishop piece");
                    break;
                case "Q":
                    tileTown.pieces.white.queens.count += 1;
                    tileTown.pieces.white.queens[(tileTown.pieces.white.queens.count).toString()] = new tileTown.Piece("assets/queen-w.svg", `${fileName}${rank}`, `whiteQueen${(tileTown.pieces.white.queens.count).toString()}-${fileName}${rank}`, "white queen piece");
                    break;
                case "K":
                    tileTown.pieces.white.kings.count += 1;
                    tileTown.pieces.white.kings[(tileTown.pieces.white.kings.count).toString()] = new tileTown.Piece("assets/king-w.svg", `${fileName}${rank}`, `whiteKing${(tileTown.pieces.white.kings.count).toString()}-${fileName}${rank}`, "white king piece");
                    break;
                case "P":
                    tileTown.pieces.white.pawns.count += 1;
                    tileTown.pieces.white.pawns[(tileTown.pieces.white.pawns.count).toString()] = new tileTown.Piece("assets/pawn-w.svg", `${fileName}${rank}`, `whitePawn${(tileTown.pieces.white.pawns.count).toString()}-${fileName}${rank}`, "white pawn piece");
                    break;
                default:
                    if (+positionFen[i] >= 1 && +positionFen[i] <= 7) {
                        fileNumber += +positionFen[i] - 1;
                    } else if (+positionFen[i] === 8) {
                        fileNumber = -2;
                        rank--;
                    }
            }
            if (fileNumber > 7) {
                fileNumber = -1;
                rank--;
            }
            fileNumber++;
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
    },
    movePieceSAN: function (san) {
        let allPieces = document.getElementsByClassName("piece");

        for (let i = 0; i < allPieces.length; i++) {
            if (allPieces[i].id.includes(san.slice(2))) {
                tileTown.removePiece(allPieces[i], allPieces[i].id);
            }
            if (allPieces[i].id.includes(san.slice(0, 2))) {
                tileTown.movePiece(id(allPieces[i].id), san.slice(2));
                break;
            }
        }

        
    }
}

tileTown.updateSizing();
tileTown.createBoard();
tileTown.addAllPieces();

onresize = function (event) {
    tileTown.updateSizing();
}

function clickPieceHandler(object) {
    if (tileTown.board.selectedPieceId === "") {
        tileTown.board.selectedPieceId = object.id;
    } else if (tileTown.board.selectedPieceId === object.id) {
        tileTown.board.selectedPieceId = "";
    } else if (tileTown.board.selectedPieceId !== object.id) {
        tileTown.movePiece(id(tileTown.board.selectedPieceId), object.id.slice(-2));
        tileTown.removePiece(object, object.id);
        tileTown.board.selectedPieceId = "";
    }
}

function clickTileHandler(object) {
    if (tileTown.board.selectedPieceId !== "") {
        tileTown.movePiece(id(tileTown.board.selectedPieceId), object.id);
        tileTown.board.selectedPieceId = "";
    }
}

idTree.fenInput.onkeydown = function (event) {
    if (event.key === "Enter") {
        tileTown.parseFen(idTree.fenInput.value);
    }
}

idTree.movePieceInput.onkeydown = function (event) {
    if (event.key === "Enter") {
        tileTown.movePieceSAN(idTree.movePieceInput.value);
        idTree.movePieceInput.value = "";
    }
}