"use strict";

//Browserify Dependencies
var $ = require("jquery"),
    classes = require("./classes.js"),
    enemies = require("./enemies.js"),
    player = require("./player.js"),
    weapons = require("./weapons.js");

//Main Combatants object that holds all assets for a player, then their species
var Combatants = {};

/*
  Define the base object for any player of Gauntlet,
  whether a human player or a monster.
 */
Combatants.Player = function(name) {
  this.species = null;
  this.class = null;
  this.weapon = null;

  this.playerName = $("#player-name");
  this.originalHealth = Math.floor(Math.random() * 40 + 50);
  this.health = this.originalHealth;
  this.limbs = ["head", "neck", "arm", "leg", "torso"];
  this.skinColor = "gray";
  this.skinColors = [this.skinColor];
  this.strength = 90;
  this.intelligence = 90;

  this.toString = function() {
    var output = [this.playerName,
      ": a ",
      this.skinColor,
      " skinned ",
      this.species,
      " ",
      this.class,
      " with ",
      this.health,
      " health. ",
      (this.class.magical) ? "Able to cast " : " Wielding a ",
      this.weapon.toString(),
      "!"
    ].join("");
    return output;
  };
};

Combatants.Player.prototype.setWeapon = function(newWeapon) {
  this.weapon = new weapons.Weapons[newWeapon]();
};

Combatants.Player.prototype.setClass = function(newClass) {
  this.class = new classes.GuildHall[newClass]();
};

Combatants.Player.prototype.setName = function(newName) {
  this.playerName = newName;
};

/*
  Define the base properties for a human in a 
  constructor function.
 */
Combatants.Human = function() {
  var randomSkin;

  this.species = "Human";
  this.intelligence = this.intelligence + 20;

  this.skinColors.push("brown", "red", "white", "disease");
  randomSkin = Math.round(Math.random() * (this.skinColors.length-1));
  this.skinColor = this.skinColors[randomSkin];

  this.allowedClasses = ["Warrior", "Valkyrie", "Berserker",  "Monk", "Wizard", "Sorcerer", "Conjurer", "Shaman", "Thief", "Ninja", "Assassin"];
  this.allowedWeapons = ["Dagger", "BroadSword", "WarAxe", "Mace", "Lance", "DoubleAxe"];


  this.generateClass = function() {
  // Get a random index from the allowed classes array
  let random = Math.round(Math.random() * (this.allowedClasses.length - 1));

  // Get the string at the index
  let randomClass = this.allowedClasses[random];

  // Composes the corresponding player class into the player object
  this.class = new classes.GuildHall[randomClass]();
  return this.class;
  };

  this.generateWeapon = function() {
    // Get a random index from the allowed classes array
    let random = Math.round(Math.random() * (this.allowedWeapons.length - 1));

    // Get the string at the index
    let randomWeapon = this.allowedWeapons[random];

    // Composes the corresponding player class into the player object
    this.weapon = new weapons.Weapons[randomWeapon]();
    return this.weapon;
  };
};
Combatants.Human.prototype = new Combatants.Player();


/*
  Define the base properties for a monster in a 
  constructor function.
 */
Combatants.Monster = function() {
  this.health = this.health - 30;
  this.intelligence = this.intelligence -20;
  this.strength = this.strength + 30;
};

Combatants.Monster.prototype = new Combatants.Player();

module.exports = {
  Combatants
};
