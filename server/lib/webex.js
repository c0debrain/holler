//*---A Spark integration Framework using Meteor.JS
//*---Created by Jeff Levensailor jeff@levensailor.com

Meteor.methods({
  //Each Board is a Spark Room - this initializes the room
  'webex.meet'(cardId) {
    check(cardId, String);
  var members = Cards.findOne({_id: cardId}).members;
  var title = Cards.findOne({_id: cardId}).title;
  var boardId = Cards.findOne({_id: cardId}).boardId;
  var sparkId = Boards.findOne({_id: boardId}).sparkId;
  console.log(sparkId);
  var initiator = Users.findOne({_id: members[0]}).username;
  var participants="";
  for (i=0; i<members.length; i++){
        if(typeof members[i] !== "undefined" && participants !== ""){
        participants = participants + ", " +Users.findOne({_id: members[i]}).username;
        }//if
        else{
          participants = Users.findOne({_id: members[i]}).username;
        }
  }//for

  var messageText = "Hey **"+participants+"** a meeting has been requested to discuss **"+title+"**, please join @ https://presidio.webex.com/meet/"+initiator+"presidio.com";
  Meteor.call(
     'spark.msgRoom',
      sparkId,
      messageText,
       function(err, res) {
         if(err) {
           console.log(err);
         } else {
              }
            }
          );//call to msgRoom
}//webex.meet
})//methods
