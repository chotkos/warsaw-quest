if (Meteor.isClient) {
    Meteor.subscribe('quests');

    var getQuestsByStory = function (story, stepNumber) {
        return Quests.find({
            storyId: story._id,
            stepNumber: stepNumber,
        }).fetch();
    };

    Template.showQuestForm.helpers({
        story: function () {
            return Session.get('story');
        },
        quests: function () {
            return Quests.find({
                storyId: Session.get('story')._id
            }).fetch();
        },
        currentQuest: function () {
            return Session.get('currentQuest');
        }
    });

    Template.showQuestForm.events({
        'submit form': function (event) {
            //Session.set('counter', Session.get('counter') + 1);
            event.preventDefault();
            console.log('adsadsad');
            var value = event.target.password.value;
            //var res = getQuestsByStore(Template.body.helpers.currentGame, Template.body.helpers.questFormStep);
            var res = getQuestsByStory(Session.get('story'), Blaze._globalHelpers.globalTemplate.questFormStep);
            if (res.length > 0 && res[0].password == value) {
                console.log('dupa');
                res = res[0];
                Blaze._globalHelpers.globalTemplate.questFormStep++;
                Session.set('currentQuest', getQuestsByStory(Session.get('story'), Blaze._globalHelpers.globalTemplate.questFormStep)[0]);
            }
            return false;
        }
    });
}