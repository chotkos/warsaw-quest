if (Meteor.isClient) {
    Session.set('storyError',null); 
    Template.playStoryForm.helpers({
        storyError: function(){
            return Session.get('storyError');   
        }
    });
    
    var getQuestsByStory = function (story, stepNumber) {
        return Quests.find({
            storyId: story._id,
            stepNumber: stepNumber,
        }).fetch();
    };

    var getStoryByName = function (name) {
        return Storys.find({
            name: name,
        }).fetch();
    };

    Template.playStoryForm.events({
        'submit form': function (event) {
            //Session.set('counter', Session.get('counter') + 1);
            event.preventDefault();
            var value = event.target.gameName.value;
            var res = getStoryByName(value);
            if (res.length > 0 && res[0].completedUsersId.indexOf(Meteor.userId()) === -1) {
                res = res[0];
                Blaze._globalHelpers.globalTemplate.currentGame = res;
                Session.set('story',res);
                Session.set('showQuestFormVisible',true);
                Session.set('showPlayStoryForm',false);
                Blaze._globalHelpers.globalTemplate.showPlayStoryForm = false;
                Blaze._globalHelpers.globalTemplate.showQuestForm = true;
                //Template.body.helpers.currentGame = res;
                //Template.body.helpers.showPlayStoryForm = false;
                //Template.body.helpers.showQuestForm = true;
                Session.set('currentQuest', getQuestsByStory(Session.get('story'), Blaze._globalHelpers.globalTemplate.questFormStep)[0]);
            }
            else if(res.length === 0) Session.set('storyError','Gra o takiej nazwie nie istnieje');
            else Session.set('storyError','Już grałeś w tę grę');

            return false;
        }
    });
}
