if (Meteor.isClient) {
    Template.showQuestForm.helpers({
        /*counter: function () {
            return Session.get('counter');
        }*/
    });

    var getQuestsByStore = function (storeId,stepNumber) {
        return Storys.find({
            storeId: storeId,
            stepNumber: stepNumber,
        }).fetch()[0];
    };
    
    //Template.body.helpers.quests = getQuestsByStore(Template.body.helpers.currentGame,Template.body.helpers.questFormStep);

    Template.playStoryForm.events({
        'submit form': function (event) {
            //Session.set('counter', Session.get('counter') + 1);
            event.preventDefault();
            var value = event.target.password.value;
            var res = getQuestsByStore(Template.body.helpers.currentGame,Template.body.helpers.questFormStep);
            if (res.length > 0 && res[0].password == value) {
                res = res[0];
                Template.body.helpers.questFormStep++;
                Template.body.helpers.quests = getQuestsByStore(Template.body.helpers.currentGame,Template.body.helpers.questFormStep);
            }

            return false;
        }
    });
}
