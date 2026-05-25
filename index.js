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

    let $turn = 1; // at the start of a game, no turns have happened
    let $winner = false; // at the start of a game, we do not have a winner

    // hides alerts before start button is clicked
    // might have to make it so i use a helper function to create the alerts bc rn they keep flashing RIGHT as the page loads. no bueno.
     $('#alertStart').hide()
     $('#alertWinner').hide()
     $('#alertDraw').hide()
    
     const $winningCombos = [
        [$box0, $box1, $box2], // rows
        [$box3, $box4, $box5], 
        [$box6, $box7, $box8],
        [$box0, $box3, $box6], // columns
        [$box1, $box4, $box7],
        [$box2, $box5, $box8],
        [$box0, $box4, $box8], // diagonals
        [$box2, $box4, $box6]
     ];


    // invoke custom function in query by writing $.customFunction(). Alternatively, $(this).customFunction if you wanna call it on a specific thing. So like $.checkWinner()
    $.fn.checkWinner = function(boxA, boxB, boxC) {
        
        // left off here at 58:02 in video
        if(boxA.$img.html() === 'images/x_resized.png' && boxB.$img.html() === 'images/x_resized.png' && boxB.$img.html() === 'images/x_resized.png') { // don't ask me if this is correct, just jotting my thoughts down lol.
            $winner = true;
            console.log("X is the winner!");
            boxA.css({"background-color": "#FA2FBD", "opacity": "0.5"});
            boxB.css({"background-color": "#FA2FBD", "opacity": "0.5"});
            boxC.css({"background-color": "#FA2FBD", "opacity": "0.5"});
        } else {
            $winner = true;
            console.log("O is the winner!");
            boxA.css({"background-color": "#FA2FBD", "opacity": "0.5"});
            boxB.css({"background-color": "#FA2FBD", "opacity": "0.5"});
            boxC.css({"background-color": "#FA2FBD", "opacity": "0.5"});
        }
    }
    
    let $currentPlayer = 'X';
     // function that starts game
    $.fn.startGame = function() { // i'm actually tweaking this WORKED AHAHAHAHA
        console.log("start game");
        $("#alertStart").show();
    }

    // CHILL I ACTUALLY WROTE JQUERY ON MY OWN WOW I PULLED MYSELF UP BY THE BOOSTRAPS (YAY)

    let $startBtn = $('#startBtn');
    console.log($startBtn);

    // actually starts game
    $startBtn.click(function() {
        $(this).startGame();
    });

    // clicking each box to make it show x or o images
    $('.box').on('click', function (e) {
        $("#alertStart").hide(); // hides start alert

        // check if there is a winner after min 5 turns
        if($turn > 4) {
            console.log("Is there a winner yet?");
        }

        if ($(this).children('img').length > 0) return; // already has image, skip  // if you click into the div we have (the div is represented by "this", look it up on jquery), if the div has a child element that is an image, don't allow user to click that particular spot again. this is the html element you're focused on
        
        // visually indicating which player needs to take a turn
        
       
        console.log("Turn: " + $turn++);
        let $imgSrc = $currentPlayer === 'X' ? 'images/x_resized.png' : 'images/o_resized.png';
        // Create the img and append it into the clicked div
        let $img = $('<img>').attr('src', $imgSrc);
        $(this).append($img);
        // Switch turns
        $currentPlayer = $currentPlayer === 'X' ? 'O' : 'X';

        console.log("Current player: " + $currentPlayer);
        if($currentPlayer === 'X') {
            $("#p1").addClass("border border-info rounded") // goes kind of fast, may have to tweak
            $("#p2").removeClass("border border-info rounded");  
        } else {
            $("#p2").addClass("border border-info rounded");
            $("#p1").removeClass("border border-info rounded"); 
        }
    });

    // reset button that reloads page
    let $resetBtn = $('#resetBtn');
    $resetBtn.click(function() {
        location.reload(true);
    });
});