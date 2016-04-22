"use strict";


//BROWSERIFY ENTRY FILE: Requirements
//Now everytime we need to call a function or variable in these JS files, we will need to reference it as enemies.monster, etc
let $ = require("jquery");
    // attack = require("./attack.js"),
    // classes = require("./classes.js"),
    // enemies = require("./enemies.js"),
    // player = require("./player.js"),
    // spells = require("./spells.js"),
    // weapons = require("./weapons.js");

$(document).ready(function() {
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
        moveAlong = ($("#player-name").val() !== "");
        break;
      case "card--weapon":
        moveAlong = ($("#player-name").val() !== "");
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