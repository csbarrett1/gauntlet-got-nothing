"use strict";

let $ = require("jquery");
    // attack = require("./attack.js"),
    // classes = require("./classes.js"),
    // enemies = require("./enemies.js"),
    // player = require("./player.js"),
    // spells = require("./spells.js"),
    // weapons = require("./weapons.js");

var Weapons = {};

Weapons.Weapon = function() {
  this.name = "bare hands";
  this.damage = 1;
  this.hands = 2;

  this.toString = function() {
    return this.name;
  };
};

Weapons.Dagger = function() {
  this.name = "dagger";
  this.damage = 4;
  this.hands = 1;
};
Weapons.Dagger.prototype = new Weapons.Weapon();

Weapons.BroadSword = function() {
  this.name = "broad sword";
  this.damage = 14;
  this.hands = 2;
};
Weapons.BroadSword.prototype = new Weapons.Weapon();

Weapons.WarAxe = function() {
  this.name = "war axe";
  this.damage = 18;
  this.hands = 2;
};
Weapons.WarAxe.prototype = new Weapons.Weapon();

Weapons.Mace = function() {
  this.name = "mace";
  this.damage = 12;
  this.hands = 3;
};
Weapons.Mace.prototype = new Weapons.Weapon();

Weapons.Lance = function() {
  this.name = "lance";
  this.damage = 15;
  this.hands = 2;
};
Weapons.Lance.prototype = new Weapons.Weapon();

Weapons.DoubleAxe = function() {
  this.name = "double axe";
  this.damage = 20;
  this.hands = 5;
};
Weapons.DoubleAxe.prototype = new Weapons.Weapon();

module.exports = {
  Weapons
};