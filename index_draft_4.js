let turn = 1;
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
        $("#startBtn").stop();
        $("#startBtn").css("opacity", 1);
        $("#startBtn").removeClass("btn-info");
        $("#startBtn").addClass("btn-outline-info");

        $("#startBtn").css("pointer-events", "none");
        $("#startBtn").off();

        console.log("Start game");
        $(".box").css("pointer-events", "auto");

        $("#alertStart").addClass("alert border border-info bg-dark text-center m-0 ms-5 me-5 fs-5");
        $("#alertStart").append("Player 1 Start!");



        $(".box").on('click', function () {
            $("#alertStart").hide();


            if (currentPlayer === 'X') {

                console.log("Turn " + turn);
                if ($(this).children('img').length > 0) {
                    console.log("image already here");
                    return;
                } else {
                    $(this).append('<img src="images/x-neon.png">');
                    plays.X.push(parseInt($(this).attr("data-index")));
                    console.log("Boxes for X: " + plays.X);
                    console.log("Boxes for O: " + plays.O);
                    if (isThereAWinner()) {
                        console.log("We have a winner! it is " + currentPlayer)
                        //alert('Winner is: ' + currentPlayer);
                        $("#alertWinner").addClass("alert border border-info bg-dark text-center m-0 ms-5 me-5 fs-5");
                        $("#alertWinner").append(`Player ${currentPlayer} wins!`);

                        $(".box").css("pointer-events", "none");
                        $(".box").off();

                    } else {
                        if (turn === 9) {
                            console.log("draw");

                            $("#alertDraw").addClass("alert border border-info bg-dark text-center m-0 ms-5 me-5 fs-5");
                            $("#alertDraw").append("GAME OVER! It's a DRAW!");

                            $(".box").css("pointer-events", "none");
                            $(".box").off();
                        }
                    }

                    currentPlayer = 'O';
                    turn++;
                }
            } else {
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
                        console.log("We have a winner! it is " + currentPlayer)
                        //alert('Winner is: ' + currentPlayer);

                        $("#alertWinner").addClass("alert border border-info bg-dark text-center m-0 ms-5 me-5 fs-5");
                        $("#alertWinner").append(`Player ${currentPlayer} wins!`);

                        $(".box").css("pointer-events", "none");
                        $(".box").off();

                    } else {
                        if (turn === 9) {
                            alert("no winner");
                            console.log("draw");

                            $("#alertDraw").addClass("alert border border-info bg-dark text-center m-0 ms-5 me-5 fs-5");
                            $("#alertDraw").append("GAME OVER! It's a DRAW!");

                            $(".box").css("pointer-events", "none");
                            $(".box").off();
                        }
                    }


                    currentPlayer = 'X';
                    turn++;
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


