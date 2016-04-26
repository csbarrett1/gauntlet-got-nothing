"use strict";


//BROWSERIFY ENTRY FILE: Requirements
//Now everytime we need to call a function or variable in these JS files, we will need to reference it as enemies.monster, etc
var $ = require("jquery"),
    attack = require("./attack.js"),
    classes = require("./classes.js"),
    enemies = require("./enemies.js"),
    player = require("./player.js"),
    spells = require("./spells.js"),
    spellCast = require("./spellCast.js"),
    weapons = require("./weapons.js");



/*
Code to generate a human player and an orc player
 */
var orc = new enemies.Orc();
orc.generateClass();
orc.generateWeapon();
orc.playerName = "Monkey Arse";

var warrior = new player.Combatants.Human();
      

//jQuery reference to spell buttons
var lightningSpellButton = $("#lightningSpellLink");
var fireSpellButton = $("#fireSpellLink");
var waterSpellButton = $("#waterSpellLink");
var earthSpellButton = $("#earthSpellLink");
var mysticismSpellButton = $("#mysticismSpellLink");
var loveSpellButton = $("#loveSpellLink");

//Variables for player setup begin at null until they make a selection
var selectedClass = null;
var selectedWeapon = null;

//Where all the magic happens
$(document).ready(function() {

  //Show the initial view that accepts player name
  $("#player-setup").show();

  //Disable buttons until user inputs their selection
  $(".btn--orange").addClass('disabled');

  //Checks to see if disabled buttons should be enabled again based on user input
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

  //NAME ENTER PAGE: If user has entered any characters, system will check if the button should be enabled again
  $("#player-name").keyup(function(e) {
    disabledButtonCheck();
  });
  
  //SELECT CLASS PAGE: If user has selected any input, system will check if the button should be enabled again and assign the selected class to the warrior object
  $(".class__link").click(function(e) {
    $(".class__link").removeClass('selected');
    $(e.currentTarget).addClass('selected');
    if (e.target.id !== "") {
      selectedClass = e.target.id;
    } else {
      selectedClass = e.target.closest(".class__link").id;
    }
    disabledButtonCheck();
  });

  //SELECT CLASS PAGE: SURPRISE functionality both generates classes for warrior object and moves you on to the next page
  $("#surprise_class").click(function(e) {
    warrior.generateClass();
    var thisBitchIsMagic = checkToSeeIfMagic();
    if (!thisBitchIsMagic) {
      $(".card").hide();
      $(".card--weapon").show();
    }
  });

  //SELECT CLASS PAGE: If user is MAGIC, it will skip weapon page and bring them straight to battlegrounds(magic)
   var checkToSeeIfMagic = function() {
    var thisBitchIsMagic = false;
      if (warrior.class.magical === true || warrior.magical === true) {
        $(".card").hide();
        $(".card--battleground--for--magic").show();
      thisBitchIsMagic = true;
    }
    return thisBitchIsMagic;
  };

  //SELECT WEAPON PAGE: If user has selected any input, system will check if the button should be enabled again and assign the selected weapon to the warrior object
  $(".weapon__link").click(function(e){
    $(".weapon__link").removeClass('selected');
    $(e.currentTarget).addClass('selected');
    if (e.target.id !== "") {
      selectedWeapon = e.target.id;
    } else {
      selectedWeapon = e.target.closest(".weapon__link").id;
    }
    disabledButtonCheck();
  });

  //SELECT WEAPON PAGE: SURPRISE functionality both generates weapon for warrior object and moves you on to the next page
  $("#surprise_weapon").click(function(e){
    warrior.generateWeapon();
    $(".card").hide();
    $(".card--battleground").show();
  });

  //BATTLEGROUND(NON-MAGIC)
  $("#attackBtn").click(function(e) {
    attack.attackSequence(warrior, orc);

    let oppHealth = $("#opp_health");
    oppHealth.css("width", (orc.health / orc.originalHealth) * 100);

    let playerHealth = $("#player_health");
    playerHealth.css("width", (warrior.health / warrior.health) * 100);
  });

  //BATTLEGROUND(MAGIC)
  // All of the spells for magic class!
  lightningSpellButton.click(function(e) {
    var lightningSpell = new spells.SpellBook.Lightning();
    spellCast.attackSequence(warrior, orc, lightningSpell);
  });

  fireSpellButton.click(function(e) {
    var fireSpell = new spells.SpellBook.Fire();
    spellCast.attackSequence(warrior, orc, fireSpell);
  });

  waterSpellButton.click(function(e) {
    var waterSpell = new spells.SpellBook.Water();
    spellCast.attackSequence(warrior, orc, waterSpell);
  });

  earthSpellButton.click(function(e) {
    var earthSpell = new spells.SpellBook.Earth();
    spellCast.attackSequence(warrior, orc, earthSpell);
  });

  mysticismSpellButton.click(function(e) {
    var mysticismSpell = new spells.SpellBook.Mysticism();
    spellCast.attackSequence(warrior, orc, mysticismSpell);
  });

  loveSpellButton.click(function(e) {
    var loveSpell = new spells.SpellBook.Love();
    spellCast.attackSequence(warrior, orc, loveSpell);
  });
  //End of Magic Class Spells

  //WIN/LOSE SCREENS: Player has option to start over
  // $(".play_again").click(function(e) {
  //   location.reload();
  // });

  
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
        checkToSeeIfMagic();
        moveAlong = ($("#player-name").val() !== "" && selectedClass !== null && warrior.class.magical === false);
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

  $("#nameWasInput").click(function() {
    let name = $(".player_name");
    name.html(warrior.playerName.toUpperCase());

    let chooseClass = $(".choose_class");
    let chooseWeapon = $(".choose_weapon");
    let chooseMagic = $(".choose_magic");
    chooseClass.append('<p class="subtext">' + "Another adventurer?  Very well.  Choose your class wisely, " + warrior.playerName + ". Every class has advantages and disadvantages.  Please choose quickly, or the bard will start singing, and nobody wants that." + '</p>')
    chooseWeapon.append('<p class="subtext">' + "You will also need to select a weapon before entering the battle chamber, " + warrior.playerName + ". You may only choose one." + '</p>')
    chooseMagic.append('<p class="subtext">' + "Bitch, you are magic. You don't get to pick a weapon. You get to use magic. You are pushed through a door into a round room. A stone door slams closed behind you. A similar stone door slides open across the room. A hideous monster with " + orc.skinColor + " skin stomps in, wielding a " + orc.weapon + ". A battle cry echoes around the chamber. You suddenly realize that, much like the Thunderdome, only one of you is leaving. You advance forward to face your foe." + '</p>')

  })

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