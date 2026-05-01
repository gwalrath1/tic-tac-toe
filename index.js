/*
INSTRUCTIONS

Week 11 - Tic Tac Toe Game

Using any of the tools you've worked with so far, 
create a game of Tic-Tac-Toe.
Create a Tic-Tac-Toe game grid using your HTML element of choice.
When a cell in the grid is clicked, an X or O should appear 
in that spot depending on whose turn it is.
A heading should say whether it is X's or O's turn 
and change with each move made.
A button should be available to clear the grid and restart the game.
When a player has won, or the board is full 
and the game results in a draw, 
a Bootstrap alert or similar Bootstrap component 
should appear across the screen announcing the winner.
*/

$(document).ready(function () {

    let $box0 = $('#box0'); // selects element by id
    let $box1 = $('#box1');
    let $box2 = $('#box2');
    let $box3 = $('#box3');
    let $box4 = $('#box4');
    let $box5 = $('#box5');
    let $box6 = $('#box6');
    let $box7 = $('#box7');
    let $box8 = $('#box8');

    // Represents if click is x or o. But mine are supposed to be images so how would I do that...
    let $player1 = $('X');
    let $player2 = $('O');

    let currentPlayer = 'X';

    $('.box').on('click', function (e) {
        if ($(this).children('img').length > 0) return; // already has image, skip  // if you click into the div we have (the div is represented by "this", look it up on jquery), if the div has a child element that is an image, don't allow user to click that particular spot again. 

        // pulsates player text when it is that player's turn.
        let i = 0;
        function pulsate() {
            if (i >= 3) return;
            $("#playerOne").
                animate({ opacity: '0.5' }, 1000, 'linear').
                animate({
                    opacity: '1',
                    width: "200px"
                }, 1000, 'linear', pulsate)
        }

        if (currentPlayer === 'X') {
            pulsate();
        }
        let imgSrc = currentPlayer === 'X' ? 'images/x_resized.png' : 'images/o_resized.png';
        // Create the img and append it into the clicked div
        let $img = $('<img>').attr('src', imgSrc);
        $(this).append($img);
        // Switch turns
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    });

    $("#playerOne").animate({

    })


    function generateXOrO() {
        return currentPlayer;


    }

});