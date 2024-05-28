setupTree();

let tileTown = {
    board: {
        size: document.getElementById("wrapper").offsetWidth,
        squareSize: document.getElementById("wrapper").offsetWidth / 8,
        pieceSize: document.getElementById("wrapper").offsetWidth / 8,
        piecePadding: 0,
        selectedPieceId: "",
        lightSquareColor: "White",
        darkSquareColor: "hsl(240, 50%, 50%)"
    },
    createPiece: function (square, newId, color, pieceType) {
        idTree.chessBoard.innerHTML += `<image data-coordinate="${square}" data-piece="${pieceType}" data-color="${color}" class="${pieceType} ${color} piece" href="./assets/${pieceType}-${color.slice(0, 1)}.svg" id="${newId}" onmousedown="clickPieceHandler(document.getElementById('${newId}'))" width="${tileTown.board.pieceSize}" height="${tileTown.board.pieceSize}"/>`;
        tileTown.movePiece(id(newId), square);
    },
    movePiece: function (object, square) {
        object.setAttribute("x", +idTree[square].getAttribute("x") + tileTown.board.piecePadding);
        object.setAttribute("y", +idTree[square].getAttribute("y") + tileTown.board.piecePadding);
        object.setAttribute("data-coordinate", square);
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
        tileTown.board.size = document.getElementById("wrapper").offsetWidth;
    },
    addAllPieces: function () {
        for (let i = 0; i < 8; i++) {
            let newFile = tileTown.numberToFile(i);
            this.createPiece(`${newFile}2`, `whitePawn${newFile.toUpperCase()}`, "white", "pawn");
            this.createPiece(`${newFile}7`, `blackPawn${newFile.toUpperCase()}`, "black", "pawn");
        }

        this.createPiece(`b1`, `whiteKnight1`, "white", "knight");
        this.createPiece(`g1`, `whiteKnight2`, "white", "knight");
        this.createPiece(`b8`, `blackKnight1`, "black", "knight");
        this.createPiece(`g8`, `blackKnight2`, "black", "knight");

        this.createPiece(`a1`, `whiteRook1`, "white", "rook");
        this.createPiece(`h1`, `whiteRook2`, "white", "rook");
        this.createPiece(`a8`, `blackRook1`, "black", "rook");
        this.createPiece(`h8`, `blackRook2`, "black", "rook");

        this.createPiece(`c1`, `whiteBishop1`, "white", "bishop");
        this.createPiece(`f1`, `whiteBishop2`, "white", "bishop");
        this.createPiece(`c8`, `blackBishop1`, "black", "bishop");
        this.createPiece(`f8`, `blackBishop2`, "black", "bishop");

        this.createPiece(`d1`, `whiteQueen1`, "white", "queen");
        this.createPiece(`e1`, `whiteKing1`, "white", "king");
        this.createPiece(`d8`, `blackQueen1`, "black", "queen");
        this.createPiece(`e8`, `blackKing1`, "black", "king");
        
        setupTree();
    },
    createBoard: function () {
        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                let newFile = tileTown.numberToFile(i);
                if ((j + i) % 2 === 1) {
                    idTree.chessBoard.innerHTML += `<rect id="${newFile}${Math.abs(j - 8)}" onmousedown="clickTileHandler(document.getElementById('${newFile}${Math.abs(j - 8)}'))" class="tile" width="${tileTown.board.squareSize}" height="${tileTown.board.squareSize}" fill="${tileTown.board.darkSquareColor}" x="${i * tileTown.board.squareSize}" y="${j * tileTown.board.squareSize}"></rect>`;
                } else {
                    idTree.chessBoard.innerHTML += `<rect id="${newFile}${Math.abs(j - 8)}" onmousedown="clickTileHandler(document.getElementById('${newFile}${Math.abs(j - 8)}'))" class="tile" width="${tileTown.board.squareSize}" height="${tileTown.board.squareSize}" fill="${tileTown.board.lightSquareColor}" x="${i * tileTown.board.squareSize}" y="${j * tileTown.board.squareSize}"></rect>`;
                }
            }
        }

        setupTree();
    },
    removePiece: function (piece) {
        piece.remove();
    },
    removeAllPieces: function () {
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

                    break;
                case "n":
                    break;
                case "b":
                    break;
                case "q":
                    break;
                case "k":
                    break;
                case "p":
                    break;
                case "R":
                    break;
                case "N":
                    break;
                case "B":
                    break;
                case "Q":
                    break;
                case "K":
                    break;
                case "P":
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
                    break;
                case "b":
                    break;
                case "Q":
                    break;
                case "K":
                    break;
                case "q":
                    break;
                case "k":
                    break;
                default:
                    break;
            }
        }
    },
    movePieceSAN: function (san) {
        let allPieces = document.getElementsByClassName("piece");
        if (san.length === 4) {
            for (let i = 0; i < allPieces.length; i++) {
                if (allPieces[i]["data-coordinate"].includes(san.slice(2))) {
                    tileTown.removePiece(allPieces[i]);
                }
            }
            for (let i = 0; i < allPieces.length; i++) {
                if (allPieces[i]["data-coordinate"].includes(san.slice(0, 2))) {
                    tileTown.movePiece(id(allPieces[i].id), san.slice(2));
                    break;
                }
            }
        } else {
            console.error("Invalid SAN was entered.");
        }
    },
    resetBoard: function () {
        tileTown.removeAllPieces();
        tileTown.updateSizing();
        tileTown.addAllPieces();
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
        tileTown.movePiece(id(tileTown.board.selectedPieceId), object.getAttribute["data-coordinate"]);
        tileTown.removePiece(object);
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

onmouseup = function () {
    tileTown.updateSizing();
}