//*---A Spark integration Framework using Meteor.JS
//*---Created by Jeff Levensailor jeff@levensailor.com

//*---Change sparkToken to your unique API key
const token = '54676865576c70636d595068775858434464736567724c525848616c44444b6a69716c4f497774546c674c61';
const url = 'https://api.tropo.com/1.0/sessions';
var sipuri;
var PM;
var pmUri;
var pmName;
var boardName;
var addGreet;
var pmGreet = "The conference is starting";
Meteor.methods({
  //Each Board is a Spark Room - this initializes the room
  'tropo.conference'(cardId) {
    check(cardId, String);
//    check(members, Array);
  var members = Cards.findOne({_id: cardId}).members;
  var title = Cards.findOne({_id: cardId}).title;
  var boardId = Cards.findOne({_id: cardId}).boardId;
  var sparkId = Boards.findOne({_id: boardId}).sparkId;
//    check(title, String);
//    check(sparkId, String);
    //make rest call for each member
    //first start the conference with the PM
    PM = Boards.findOne({sparkId: sparkId}).members[0].userId;
    console.log(PM);
//    PM = members[0].userId;
    pmName = Users.findOne({_id: PM}).username;
    console.log(pmName);
    pmUri = Users.findOne({_id: PM}).emails[0].address;
    console.log(pmUri);
//    pmUri = pmUri[0].address;
    var request = require('request');
    var options = { method: 'POST',
      url: url,
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'application/json' },
      body:
       { token: token,
         number: pmUri,
         project: pmGreet },
      json: true };//options

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    });//request

    boardName = Boards.findOne({sparkId: sparkId}).title;
    addGreet = "Conference call started by " +pmName+" for project " +boardName;

    for (i=0; i<=members.length-1; i++){
    sipuri = Users.findOne({_id: members[i]}).emails;
    sipuri = sipuri[0].address;
    if (sipuri !== pmUri){
    console.log(sipuri);
    var request = require('request');
    var options = { method: 'POST',
      url: url,
      headers:
       { 'cache-control': 'no-cache',
         'content-type': 'application/json' },
      body:
       { token: token,
         number: sipuri,
         project: addGreet },
      json: true };//options

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      });//request
    }
    else{
      console.log("duplicate URI");
    }

  }//for
  }//tropo.conference
})//methods
