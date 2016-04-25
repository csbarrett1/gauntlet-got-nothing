"use strict";

//Browserify Dependencies
var $ = require("jquery");

//Attack time counter
let attackTimes = 0;

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

function attackAction(attacker, opponent) {
    //Give attacker "readyToAttack" class and remove "standby" class
    
    //Combatant's attack score is caluclated
    var damageToOpponentHealth = calculateAttackDamage(attacker);
    //Opponent's health is reduced by attack score
    opponent.health = opponent.health - damageToOpponentHealth;
    //Give opponent "beingAttacked" class - for set period of time - then remove
    
    //Display attack score and opponents new health 
    
    //Remove attacker "readyToAttack" class and add "standby" class

}

//This is what happens if attack button is pressed
function attackSequence(human, monster) {
    //Hide attack button
    
    attackAction(human, monster);
    //set timeout
    
    attackAction(monster, human);
    //Show attack button
    attackTimes++;
    checkHealthToSeeIfOneOfTheseBitchesDied(human, monster);
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
  attackTimes
};
