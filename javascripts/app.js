"use strict";


//BROWSERIFY ENTRY FILE: Requirements
//Now everytime we need to call a function or variable in these JS files, we will need to reference it as enemies.monster, etc
let $ = require("jquery"),
    attack = require("./attack.js"),
    classes = require("./classes.js"),
    enemies = require("./enemies.js"),
    player = require("./player.js"),
    // spells = require("./spells.js"),
    weapons = require("./weapons.js"),
    eventListeners = require("./eventListeners.js");

//Grabs pages (cards) from index.html
let selectNamePage = $("#player-setup");
let selectClassPage = $("#class-select");
let selectWeaponPage = $("#weapon-select");
let battlegroundPage = $("#battlefield");
let winPage = $("#player-win");
let losePage = $("#player-lose");

/*
  Test code to generate a human player and an orc player
 */
        // var warrior = new Gauntlet.Combatants.Human();
        // warrior.setWeapon(new WarAxe());
        // warrior.generateClass();  // This will be used for "Surprise me" option

        // console.log(warrior.toString());

        var orc = new enemies.Orc();
        orc.generateClass();
        orc.generateWeapon();
        console.log(orc.toString(), orc.intelligence, orc.strength, orc.health);

        var warrior = new player.Combatants.Human();
        console.log("warrior", warrior);
      
        
        // console.log(warrior.toString()

/*
  Test code to generate a spell
 */
        // var spell = new Gauntlet.SpellBook.Sphere();
        // console.log("spell: ", spell.toString());


$(document).ready(function() {
  var selectedClass = null;
  var selectedWeapon = null;

  /*
    Show the initial view that accepts player name
   */
  $("#player-setup").show();

  /*
    When any button with card__link class is clicked,
    move on to the next view.
   */
  
  $(".class__link").click(function(e) {
    if (e.target.id !== "") {
      selectedClass = e.target.id;
    } else {
      selectedClass = e.target.closest(".class__link").id;
    }
  });

  $(".weapon__link").click(function(e){
    if (e.target.id !== "") {
      selectedWeapon = e.target.id;
    } else {
      selectedWeapon = e.target.closest(".weapon__link").id;
    }
  });

  $("#attackBtn").click(function(e) {
    attack.attackSequence(warrior, orc);
  });

  $(".play_again").click(function(e) {
    location.reload();
  });
        

  $(".card__link").click(function(e) {
    var nextCard = $(this).attr("next");
    var moveAlong = false;

    switch (nextCard) {
      case "card--class":
        warrior.setName($("#player-name").val());
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--weapon":
        moveAlong = ($("#player-name").val() !== "");
        if (selectedClass === "surprise_class") {
          warrior.generateClass();
        } else {
          warrior.setClass(selectedClass);
        }
        break;
      case "card--battleground":
        moveAlong = ($("#player-name").val() !== "");
        if (selectedWeapon === "surprise_weapon") {
          warrior.generateWeapon();
        } else {
          warrior.setWeapon(selectedWeapon);
        }
        break;
    }

    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }
  });

  /*
    When the back button clicked, move back a view
   */
  $(".card__back").click(function(e) {
    var previousCard = $(this).attr("previous");
    $(".card").hide();
    $("." + previousCard).show();
  });



});




module.exports = {
  warrior,
  orc
};