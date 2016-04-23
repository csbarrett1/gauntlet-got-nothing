"use strict";

//To-do: Make sure to list dependencies here 
let $ = require("jquery"),
    // attack = require("./attack.js"),
    classes = require("./classes.js"),
    // enemies = require("./enemies.js"),
    player = require("./player.js"),
    // spells = require("./spells.js"),
    weapons = require("./weapons.js");

//To Do: Could add more enemy "species"

console.log("combatants", player.Combatants);

var Orc = function() {
  this.health = this.health + 20;
  this.species = "Orc";
  this.allowedClasses = ["Warrior", "Berserker", "Shaman"];
  this.allowedWeapons = ["BroadSword","WarAxe","DoubleAxe"];

  this.generateClass = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedClasses.length - 1));

    // Get the string at the index
    var randomClass = this.allowedClasses[random];

    // Composes the corresponding player class into the player object
    this.class = new classes.GuildHall[randomClass]();
    return this.class;
  };

  this.generateWeapon = function() {
    // Get a random index from the allowed classes array
    var random = Math.round(Math.random() * (this.allowedWeapons.length - 1));

    // Get the string at the index
    var randomWeapon = this.allowedWeapons[random];

    // Composes the corresponding player class into the player object
    this.weapon = new weapons.Weapons[randomWeapon]();
    return this.weapon;
  };
};

Orc.prototype = new player.Combatants.Monster();

module.exports = {
  Orc
};

