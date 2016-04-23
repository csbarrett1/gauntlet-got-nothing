"use strict";

//To-do: Make sure to list dependencies here 
let $ = require("jquery"),
    // app = require("./app.js"),
    // attack = require("./attack.js"),
    // classes = require("./classes.js"),
    // enemies = require("./enemies.js"),
    player = require("./player.js");
    // spells = require("./spells.js"),
    // weapons = require("./weapons.js");
    
//Grabs pages (cards) from index.html
let selectNamePage = $("#player-setup");
let selectClassPage = $("#class-select");
let selectWeaponPage = $("#weapon-select");
let battlegroundPage = $("#battlefield");
let winPage = $("#player-win");
let losePage = $("#player-lose");
var selectedClass = null;


var executeEventListeners = function() {
selectClassPage.click(getClass);



};

var getClass = function(event) {
    if (event.originalEvent.target.closest(".class__link") && event.originalEvent.target.closest(".btn--orange")) { 
      if (event.target.closest(".class__link").id !== undefined) {
        selectedClass = event.target.closest(".class__link").id;
      } else if (event.target.id !== undefined) {
        selectedClass = event.target.parentElement.id;
    }
    return selectedClass;
  }
};



module.exports = {
  executeEventListeners,
  selectedClass
};