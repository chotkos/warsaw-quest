if (Meteor.isClient) {
    Meteor.subscribe('quests');
    Session.set('gameWon', null);

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
        },
        gameWon: function () {
            return Session.get('gameWon');
        }
    });

    Template.showQuestForm.events({
        'submit form': function (event) {
            //Session.set('counter', Session.get('counter') + 1);
            event.preventDefault();
            var value = event.target.password.value;
            //var res = getQuestsByStore(Template.body.helpers.currentGame, Template.body.helpers.questFormStep);
            var res = getQuestsByStory(Session.get('story'), Blaze._globalHelpers.globalTemplate.questFormStep);
            if (res.length > 0 && res[0].password == value) {
                res = res[0];
                Blaze._globalHelpers.globalTemplate.questFormStep++;
                Session.set('currentQuest', getQuestsByStory(Session.get('story'), Blaze._globalHelpers.globalTemplate.questFormStep)[0]);
                if (Session.get('currentQuest') === undefined) {
                    Session.set('gameWon', "Brawo wykonałeś wszystkie zadania!");
                    var story = Storys.find({
                        _id: Session.get('story')._id
                    }).fetch()[0];
                    if (story.winner === null) {
                        story.winner = Meteor.userId();
                        Storys.update({
                            _id: story._id,
                        }, {
                            $set: {
                                winner: story.winner
                            }
                        });
                    }
                } else {
                    Session.set('gameWon', null);
                }
            }
            return false;
        }
    });
}
