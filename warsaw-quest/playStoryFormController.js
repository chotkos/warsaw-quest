if (Meteor.isClient) {
    Template.playStoryForm.helpers({
        /*counter: function () {
            return Session.get('counter');
        }*/
    });

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
            if (res.length > 0) {
                res = res[0];
                Blaze._globalHelpers.globalTemplate.currentGame = res;
                Blaze._globalHelpers.globalTemplate.showPlayStoryForm = false;
                Blaze._globalHelpers.globalTemplate.showQuestForm = true;
                //Template.body.helpers.currentGame = res;
                //Template.body.helpers.showPlayStoryForm = false;
                //Template.body.helpers.showQuestForm = true;
            }

            return false;
        }
    });
}
