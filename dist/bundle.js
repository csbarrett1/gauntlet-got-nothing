(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
  Test code to generate a human player and an orc player
 */
var warrior = new Gauntlet.Combatants.Human();
warrior.setWeapon(new WarAxe());
warrior.generateClass();  // This will be used for "Surprise me" option
console.log(warrior.toString());

var orc = new Gauntlet.Combatants.Orc();
orc.generateClass();
orc.setWeapon(new BroadSword());
console.log(orc.toString());

/*
  Test code to generate a spell
 */
var spell = new Gauntlet.SpellBook.Sphere();
console.log("spell: ", spell.toString());


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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gIFRlc3QgY29kZSB0byBnZW5lcmF0ZSBhIGh1bWFuIHBsYXllciBhbmQgYW4gb3JjIHBsYXllclxuICovXG52YXIgd2FycmlvciA9IG5ldyBHYXVudGxldC5Db21iYXRhbnRzLkh1bWFuKCk7XG53YXJyaW9yLnNldFdlYXBvbihuZXcgV2FyQXhlKCkpO1xud2Fycmlvci5nZW5lcmF0ZUNsYXNzKCk7ICAvLyBUaGlzIHdpbGwgYmUgdXNlZCBmb3IgXCJTdXJwcmlzZSBtZVwiIG9wdGlvblxuY29uc29sZS5sb2cod2Fycmlvci50b1N0cmluZygpKTtcblxudmFyIG9yYyA9IG5ldyBHYXVudGxldC5Db21iYXRhbnRzLk9yYygpO1xub3JjLmdlbmVyYXRlQ2xhc3MoKTtcbm9yYy5zZXRXZWFwb24obmV3IEJyb2FkU3dvcmQoKSk7XG5jb25zb2xlLmxvZyhvcmMudG9TdHJpbmcoKSk7XG5cbi8qXG4gIFRlc3QgY29kZSB0byBnZW5lcmF0ZSBhIHNwZWxsXG4gKi9cbnZhciBzcGVsbCA9IG5ldyBHYXVudGxldC5TcGVsbEJvb2suU3BoZXJlKCk7XG5jb25zb2xlLmxvZyhcInNwZWxsOiBcIiwgc3BlbGwudG9TdHJpbmcoKSk7XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gIC8qXG4gICAgU2hvdyB0aGUgaW5pdGlhbCB2aWV3IHRoYXQgYWNjZXB0cyBwbGF5ZXIgbmFtZVxuICAgKi9cbiAgJChcIiNwbGF5ZXItc2V0dXBcIikuc2hvdygpO1xuXG4gIC8qXG4gICAgV2hlbiBhbnkgYnV0dG9uIHdpdGggY2FyZF9fbGluayBjbGFzcyBpcyBjbGlja2VkLFxuICAgIG1vdmUgb24gdG8gdGhlIG5leHQgdmlldy5cbiAgICovXG4gICQoXCIuY2FyZF9fbGlua1wiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgdmFyIG5leHRDYXJkID0gJCh0aGlzKS5hdHRyKFwibmV4dFwiKTtcbiAgICB2YXIgbW92ZUFsb25nID0gZmFsc2U7XG5cbiAgICBzd2l0Y2ggKG5leHRDYXJkKSB7XG4gICAgICBjYXNlIFwiY2FyZC0tY2xhc3NcIjpcbiAgICAgICAgbW92ZUFsb25nID0gKCQoXCIjcGxheWVyLW5hbWVcIikudmFsKCkgIT09IFwiXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJjYXJkLS13ZWFwb25cIjpcbiAgICAgICAgbW92ZUFsb25nID0gKCQoXCIjcGxheWVyLW5hbWVcIikudmFsKCkgIT09IFwiXCIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAobW92ZUFsb25nKSB7XG4gICAgICAkKFwiLmNhcmRcIikuaGlkZSgpO1xuICAgICAgJChcIi5cIiArIG5leHRDYXJkKS5zaG93KCk7XG4gICAgfVxuICB9KTtcblxuICAvKlxuICAgIFdoZW4gdGhlIGJhY2sgYnV0dG9uIGNsaWNrZWQsIG1vdmUgYmFjayBhIHZpZXdcbiAgICovXG4gICQoXCIuY2FyZF9fYmFja1wiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgdmFyIHByZXZpb3VzQ2FyZCA9ICQodGhpcykuYXR0cihcInByZXZpb3VzXCIpO1xuICAgICQoXCIuY2FyZFwiKS5oaWRlKCk7XG4gICAgJChcIi5cIiArIHByZXZpb3VzQ2FyZCkuc2hvdygpO1xuICB9KTtcblxufSk7Il19
