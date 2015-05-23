if (Meteor.isClient) {
    Template.questCreateForm.events({
        'submit form': function (event) {
            //Session.set('counter', Session.get('counter') + 1);
            event.preventDefault();
            var desc = event.target.description.value;
            var pass = event.target.password.value;
            var newOne = questFactory.makeAQuest(Template.body.helpers.newStoryQuests.length, desc, pass, null);
            Template.body.helpers.newStoryQuests.push(newOne);
            return false;
        }
    });
}
