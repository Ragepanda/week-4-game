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
// Choose character 
$("body").on("click", ".choose", function () {
    //clear enemy divs
    characterName = $(this).attr("name");
    $("#character-selection").empty();





    for (var i = 0; i < combatants.length; i++) {
        if (combatants[i].name === characterName) {  //put character into #player-character
            playerObject = combatants[i];
            var player =
                `<h2>Your Character</h2>
                 <div class="col-xs-5"> </div>
                 <div class="col-xs-2 player" name="${playerObject.name}"> 
                    <p>${playerObject.name}</p>
                    <img class="img-responsive" src="${playerObject.image}">
                    <p class="player-hp">${playerObject.hp}</p>
                </div>
                <div class="col-xs-5"> </div>`;

            $("#player-character").html(player);

            playerHP = playerObject.hp;
            playerAtk = playerObject.attack;
        }

        else {                                        //put enemy profiles into the enemies div 
            enemyObjects.push(combatants[i]);
            enemyHTML +=
                `               
                <div class="col-xs-2 enemy" name="${combatants[i].name}"> 
                   <p>${combatants[i].name}</p>
                   <img class="img-responsive" src="${combatants[i].image}">
                   <p>${combatants[i].hp}</p>
                </div>
                `;
        }
    }
    $("#non-player-character").html(enemyHTML);


})


// Choose enemy
$("body").on("click", ".enemy", function () {
    if (currentlyFighting) {
        alert("You must finish your current fight before fighting a new opponent");
    }
    else {
            for (var i = 0; i < enemyObjects.length; i++) {
                if (enemyObjects[i].name === $(this).attr("name")) {
                    opponentObject = enemyObjects[i];
                    opponentHP = opponentObject.hp;
                    console.log(opponentHP);
                    enemyObjects.splice(i, 1);
                    $(this).remove();
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


// Attack Enemy
$("body").on("click", "#attack", function () {
    if (currentlyFighting) {

            opponentHP = opponentHP - playerAtk;         
            $(".opponent-hp").text(opponentHP);

            if (opponentHP <= 0) {
                currentlyFighting = false;
                $(".opponent").remove();
                if(enemyObjects.length===0){
                    alert("You Win");
                    reset();
                }
            }
                     
            else{
                playerHP = playerHP - opponentObject.counterAttack;
                playerAtk = playerAtk + playerObject.attack;
                $(".player-hp").text(playerHP);
            }

            if(playerHP<=0){
                for(var i = 0; i<enemyObjects.length; i++)
                    enemyObjects.splice(0, 1);
                alert("You Lose");
                currentlyFighting = false;
                reset();
            }
            console.log(enemyObjects);
            console.log(`${playerObject.name} is at ${playerHP}, ${opponentObject.name} is at ${opponentHP}`);
    }
})


// Reset for when enemy HP is zero or your hp is 0

// Subtract enemy HP

// Subtract your HP

// Increase your attack power


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