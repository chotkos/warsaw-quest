if (Meteor.isClient) {

    Session.set('newStoryQuests', []);
    Session.set('descError', null);
    Session.set('passError', null);

    Template.questCreateForm.helpers({
        newStoryQuests: function () {
            return Session.get('newStoryQuests');
        },
        descError: function () {
            return Session.get('descError');
        },
        passError: function () {
            return Session.get('passError');
        }
    });
    var questFactory = {
        makeAQuest: function (stepNumber, description, password, storyId) {
            return {
                stepNumber: stepNumber,
                viewStepNumber: stepNumber + 1,
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
            if (desc && pass) {
                var newOne = questFactory.makeAQuest(Blaze._globalHelpers.globalTemplate.newStoryQuests.length, desc, pass, null);
                Blaze._globalHelpers.globalTemplate.newStoryQuests.push(newOne);
                var x = Blaze._globalHelpers.globalTemplate.newStoryQuests;
                Session.set('newStoryQuests', x);
                event.target.description.value=null;
                event.target.password.value=null;
                //$('.rerender').trigger("create");
            } else {
                if (pass == "") Session.set('passError', 'Należy uzupełnić rozwiązanie');
                if (desc == "") Session.set('descError', 'Należy uzupełnić opis zadania');
            }
            return false;
        },
        'keypress #password': function (event) {
            if (Session.get('passError') != null) {
                Session.set('passError', null);
            }
        },
        'keypress #description': function (event) {
            console.log('keypress');
            if (Session.get('descError') != null) {
                Session.set('descError', null);
            }
        }
    });
}