let turn = 1;
let gameEnd = false;
let currentPlayer = 'X';
let plays = {
    X: [],
    O: []
};

const winningCombinations = [
    [0, 1, 2], // 0 // rows
    [3, 4, 5], // 1
    [6, 7, 8], // 2
    [0, 3, 6], // 3  // columns
    [1, 4, 7], // 4
    [2, 5, 8], // 5
    [0, 4, 8], // 6 // diagonals
    [2, 4, 6]  // 7
];

// AUDIO 
const audioSwoosh = document.createElement('audio');
audioSwoosh.setAttribute('src','audio/585257__lesaucisson__swoosh-1.mp3');
const audioStart = document.createElement('audio');
audioStart.setAttribute('src', 'audio/519985__abdrtar__recording-start.mp3');

$(document).ready(function () {
    const $startBtn = $("#startBtn");
    const $resetBtn = $('#resetBtn');
    $resetBtn.click(function () {
        location.reload(true);
    });

    $(".box").css("pointer-events", "none");

    // startBtn pulsates before being clicked
    fade();

    $startBtn.click(function () {
        audioStart.play();
        // start button is no longer clickable after being clicked and no longer flickers
        $("#startBtn").stop();
        $("#startBtn").css("opacity", 1);
        $("#startBtn").removeClass("btn-info");
        $("#startBtn").addClass("btn-outline-info");
        $("#startBtn").css("pointer-events", "none");
        $("#startBtn").off();

        $("#alertStart").addClass("alert border border-info bg-dark text-center m-0 ms-5 me-5 fs-5");
        $("#alertStart").append("Player 1 Start!");


        $(".box").css("pointer-events", "auto"); // box can now be clicked

        $(".box").on('click', function () {
            if(!gameEnd) { // game can only run if gameEnd is true
            $("#alertStart").hide();
            audioSwoosh.play();

            if (currentPlayer === 'X') { // if box clicked is X, O flickers and image is added.
                fadeO();
                $("#imageP1Div").stop();
                $("#imageP1Div").css("opacity", 1);
                console.log("Turn " + turn);
                if ($(this).children('img').length > 0) {
                    console.log("image already here");
                    return;
                } else {
                    $(this).append('<img src="images/x-neon.png">'); // cannot add image if one is already present
                    plays.X.push(parseInt($(this).attr("data-index")));
                    console.log("Boxes for X: " + plays.X);
                    console.log("Boxes for O: " + plays.O);
                    if (isThereAWinner()) {
                        gameEnd = true;
                        audioStart.play();
                        console.log("We have a winner! it is " + currentPlayer)
                        //alert('Winner is: ' + currentPlayer);
                        $("#alertWinner").addClass("alert border border-info bg-dark text-center m-0 ms-5 me-5 fs-5");
                        $("#alertWinner").append(`Player ${currentPlayer} wins!`);

                        $(".box").css("pointer-events", "none");
                        $(".box").off();

                        $("#imageP1Div").stop();
                        $("#imageP1Div").css("opacity", 1);
                        $("#imageP2Div").stop();
                        $("#imageP2Div").css("opacity", 1);

                    } else {
                        if (turn === 9) {
                            gameEnd = true;
                            audioStart.play();
                            console.log("draw");

                            $("#alertDraw").addClass("alert border border-info bg-dark text-center m-0 ms-5 me-5 fs-5");
                            $("#alertDraw").append("DRAW! No winner!");

                            $(".box").css("pointer-events", "none");
                            $(".box").off();

                            $("#imageP1Div").stop();
                            $("#imageP1Div").css("opacity", 1);
                            $("#imageP2Div").stop();
                            $("#imageP2Div").css("opacity", 1);
                        }
                    }

                    currentPlayer = 'O';
                    turn++;
                }
            } else {
                fadeX();
                $("#imageP2Div").stop();
                $("#imageP2Div").css("opacity", 1);
                console.log("Turn " + turn);
                if ($(this).children('img').length > 0) {
                    console.log("image already here");
                    return;
                } else {
                    $(this).append('<img src="images/o-neon.png">');
                    plays.O.push(parseInt($(this).attr("data-index")));
                    console.log("Boxes for X: " + plays.X);
                    console.log("Boxes for O: " + plays.O);
                    if (isThereAWinner()) {
                        gameEnd = true;
                        audioStart.play();
                        console.log("We have a winner! it is " + currentPlayer)
                        //alert('Winner is: ' + currentPlayer);

                        $("#alertWinner").addClass("alert border border-info bg-dark text-center m-0 ms-5 me-5 fs-5");
                        $("#alertWinner").append(`Player ${currentPlayer} wins!`);

                        $(".box").css("pointer-events", "none");
                        $(".box").off();

                        $("#imageP1Div").stop();
                        $("#imageP1Div").css("opacity", 1);
                        $("#imageP2Div").stop();
                        $("#imageP2Div").css("opacity", 1);


                    } else {
                        if (turn === 9) {
                            gameEnd = true;
                            audioStart.play();
                            alert("no winner");
                            console.log("draw");

                            $("#alertDraw").addClass("alert border border-info bg-dark text-center m-0 ms-5 me-5 fs-5");
                            $("#alertDraw").append("DRAW! No winner!");

                            $(".box").css("pointer-events", "none");
                            $(".box").off();

                            $("#imageP1Div").stop();
                            $("#imageP1Div").css("opacity", 1);
                            $("#imageP2Div").stop();
                            $("#imageP2Div").css("opacity", 1);

                        }
                    }


                    currentPlayer = 'X';
                    turn++;
                }
            }
            }

        });
    });
});

// startBtn pulsates before being clicked
function fade() {
    $("#startBtn").animate({ opacity: 0.5 }, 800, function () {
        $(this).animate({ opacity: 1 }, 800, fade);
    });
}

function fadeX() {
    $("#imageP1Div").animate({ opacity: 0.3 }, 800, function () {
        $(this).animate({ opacity: 1 }, 800, fadeX);
    });
}

function fadeO() {
    $("#imageP2Div").animate({ opacity: 0.3 }, 800, function () {
        $(this).animate({ opacity: 1 }, 800, fadeO);
    });
}

function pulsateX() {
    $("#imageP1").animate({height: "70px", width: "70px"}, 400, function () {
        $(this).animate({height: "80px", width: "80px"}, 400, pulsateX)
    });
}


function isThereAWinner() {
    if (turn < 5) {
        return;
    }

    for (let i = 0; i < winningCombinations.length; i++) {
        let winner = true;

        for (let j = 0; j < winningCombinations[i].length; j++) {
            if ($.inArray(winningCombinations[i][j], plays[currentPlayer]) < 0) {
                winner = false;
                break;
            }
        }

        if (winner) {
            return true;
        }
    }

    return false;

}


