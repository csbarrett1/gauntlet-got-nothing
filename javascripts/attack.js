"use strict";

//Browserify Dependencies
var $ = require("jquery"),
    app = require("./app.js");


//Attack time counter
let attackTimes = 0;

// Populating images to battlefield
function populateBattleground(warrior, orc, playerHolder1, playerHolder2, state, opponentState) {

    function checkWhichWarriorImageToLoad (warrior) {
        var imagePrefix = null;
        console.log("warrior", warrior);
        if (warrior.class.playerClass === "Fighter" ) {
            imagePrefix = "warrior";
        }
        else if (warrior.class.playerClass === "Stealth") {
            imagePrefix = "berserker";
        }
        return imagePrefix;
    }

    function checkWhichOrcImageToLoad (orc) {
        var imagePrefix = null;
        console.log("orc", orc);
        if (orc.class.name === "Warrior" ) {
            imagePrefix = "orc1";
        }
        else if (orc.class.name === "Berserker") {
            imagePrefix = "orc2";
        }
        else if (orc.class.name === "Shaman") {
            imagePrefix = "orc3";
        }
        return imagePrefix;
    }

    function createWarriorImage (player, state) {
        var image = "";
        var prefix = checkWhichWarriorImageToLoad(player);
        image = "img/" + prefix + state + ".png";
        return image;
    }

    function createOrcImage (player, opponentState) {
        var image = "";
        var prefix = checkWhichOrcImageToLoad(player);
        image = "img/" + prefix + opponentState + ".png";
        return image;
    }

    function domAppend (playerHolder1, playerHolder2) {
        var warriorImage = createWarriorImage(warrior, state);
        var orcImage = createOrcImage(orc, opponentState);
        playerHolder1.attr("src", warriorImage);
        playerHolder2.attr("src", orcImage);
    }
    domAppend(playerHolder1, playerHolder2);
}

//Calculate how much damage each player's attack is
function calculateAttackDamage(player) {
    //Player's health, strength and intelligence are averaged.
    var playerCurrentStat = ((player.health + player.strength + player.intelligence)/3);
    //Player's minimum and maximum attack damage is calculated then it picks a random number between the 2 and returns it
    var maximumAttackDamage = player.weapon.damage;
    var minimumAttackDamage = (playerCurrentStat * maximumAttackDamage)/100;
    var attackDamage = 0;
    if (minimumAttackDamage >= maximumAttackDamage) {
        attackDamage = Math.floor(maximumAttackDamage);
    } else {
        attackDamage = Math.floor(getRandomInt(minimumAttackDamage, maximumAttackDamage));
    }
    return attackDamage;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



function pausecomp(millis) {
var date = new Date();
var curDate = null;

do {curDate = new Date(); } 
while(curDate-date < millis);
}


//This is what happens if attack button is pressed
function attackSequence(human, monster) {

    function attackAction(attacker, opponent) {
        checkHealthToSeeIfOneOfTheseBitchesDied(human, monster);
        //Combatant's attack score is caluclated
        var damageToOpponentHealth = calculateAttackDamage(attacker);
        //Opponent's health is reduced by attack score
        opponent.health = opponent.health - damageToOpponentHealth;
        checkHealthToSeeIfOneOfTheseBitchesDied(human, monster);
        // Display attack score - DOM output("Attacker" attacks "opponent" with "weapon" and does {x} damage.)
        var buildString = `<p class="attackOutput">${attacker.playerName} attacks ${opponent.playerName} with ${attacker.weapon} & does ${damageToOpponentHealth} damage. <b> ${opponent.playerName} health: ${opponent.health}</b></p>`;
        $("#textbox").append(buildString);
        // Opponent progress bar updated.
    }

    var humanAttackState = "Ready";
    var monsterAttackState = "Ready";

    //Hide attack button
    
    //Take off old "entry" classes to make way for tada class
    $("#attackerImage").removeClass('animated slideInLeft');
    $("#opponentImage").removeClass('animated slideInRight');
    

    //Warrior Attacks
    var humanAttack = setTimeout(function() {
        humanAttackState = "Strike";
        monsterAttackState = "Ready";
        attackAction(human, monster);
        populateBattleground(human, monster, $("#attackerImage"), $("#opponentImage"), humanAttackState, monsterAttackState);
        $("#attackerImage").removeClass('animated quick tada');
        $("#opponentImage").addClass('animated quick tada');
        pausecomp(100);
        reset();
        monsterAttacks();
        }, 400);
    
    //Spar Reset
    var reset = function(){setTimeout(function() {
        monsterAttackState = "Ready";
        humanAttackState = "Ready";
        populateBattleground(human, monster, $("#attackerImage"), $("#opponentImage"), humanAttackState, monsterAttackState);
        }, 300);
    };
    
    //Monster Attacks
    var monsterAttacks = function(){setTimeout(function() {
        monsterAttackState = "Strike";
        humanAttackState = "Ready";
        pausecomp(300);
        attackAction(monster, human);
        populateBattleground(human, monster, $("#attackerImage"), $("#opponentImage"), humanAttackState, monsterAttackState);
        $("#opponentImage").removeClass('animated quick tada');
        $("#attackerImage").addClass('animated quick tada');
        reset();
        }, 900);
    };
    
    $("#attackerImage").removeClass('animated quick tada');
    $("#opponentImage").removeClass('animated quick tada');



    //Show attack button
    attackTimes++;
    reduceStrength(attackTimes, human, monster);
}

function checkHealthToSeeIfOneOfTheseBitchesDied(human, monster) {
    if (human.health <= 0) {
        //Disable attack button
        //move to "lose" page
        $(".card").hide();
        $(".card--lose").show();
    } else if (monster.health <= 0) {
        //Disable attack button
        //move to "win" page
        $(".card").hide();
        $(".card--win").show();
    } else {
        //Keep going
    }
}

//Every third time, strength is decreased by certain amount

function reduceStrength(attackTimes, human, monster) {
    if (attackTimes % 3 === 0 && attackTimes > 0) {
        human.strength = human.strength - 20;
        monster.strength = monster.strength - 15;
    }
}


module.exports = {
  attackSequence,
  attackTimes,
  populateBattleground
};
