"use strict";

let selectNamePage = $("#player-setup");
let selectClassPage = $("#class-select");
let selectWeaponPage = $("#weapon-select");
let battlegroundPage = $("#battleground");
let winPage = $("#win-page");
let losePage = $("#losePage");


selectNamePage.click((event) => {
    console.log("event", event);
    if (event.target.id === "clear-board") {
    let boardLeftovers = Chatty.getMessages().length - 21;  //sets up a variable that will access all but the last 20 messages
    for (let i = Chatty.getMessages().length - 1; i > boardLeftovers && i > -1; i--) {  //cycles (backward) through the array and selects the 20 most recent items
      Chatty.deleteMessage(i);  //deletes each of the 20 last messages on the board from the private messages array (see chatty.js for further info)
      Chatty.onToDom();  //cycles through current array (any remaining messages beyond 20) and the next >= 20 messages and outputs them to DOM (see chatty.js for further info)
    }
  }
}
