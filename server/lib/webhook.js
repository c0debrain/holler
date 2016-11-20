//*---webhook.js is the listener for the holler bot
//*---A Spark integration Framework using Meteor.JS
//*---Created by Jeff Levensailor jeff@levensailor.com
//Listen for POST and send raw data to spark.js


//*---change botName to your unique bot instance
const botName = "kanban@sparkbot.io"
var bodyParser = require('body-parser');
var msgid;
var personEmail;

Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({extended: false}));

Picker.route('/holler', function(params, request, response) {
//  console.log(request.body);
  personEmail = (request.body.data.personEmail);
  msgid = (request.body.data.id);
//  console.log(personEmail);
//  console.log(msgid);
  if (personEmail !== botName){
  Meteor.call(
     'spark.getMsg',
      msgid,
      personEmail,
       function(err, res) {
         if(err) {
           console.log(err);
         } else {
          }
        }
      );//spark.getmsg
    }//if
    else{
    }
});//picker
Picker.route('/oath', function(params, request, response) {
  console.log(request.body);
//  personEmail = (request.body.data.personEmail);
//  msgid = (request.body.data.id);
//  console.log(personEmail);
//  console.log(msgid);
//  if (personEmail !== botName){
//  Meteor.call(
//     'spark.getMsg',
//      msgid,
//      personEmail,
//       function(err, res) {
//         if(err) {
//           console.log(err);
//         } else {
//          }
//        }
//      );//spark.getmsg
//    }//if
//    else{
//    }
});//picker
