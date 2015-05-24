Storys = new Mongo.Collection("story");
Quests = new Mongo.Collection("quest");
var kutas = "kutas";
//new Mongo.Collection("users");
var isPlaying = false;

if (Meteor.isClient) {
    Meteor.subscribe("story");
    Meteor.subscribe("quest");
    //Meteor.subscribe("users");

    Session.set('showPlayStoryForm',true);
    Session.set('showQuestFormVisible',false);
    
    // counter starts at 0
    
    Template.body.helpers({
        showQuestFormVisible: function () {
            return Session.get('showQuestFormVisible');
        }
    });
    
    Template.body.helpers({
        showPlayStoryForm: function () {
            return Session.get('showPlayStoryForm');
        }
    });
    
    var globalTemplate = {
        showPlayStoryForm: true,
        showMyStories: true,
        currentGame: null,
        showQuestForm: false,
        questFormStep: 0,
        newStoryQuests: [],
    };
    
    Template.registerHelper('globalTemplate',globalTemplate);
    
    

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
