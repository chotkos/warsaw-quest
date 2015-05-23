Meteor.methods({
    addStory: function (story) {
        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId() && story) {
            throw new Meteor.Error("not-authorized");
        }

        Storys.insert(story);
    },
    /*
        deleteTask: function (taskId) {
            Tasks.remove(taskId);
        },
        setChecked: function (taskId, setChecked) {
            Tasks.update(taskId, {
                $set: {
                    checked: setChecked
                }
            });
        }*/
});
