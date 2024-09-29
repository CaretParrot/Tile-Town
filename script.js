setupTree();

let tileTown = {
    board: {
        size: document.getElementById("wrapper").offsetHeight,
        squareSize: document.getElementById("wrapper").offsetHeight / 8,
        pieceSize: document.getElementById("wrapper").offsetHeight / 8,
        piecePadding: 0,
        selectedPieceId: "",
        pieceToSpawn: "",
        lightSquareColor: "White",
        darkSquareColor: "hsl(240, 50%, 50%)",
        whitesTurn: true,
        whitesSide: true
    },
    createPiece: function (square, color, pieceType) {
        let family = document.getElementsByClassName(`${pieceType} ${color} piece`);
        let newId = `${color}${pieceType[0].toUpperCase()}${pieceType.slice(1)}${family.length + 1}`;
        idTree.chessBoard.innerHTML += `<image data-coordinate="${square}" data-piece="${pieceType}" data-color="${color}" class="${pieceType} ${color} piece" href="./assets/${pieceType}-${color.slice(0, 1)}.svg" id="${newId}" onmousedown="clickPieceHandler(document.getElementById('${newId}'))" width="${tileTown.board.pieceSize}" height="${tileTown.board.pieceSize}" />`;
        tileTown.movePiece(id(newId), square);
    },
    movePiece: function (object, square) {
        object.setAttribute("x", +id(square).getAttribute("x") + tileTown.board.piecePadding);
        object.setAttribute("y", +id(square).getAttribute("y") + tileTown.board.piecePadding);
        object.setAttribute("data-coordinate", square);
        object.style.setProperty("transform-origin", `50% 50%`, "important");
        setupTree();
    },
    numberToFile: function (number) {
        switch (number) {
            case 0:
                return "a";
            case 1:
                return "b";
            case 2:
                return "c";
            case 3:
                return "d";
            case 4:
                return "e";
            case 5:
                return "f";
            case 6:
                return "g";
            case 7:
                return "h";
            default:
                break;
        }
    },
    updateSizing: function () {
        tileTown.board.size = document.getElementById("wrapper").offsetHeight;
        document.getElementById("chessBoard").setAttribute("viewBox", `0, 0, ${tileTown.board.size}, ${tileTown.board.size}`);
    },
    addAllPieces: function () {
        for (let i = 0; i < 8; i++) {
            let newFile = tileTown.numberToFile(i);
            this.createPiece(`${newFile}2`, "white", "pawn");
            this.createPiece(`${newFile}7`, "black", "pawn");
        }

        this.createPiece(`b1`, "white", "knight");
        this.createPiece(`g1`, "white", "knight");
        this.createPiece(`b8`, "black", "knight");
        this.createPiece(`g8`, "black", "knight");

        this.createPiece(`a1`, "white", "rook");
        this.createPiece(`h1`, "white", "rook");
        this.createPiece(`a8`, "black", "rook");
        this.createPiece(`h8`, "black", "rook");

        this.createPiece(`c1`, "white", "bishop");
        this.createPiece(`f1`, "white", "bishop");
        this.createPiece(`c8`, "black", "bishop");
        this.createPiece(`f8`, "black", "bishop");

        this.createPiece(`d1`, "white", "queen");
        this.createPiece(`e1`, "white", "king");
        this.createPiece(`d8`, "black", "queen");
        this.createPiece(`e8`, "black", "king");

        setupTree();
    },
    createBoard: function () {
        for (let j = 0; j < 8; j++) {
            for (let i = 0; i < 8; i++) {
                let newFile = tileTown.numberToFile(i);
                if ((j + i) % 2 === 1) {
                    idTree.chessBoard.innerHTML += `<rect id="${newFile}${Math.abs(j - 8)}" onmousedown="clickTileHandler(document.getElementById('${newFile}${Math.abs(j - 8)}'))" class="tile" width="${tileTown.board.squareSize}" height="${tileTown.board.squareSize}" fill="${tileTown.board.darkSquareColor}" x="${i * tileTown.board.squareSize}" y="${j * tileTown.board.squareSize}" style="transform-origin: 50% 50%;"></rect>`;
                } else {
                    idTree.chessBoard.innerHTML += `<rect id="${newFile}${Math.abs(j - 8)}" onmousedown="clickTileHandler(document.getElementById('${newFile}${Math.abs(j - 8)}'))" class="tile" width="${tileTown.board.squareSize}" height="${tileTown.board.squareSize}" fill="${tileTown.board.lightSquareColor}" x="${i * tileTown.board.squareSize}" y="${j * tileTown.board.squareSize}" style="transform-origin: 50% 50%;"></rect>`;
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
                    tileTown.createPiece(`${fileName}${rank}`, "black", "rook");
                    break;
                case "n":
                    tileTown.createPiece(`${fileName}${rank}`, "black", "knight");
                    break;
                case "b":
                    tileTown.createPiece(`${fileName}${rank}`, "black", "bishop");
                    break;
                case "q":
                    tileTown.createPiece(`${fileName}${rank}`, "black", "queen");
                    break;
                case "k":
                    tileTown.createPiece(`${fileName}${rank}`, "black", "king");
                    break;
                case "p":
                    tileTown.createPiece(`${fileName}${rank}`, "black", "pawn");
                    break;
                case "R":
                    tileTown.createPiece(`${fileName}${rank}`, "white", "rook");
                    break;
                case "N":
                    tileTown.createPiece(`${fileName}${rank}`, "white", "knight");
                    break;
                case "B":
                    tileTown.createPiece(`${fileName}${rank}`, "white", "bishop");
                    break;
                case "Q":
                    tileTown.createPiece(`${fileName}${rank}`, "white", "queen");
                    break;
                case "K":
                    tileTown.createPiece(`${fileName}${rank}`, "white", "king");
                    break;
                case "P":
                    tileTown.createPiece(`${fileName}${rank}`, "white", "pawn");
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
                    tileTown.whitesTurn = true;
                    document.getElementById("turn").style.backgroundColor = "hsl(0, 0%, 90%)";
                    document.getElementById("turn").style.color = "Black";
                    document.getElementById("turn").innerHTML = "White to move...";
                    break;
                case "b":
                    document.getElementById("turn").style.backgroundColor = "hsl(0, 0%, 20%)";
                    document.getElementById("turn").style.color = "White";
                    document.getElementById("turn").innerHTML = "Black to move...";
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
                console.log(allPieces[i].dataset.coordinate);
                if (allPieces[i].dataset.coordinate.includes(san.slice(2))) {
                    tileTown.removePiece(allPieces[i]);
                }
            }
            for (let i = 0; i < allPieces.length; i++) {
                if (allPieces[i].dataset.coordinate.includes(san.slice(0, 2))) {
                    tileTown.movePiece(document.getElementById(allPieces[i].id), san.slice(2));
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
    },
    outputFen: function () {
        let outputFENString = "";
        let coordinateSelector = "";
        let emptySpaces = 0;
        let allPieces = document.getElementsByClassName("piece");
        for (let i = 8; i >= 1; i--) {
            for (let j = 0; j < 8; j++) {
                coordinateSelector = `${tileTown.numberToFile(j)}${i}`;
                for (let k = 0; k < allPieces.length; k++) {
                    if (coordinateSelector === allPieces[k].dataset.coordinate) {
                        switch (allPieces[k].dataset.piece) {
                            case "rook":
                                if (allPieces[k].dataset.color === "white") {
                                    outputFENString += "R";
                                } else {
                                    outputFENString += "r";
                                }
                                break;
                            case "knight":
                                if (allPieces[k].dataset.color === "white") {
                                    outputFENString += "N";
                                } else {
                                    outputFENString += "n";
                                }
                                break;
                            case "bishop":
                                if (allPieces[k].dataset.color === "white") {
                                    outputFENString += "B";
                                } else {
                                    outputFENString += "b";
                                }
                                break;
                            case "queen":
                                if (allPieces[k].dataset.color === "white") {
                                    outputFENString += "Q";
                                } else {
                                    outputFENString += "q";
                                }
                                break;
                            case "king":
                                if (allPieces[k].dataset.color === "white") {
                                    outputFENString += "K";
                                } else {
                                    outputFENString += "k";
                                }
                                break;
                            case "pawn":
                                if (allPieces[k].dataset.color === "white") {
                                    outputFENString += "P";
                                } else {
                                    outputFENString += "p";
                                }
                                break;
                        }
                    } else {
                        emptySpaces++;
                        if (j === 7) {
                            outputFENString += `${emptySpaces}/`;
                            emptySpaces = 0;
                        }
                    }
                }
            }
        }
        return outputFENString;
    },
    flipBoard: function () {
        if (tileTown.board.whitesSide === true) {
            tileTown.board.whitesSide = false;
            let allTiles = document.getElementsByClassName("tile");
            let allPieces = document.getElementsByClassName("piece");
            for (let i = 0; i < allTiles.length; i++) {
                allTiles[i].setAttribute("transform", "rotate(180)");
            }
            for (let i = 0; i < allPieces.length; i++) {
                allPieces[i].setAttribute("transform", "rotate(180)");
            }
        } else {
            tileTown.board.whitesSide = true;
            let allTiles = document.getElementsByClassName("tile");
            let allPieces = document.getElementsByClassName("piece");
            for (let i = 0; i < allTiles.length; i++) {
                allTiles[i].setAttribute("transform", "rotate(0)");
            }
            for (let i = 0; i < allPieces.length; i++) {
                allPieces[i].setAttribute("transform", "rotate(0)");
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
        tileTown.movePiece(id(tileTown.board.selectedPieceId), object.getAttribute("data-coordinate"));
        tileTown.removePiece(object);
        tileTown.board.selectedPieceId = "";
    }
}

function clickTileHandler(object) {
    if (tileTown.pieceToSpawn !== "") {
        tileTown.createPiece(object.id, tileTown.pieceToSpawn[0], tileTown.pieceToSpawn[1]);
        tileTown.pieceToSpawn = "";
    } else {
        if (tileTown.board.selectedPieceId !== "") {
            tileTown.movePiece(id(tileTown.board.selectedPieceId), object.id);
            tileTown.board.selectedPieceId = "";
        }
    }

}

function spawnPiece(color, piece) {
    tileTown.pieceToSpawn = [color, piece];
}

document.getElementById("fenInput").onkeydown = function (event) {
    if (event.key === "Enter") {
        tileTown.parseFen(document.getElementById("fenInput").value);
    }
}

document.getElementById("movePieceInput").onkeydown = function (event) {
    if (event.key === "Enter") {
        tileTown.movePieceSAN(document.getElementById("movePieceInput").value);
        document.getElementById("movePieceInput").value = "";
    }
}

onmouseup = function () {
    tileTown.updateSizing();
}