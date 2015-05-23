if (Meteor.isClient) {

    Session.set('newStoryQuests', []);

    Template.questCreateForm.helpers({
        newStoryQuests: function () {
            return Session.get('newStoryQuests');
        }
    });
    var questFactory = {
        makeAQuest: function (stepNumber, description, password, storyId) {
            return {
                stepNumber: stepNumber,
                description: description,
                password: password,
                storyId: storyId,
                create: function () {
                    Quests.insert(this);
                },
                update: function () {
                    Quests.update(this);
                },
            };
        }
    };



    Template.questCreateForm.events({
        'submit form': function (event) {
            //Session.set('counter', Session.get('counter') + 1);
            event.preventDefault();
            var desc = event.target.description.value;
            var pass = event.target.password.value;
            var newOne = questFactory.makeAQuest(Blaze._globalHelpers.globalTemplate.newStoryQuests.length, desc, pass, null);
            Blaze._globalHelpers.globalTemplate.newStoryQuests.push(newOne);
            var x = Blaze._globalHelpers.globalTemplate.newStoryQuests;
            Session.set('newStoryQuests', x);
            $('.rerender').trigger("create");
            return false;
        }
    });
}
