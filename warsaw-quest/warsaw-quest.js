Storys = new Mongo.Collection("story");
Quests = new Mongo.Collection("quest");
//new Mongo.Collection("users");
var isPlaying = false;

if (Meteor.isClient) {
    Meteor.subscribe("story");
    Meteor.subscribe("quest");
    //Meteor.subscribe("users");

    // counter starts at 0
    /*
    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });
    */
    Template.body.helpers({
        showPlayStoryForm: true,
        showMyStories: true,
        currentGame: null,
        showQuestForm: false,
        questFormStep: 0,
    });
    var user = Meteor.user();
    console.log(user);

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        //Meteor.call("addStory", StoryFactory.makeAStory("testStory", "opis", [], new Date(), 0));

    });
}
