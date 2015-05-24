if (Meteor.isClient) {

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

    Template.storyCreateForm.events({
        'submit form': function (event) {
            //Session.set('counter', Session.get('counter') + 1);
            event.preventDefault();

            var desc = event.target.newGameName.value;
            var quests = Blaze._globalHelpers.globalTemplate.newStoryQuests;


            var newOne = StoryFactory.makeAStory(desc, "", null, null, Blaze._globalHelpers.currentUser()._id)
            Storys.insert(newOne, function (error, _id) {
                for (var i = 0; i < quests.length; i++) {
                    quests[i].storyId = _id;
                    Quests.insert(quests[i]);
                }
            });


            return false;
        }
    });
}
