"use strict";

//To-do: Make sure to list dependencies here 
let $ = require("jquery");
    // attack = require("./attack.js"),
    // classes = require("./classes.js"),
    // enemies = require("./enemies.js"),
    // player = require("./player.js"),
    // spells = require("./spells.js"),
    // weapons = require("./weapons.js");

//Main Spellbook object that holds all spells a magical player can select
var SpellBook = {};

/*
  Base spell function that defines name, damage, damage type
 */
SpellBook.Spell = function() {
  this.name = "";
  this.damage = 0;

  this.damageTypes = ["lightning", "fire", "water", "earth", "mysticism", "love"];
  this.type = "";

  this.toString = function() {
    return this.name + " of " + this.type + " for " + this.damage + " damage!";
  };
};

/*
  An elemental sphere that can be cast by a magical class
 */
SpellBook.Sphere = function() {
  this.name = "sphere";
  this.damage = Math.floor(Math.random() * 10 + 10);
};
SpellBook.Sphere.prototype = new SpellBook.Spell();

SpellBook.Lightning = function() {
  this.type = "lightning";
  this.maxDamage = this.damage + 35;
  this.minDamage = this.damage + 2;
};
SpellBook.Lightning.prototype = new SpellBook.Sphere();

SpellBook.Fire = function() {
  this.type = "fire";
  this.maxDamage = this.damage + 20;
  this.minDamage = this.damage + 12;
};
SpellBook.Fire.prototype = new SpellBook.Sphere();

SpellBook.Water = function() {
  this.type = "water";
  this.maxDamage = this.damage + 25;
  this.minDamage = this.damage + 1;
};
SpellBook.Water.prototype = new SpellBook.Sphere();

SpellBook.Earth = function() {
  this.type = "earth";
  this.maxDamage = this.damage + 25;
  this.minDamage = this.damage + 20;
};
SpellBook.Earth.prototype = new SpellBook.Sphere();

SpellBook.Mysticism = function() {
  this.type = "mysticism";
  this.maxDamage = this.damage + 30;
  this.minDamage = this.damage + 3;
};
SpellBook.Mysticism.prototype = new SpellBook.Sphere();

SpellBook.Love = function() {
  this.type = "love";
  this.maxDamage = this.damage + 40;
  this.minDamage = this.damage - 10;
};
SpellBook.Love.prototype = new SpellBook.Sphere();

module.exports = {
  SpellBook
};
