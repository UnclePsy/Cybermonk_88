const fetch = require('node-fetch');
const { move, status, moves, aiMove, getFen } = require('js-chess-engine')
const jsChess = require("js-chess-engine");
require("dotenv").config();

/* Create your personal token on https://lichess.org/account/oauth/token */
const personalToken = process.env.LICHESS_TOKEN;
//Chess Game virtualizer
// New move function
function moveUni(coords, game) {
    let to = coords.slice(2, 4);
    let from = coords.slice(0, 2);
    game.move(from, to);

}

const game = new jsChess.Game();
const chessmoves = "e2e4 c7c5 f2f4 d7d6 g1f3 b8c6 f1c4 g8f6 d2d3 g7g6 e1g1 f8g7 b1c3".split(" ");
chessmoves.forEach(element => console.log(element));
game.printToConsole();
chessmoves.forEach(element => (moveUni(element, game)));
console.log(game.printToConsole());
console.log(game.exportFEN());

//No board chess
async function getOngoingGame() {

    const response = await fetch('https://lichess.org/api/account/playing', {
        headers: {
            'Authorization': 'Bearer ' + personalToken
        }
    });
    const data = await response.json();
    var gameData = data.nowPlaying[0];
    return gameData;


};
async function makeAMove() {
    //get ongoing game
    const response = await getOngoingGame();
    let gameData = await response;
    //calculate a move
    console.log("Make A Move : " + gameData.fen);
    console.log
    // let gameConfiguration 
    //const move = aiMove(gameConfiguration, 2);
    console.log(move);
    return 0;
}