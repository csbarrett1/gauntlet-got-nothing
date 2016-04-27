"use strict";

//Browserify Dependencies
let $ = require("jquery");

//Attack time counter
let attackTimes = 0;

// Populating images to battlefield
function populateBattlegroundForMagic(warrior, orc, playerHolder1, playerHolder2, state, opponentState) {

    function checkWhichOrcImageToLoadforMagic (orc) {
        var imagePrefix = null;
        if (orc.class.name === "Warrior" ) {
            imagePrefix = "orc1";
        } else if (orc.class.name === "Berserker") {
            imagePrefix = "orc2";
        } else if (orc.class.name === "Shaman") {
            imagePrefix = "orc3";
        }
        return imagePrefix;
    }

    function createWarriorImageForMagic (warrior, state) {
        var image = "";
        var prefix = "magic";
        image = "img/" + prefix + state + ".png";
        return image;
    }

    function createOrcImageForMagic (player, opponentState) {
        var image = "";
        var prefix = checkWhichOrcImageToLoadforMagic(player);
        image = "img/" + prefix + opponentState + ".png";
        return image;
    }

    function domAppend (playerHolder1, playerHolder2) {
        var warriorImage = createWarriorImageForMagic(warrior, state);
        var orcImage = createOrcImageForMagic(orc, opponentState);
        playerHolder1.attr("src", warriorImage);
        playerHolder2.attr("src", orcImage);
    }
    domAppend(playerHolder1, playerHolder2);
}


function calculateAttackForMagicSpell(player, opponent, typeOfSpellCast) {
    var maximumAttackDamage = typeOfSpellCast.maxDamage;
    var minimumAttackDamage = typeOfSpellCast.minDamage;
    var playerCurrentStat = ((player.health + player.strength + player.intelligence)/3);
    var attackDamage = 0;
    if (opponent.class.elementWeaknesses.indexOf[typeOfSpellCast] >= 0) {
        attackDamage = Math.floor(maximumAttackDamage);
    } else {
        attackDamage = Math.floor(minimumAttackDamage);
    }
    return attackDamage;
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


//Helper functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function pausecomp(millis) {
var date = new Date();
var curDate = null;

do {curDate = new Date(); } 
while(curDate-date < millis);
}



//Holds all the "attack" messages, unshifted into an array so the newest always appears on top
var buildString = [];

//This is what happens if attack button is pressed
function attackSpellSequence(human, monster, typeOfSpellCast) {

    function spellAttackAction (attacker, opponent, typeOfSpellCast) {
        //Combatant's attack score is caluclated
        var damageToOpponentHealth = calculateAttackForMagicSpell(attacker, opponent, typeOfSpellCast);
        //Opponent's health is reduced by attack score
        opponent.health = opponent.health - damageToOpponentHealth;
        //Give opponent "beingAttacked" class - for set period of time - then remove
        buildString.unshift('<p class="attackOutput">' + attacker.playerName +' the ' + attacker.class + ' casts the ' + typeOfSpellCast.type + ' spell on ' + opponent.playerName + ' and does ' + damageToOpponentHealth + ' damage. <p class="opponentHealth">' + opponent.playerName + ' health: ' + opponent.health + '</p></p>');
        //Display attack score and opponents new health 
        $("#textboxMagic").html(buildString);
    }

    function attackAction(attacker, opponent) {
        //Combatant's attack score is caluclated
        var damageToOpponentHealth = calculateAttackDamage(attacker);
        //Opponent's health is reduced by attack score
        opponent.health = opponent.health - damageToOpponentHealth;
        checkHealthToSeeIfOneOfTheseBitchesDied(human, monster);
        // Display attack score - DOM output("Attacker" attacks "opponent" with "weapon" and does {x} damage.)
        buildString.unshift('<p class="attackOutput">' + attacker.playerName +' the ' + attacker.class + ' attacks ' + opponent.playerName + ' the ' + opponent.class + ' with ' + attacker.weapon + ' and does ' + damageToOpponentHealth + ' damage. <p class="opponentHealth">' + opponent.playerName + ' health: ' + opponent.health + '</p></p>');
        $("#textboxMagic").html(buildString);
    }


    var humanAttackState = "Ready";
    var monsterAttackState = "Ready";
    
    //Take off old "entry" classes to make way for tada class
    $("#attackerImage").removeClass('animated slideInLeft');
    $("#opponentImage").removeClass('animated slideInRight');

    //Warrior Attacks
    var humanAttack = setTimeout(function() {
        humanAttackState = "Strike";
        monsterAttackState = "Ready";
        spellAttackAction(human, monster, typeOfSpellCast);
        checkHealthToSeeIfOneOfTheseBitchesDied(human, monster);
        populateBattlegroundForMagic(human, monster, $("#magicAttackImage"), $("#magicOpponentImage"), humanAttackState, monsterAttackState);
        $("#magicAttackImage").removeClass('animated quick tada');
        $("#magicOpponentImage").addClass('animated quick wobble');
        var oppHealth = $("#magic_opp_health");
        var oppFinalHealth = (monster.health / monster.originalHealth) * 100;
        oppHealth.css("width", oppFinalHealth + "%");
        pausecomp(100);
        reset();
        monsterAttacks();
        }, 400);
    
    //Spar Reset
    var reset = function(){setTimeout(function() {
        monsterAttackState = "Ready";
        humanAttackState = "Ready";
        populateBattlegroundForMagic(human, monster, $("#magicAttackImage"), $("#magicOpponentImage"), humanAttackState, monsterAttackState);
        }, 300);
    };
    
    //Monster Attacks
    var monsterAttacks = function(){setTimeout(function() {
        monsterAttackState = "Strike";
        humanAttackState = "Ready";
        pausecomp(300);
        attackAction(monster, human);
        checkHealthToSeeIfOneOfTheseBitchesDied(human, monster);
        populateBattlegroundForMagic(human, monster, $("#magicAttackImage"), $("#magicOpponentImage"), humanAttackState, monsterAttackState);
        $("#magicOpponentImage").removeClass('animated quick wobble');
        $("#magicAttackImage").addClass('animated quick tada');
        var playerHealth = $("#magic_player_health");
        var playerFinalHealth = (human.health / human.originalHealth) * 100;
        playerHealth.css("width", playerFinalHealth + "%");
        reset();
        }, 900);
    };
    
    $("#magicAttackImage").removeClass('animated quick tada');
    $("#magicOpponentImage").removeClass('animated quick wobble');
}

function checkHealthToSeeIfOneOfTheseBitchesDied(human, monster) {
    var happened = false;
    if (happened === false) {
        if (human.health <= 0) {
            //move to "lose" page
            $(".card").hide();
            $(".card--lose").show();
            happened = true;
        } else if (monster.health <= 0) {
            //move to "win" page
            $(".card").hide();
            $(".card--win").show();
            happened = true;
        }
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
  populateBattlegroundForMagic,
  attackSpellSequence,
  attackTimes
};
