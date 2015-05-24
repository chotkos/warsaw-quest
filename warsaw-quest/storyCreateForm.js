if (Meteor.isClient) {
    Session.set('creationResult', '');

    var StoryFactory = {
        makeAStory: function (name, description, quests, startDate, authorId) {
            return {
                name: name,
                description: description,
                startDate: startDate,
                authorId: authorId,
                winner: null,
                update: function () {
                    Storys.update(this);
                },

            };
        }

    };

    Template.storyCreateForm.helpers({
        creationResult: function () {
            return Session.get('creationResult');
        }
    });

    Template.storyCreateForm.events({
        'submit form': function (event) {
            //Session.set('counter', Session.get('counter') + 1);
            event.preventDefault();

            var desc = event.target.newGameName.value;
            var quests = Blaze._globalHelpers.globalTemplate.newStoryQuests;


            var newOne = StoryFactory.makeAStory(desc, "", null, null, Blaze._globalHelpers.currentUser()._id)


            var canSave = Storys.find({
                name: desc
            }).fetch().length > 0 ? false : true;
            if (canSave) {
                Session.set('creationResult', 'Operacja powiodła się!');
                Storys.insert(newOne, function (error, _id) {
                    for (var i = 0; i < quests.length; i++) {
                        quests[i].storyId = _id;
                        Quests.insert(quests[i]);
                    }
                });
            } else {
                Session.set('creationResult', 'Operacja nie powiodła się!');

            }


            return false;
        }
    });
}
