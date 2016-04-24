"use strict";


//BROWSERIFY ENTRY FILE: Requirements
//Now everytime we need to call a function or variable in these JS files, we will need to reference it as enemies.monster, etc
let $ = require("jquery"),
    attack = require("./attack.js"),
    classes = require("./classes.js"),
    enemies = require("./enemies.js"),
    player = require("./player.js"),
    // spells = require("./spells.js"),
    weapons = require("./weapons.js");



/*
Code to generate a human player and an orc player
 */

  var orc = new enemies.Orc();
  orc.generateClass();
  orc.generateWeapon();
  orc.playerName = "Monkey Arse";
  console.log("orc", orc);

  var warrior = new player.Combatants.Human();
      
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
  $(".btn--orange").addClass('disabled');

  $("#player-name").keyup(function(e) {
    disabledButtonCheck();
  });
  
  $(".class__link").click(function(e) {
    if (e.target.id !== "") {
      selectedClass = e.target.id;
    } else {
      selectedClass = e.target.closest(".class__link").id;
    }
    disabledButtonCheck();
  });

  $(".weapon__link").click(function(e){
    if (e.target.id !== "") {
      selectedWeapon = e.target.id;
    } else {
      selectedWeapon = e.target.closest(".weapon__link").id;
    }
    disabledButtonCheck();
  });

  $("#attackBtn").click(function(e) {
    attack.attackSequence(warrior, orc);
  });

  $(".play_again").click(function(e) {
    location.reload();
  });


  // Surprise functionality both generates weapons and move you on to the next page
  $("#surprise_class").click(function(e) {
    warrior.generateClass();
    $(".card").hide();
    $(".card--weapon").show();
  });

  $("#surprise_weapon").click(function(e){
    warrior.generateWeapon();
    $(".card").hide();
    $(".card--battleground").show();
  });


  function disabledButtonCheck() {
    if ($("#player-name").val() !== "") {
      $("#nameWasInput").removeClass('disabled');
    }

    if (selectedClass !== null) {
      $("#classHasBeenSelected").removeClass('disabled');
    }

    if (selectedWeapon !== null) {
      $("#weaponHasBeenSelected").removeClass('disabled');
    }
  }
  
        
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
        if (selectedClass === "surprise_class") {
          warrior.generateClass();
        } else if (selectedClass !== null){
          warrior.setClass(selectedClass);
        }
        moveAlong = ($("#player-name").val() !== "" && selectedClass !== null);
        break;
      case "card--battleground":
        if (selectedWeapon === "surprise_weapon") {
          warrior.generateWeapon();
        } else if (selectedWeapon !== null) {
          warrior.setWeapon(selectedWeapon);
        }
        moveAlong = ($("#player-name").val() && selectedClass !== null && selectedWeapon !== null);
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