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
  eventListeners.executeEventListeners();


  /*
    Show the initial view that accepts player name
   */
  $("#player-setup").show();

  /*
    When any button with card__link class is clicked,
    move on to the next view.
   */
  $(".card__link").click(function(e) {
    var nextCard = $(this).attr("next");
    var moveAlong = false;

    switch (nextCard) {
      case "card--class":
        warrior.setName($("#player-name").val());
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--weapon":
        var selectedClass = eventListeners.selectedClass;
        console.log("selectedClass", selectedClass);
        warrior.setClass(new classes.GuildHall.selectedClass());
        warrior.setWeapon(new weapons.Weapons.Lance());
        console.log("warrior", warrior);
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--battleground":
        moveAlong = ($("#player-name").val() !== "");
        console.log(warrior);
        $("#attackBtn").click(function() {
        attack.attackSequence(warrior, orc);
        console.log("attack happened", warrior.originalHealth, orc.originalHealth, warrior.health, orc.health);  
        });
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