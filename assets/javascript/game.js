$( document ).ready(function() {

var combatants = [
    { name: "Baron Quinn", image: "assets/images/quinn.jpg", hp: 200, counterAttack: 40, attack: 12 },
    { name: "Sunny", image: "assets/images/sunny.jpg", hp: 175, counterAttack: 44, attack: 18 },
    { name: "Tilda", image: "assets/images/tilda.jpg", hp: 160, counterAttack: 15, attack: 30 },
    { name: "The Widow", image: "assets/images/widow.jpg", hp: 180, counterAttack: 30, attack: 20 }
]

var characterName;
var enemyHTML = "<h2>Enemies</h2> <div class='col-xs-3'> </div>";
var enemyObjects = [];
var currentlyFighting = false;
var opponentObject;
var playerObject;
var playerHP;
var playerAtk;
var opponentHP;
 

// click even for selecting your character
$("body").on("click", ".choose", function () {
    
    //We grab the name of the chosen character and then wipe the character divs away
    characterName = $(this).attr("name");
    $("#character-selection").empty();


    for (var i = 0; i < combatants.length; i++) {      // Loops through object array
        if (combatants[i].name === characterName) {  //put character into #player-character if name of grabbed attribute is the object's name value
            playerObject = combatants[i];            //Store the player object for more flexible use
            var player =                               // format html with charater object elements
                `<h2>Your Character</h2>
                 <div class="col-xs-5"> </div>
                 <div class="col-xs-2 player" name="${playerObject.name}"> 
                    <p>${playerObject.name}</p>
                    <img class="img-responsive" src="${playerObject.image}">
                    <p class="player-hp">${playerObject.hp}</p>
                </div>
                <div class="col-xs-5"> </div>`;

            $("#player-character").html(player);        // Uploads a character block to the "Your Character" section

            playerHP = playerObject.hp;                 // stores adjustable hp/attack scroes for player character
            playerAtk = playerObject.attack;
        }

        else {                                        //put enemy profiles into the enemies div 
            enemyObjects.push(combatants[i]);         //Will store enemy objects in their own array to be removed each time they're selected for combat
            enemyHTML +=                              // single string of formatted HTML to represent all enemies
                `               
                <div class="col-xs-2 enemy" name="${combatants[i].name}"> 
                   <p>${combatants[i].name}</p>
                   <img class="img-responsive" src="${combatants[i].image}">
                   <p>${combatants[i].hp}</p>
                </div>
                `;
        }
    }
    $("#non-player-character").html(enemyHTML); // Pushes enemies after the loop


})


// Click event for when selecting an opponent
$("body").on("click", ".enemy", function () {
    if (currentlyFighting) {  // This boolean checks to see if the player is already fighting, meaning a new opponent cannot be selected until the current one is defeated
        alert("You must finish your current fight before fighting a new opponent");
    }
    else {
            for (var i = 0; i < enemyObjects.length; i++) {
                if (enemyObjects[i].name === $(this).attr("name")) { // Checks enemy objects to see which one corresponds to the chosen enemy
                    opponentObject = enemyObjects[i];   // Stores object representing the opponent 
                    opponentHP = opponentObject.hp;      // stores hp value  from the object 
                    enemyObjects.splice(i, 1);  // Remove the chosen opponent from array of enemies
                    $(this).remove();           // Removes character div from the DOM
                    break;
                }
            }
            $("#opponent").html(
                `<h2>Your Opponent</h2>
                <div class ="col-xs-5"></div>
                <div class="col-xs-2 opponent" name="${opponentObject.name}"> 
                <p>${opponentObject.name}</p>
                <img class="img-responsive" src="${opponentObject.image}">
                <p class="opponent-hp">${opponentObject.hp}</p>
             </div>
                `
            );
            
            currentlyFighting = true;
        }
    
})


// Attack button event, does math and displays for combat, and determines win/loss conditions
$("body").on("click", "#attack", function () {
    if (currentlyFighting) {

            opponentHP = opponentHP - playerAtk;         // Player gets the first hit, so opponent's HP is reduced before win conditions are checked
            $(".opponent-hp").text(opponentHP);              // Sets DOM to reflect new hp total

            if (opponentHP <= 0) {
                currentlyFighting = false;                 // if opponent is dead we set the currentlyFighting boolean to false to allow for a new enemy to be chosen
                $(".opponent").remove();                    // Clear div of defeated opponent
                if(enemyObjects.length===0){               // Because I splice out enemies from this array each time the player fights an enemy, the array size is 0 when all enemies are cleared
                    alert("You Win");
                    reset();
                }
            }
                     
            else{                                                    // Since the opponent has not fallen, player takes damage, reflected by the DOM
                playerHP = playerHP - opponentObject.counterAttack;
                playerAtk = playerAtk + playerObject.attack;
                $(".player-hp").text(playerHP);
            }

            if(playerHP<=0){                                          // Now that the player is damaged, we check if they lose
                for(var i = 0; i<enemyObjects.length; i++)
                    enemyObjects.splice(0, 1);                        // empty out enemyObjects so it can be used in the next game
                alert("You Lose");
                currentlyFighting = false;                            // resets boolean condition to allow choosing of enemies to fight
                reset();
            }

    }
})




function reset(){           // Function to restore page to it's base state
    enemyHTML = "<h2>Enemies</h2> <div class='col-xs-3'> </div>";
    $("body").html(
        ` <div class="text-center container">
        <h1>Badlands RPG</h1>
    <div class="row" id="character-selection">      
        <h2>Pick a character</h2>

        <div class="col-xs-2"></div>

        <div class="col-xs-2 choose" name="Baron Quinn"> 
            <p>Baron Quinn</p>
            <img class="img-responsive" src="assets/images/quinn.jpg">
            <p>200</p>
        </div>

        <div class="col-xs-2 choose" name="Sunny">
            <p>Sunny</p>
            <img class="img-responsive" src="assets/images/sunny.jpg">
            <p>175</p>
        </div>

        <div class="col-xs-2 choose" name="Tilda">
            <p>Tilda</p>
            <img class="img-responsive" src="assets/images/tilda.jpg">
            <p>160</p>
        </div>

        <div class="col-xs-2 choose" name="The Widow">
            <p>The Widow</p>
            <img class="img-responsive" src="assets/images/widow.jpg">
            <p>180</p>
        </div>

        <div class="col-xs-2"></div>
    </div>

    <div class="row" id="player-character">
        <h2>Your Character</h2>
    </div>

    <div class="row" id="non-player-character">
        <h2>Enemies</h2>
    </div>

    <div class="row" id="opponent">
        <h2>Current Opponent</h2>
    </div>

    <button id="attack">Attack</button>

</div>
`
    );
}


});