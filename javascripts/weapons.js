"use strict";

//Browserify Dependencies
var $ = require("jquery");

//Main Weapons object that holds all weapons a player can select
var Weapons = {};



/******************** Base function for a weapon class *********************/
Weapons.Weapon = function() {
  this.name = "bare hands";
  this.damage = 1;
  this.hands = 2;

  this.toString = function() {
    return this.name;
  };
};


/******************** WEAPONS *********************/
    /*****    - Dagger        *****/
    /*****    - BroadSword    *****/
    /*****    - WarAxe        *****/
    /*****    - Mace          *****/
    /*****    - Lance         *****/
    /*****    - DoubleAxe     *****/

Weapons.Dagger = function() {
  this.name = "a dagger";
  this.damage = 4;
  this.hands = 1;
};
Weapons.Dagger.prototype = new Weapons.Weapon();


Weapons.BroadSword = function() {
  this.name = "a broad sword";
  this.damage = 14;
  this.hands = 2;
};
Weapons.BroadSword.prototype = new Weapons.Weapon();


Weapons.WarAxe = function() {
  this.name = "a war axe";
  this.damage = 18;
  this.hands = 2;
};
Weapons.WarAxe.prototype = new Weapons.Weapon();


Weapons.Mace = function() {
  this.name = "a mace";
  this.damage = 12;
  this.hands = 3;
};
Weapons.Mace.prototype = new Weapons.Weapon();


Weapons.Lance = function() {
  this.name = "a lance";
  this.damage = 15;
  this.hands = 2;
};
Weapons.Lance.prototype = new Weapons.Weapon();


Weapons.DoubleAxe = function() {
  this.name = "a double axe";
  this.damage = 20;
  this.hands = 5;
};
Weapons.DoubleAxe.prototype = new Weapons.Weapon();



module.exports = {
  Weapons
};