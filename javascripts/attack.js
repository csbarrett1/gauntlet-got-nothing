"use strict";

//To-do: Make sure to list dependencies here 
//To-do: Change all playerX and playerY to appropriate player v opponent var



//Calculate how much damage each player's attack is
function calculateAttackDamage(player) {
    //Player's health, strength and intelligence are averaged.
    var playerCurrentStat = ((player.health + player.strength + player.intelligence)/3)
    //Player's minimum and maximum attack damage is calculated then it picks a random number between the 2 and returns it
    var maximumAttackDamage = player.weapon.damage;
    var minimumAttackDamage = (playerCurrentStat * maximumAttackDamage)/100
    var attackDamage = 0;
    if (minimumAttackDamage >= maximumAttackDamage) {
        attackDamage = maximumAttackDamage;
    } else {
        attackDamage = getRandomInt(minimumAttackDamage, maximumAttackDamage);
    }
    return attackDamage
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function attack(attacker, opponent) {
    //Give attacker "readyToAttack" class and remove "standby" class
    
    //Combatant's attack score is caluclated
    var damageToOpponentHealth = calculateAttackDamage(attacker);
    //Opponent's health is reduced by attack score
    opponent.health = opponent.health - damageToOpponentHealth;
    //Give opponent "beingAttacked" class - for set period of time - then remove
    
    //Display attack score and opponents new health 
    
    //Remove attacker "readyToAttack" class and add "standby" class
    
    break;
}

//This is what happens if attack button is pressed
function attackSequence(human, monster) {
    //Hide attack button
    attack(human, monster);
    //set timeout
    attack(monster, human);
    //Show attack button
}