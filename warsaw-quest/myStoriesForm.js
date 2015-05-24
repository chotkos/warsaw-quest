if (Meteor.isClient) {
    Meteor.subscribe("story");

    var loggedUserId = Meteor.userId();

    Template.myStoriesForm.helpers({
        getMyStories: function () {
            var arr = Storys.find({
                authorId: Meteor.userId()
            }).fetch();
            return arr.slice(Math.max(arr.length - 5, 1)).reverse();
        }
    });

    /*
        if (loggedUserId) {
            window.setTimeout(func, 2000);
        }

        function func() {
            Blaze._globalHelpers.globalTemplate.myStories = getStoriesBy(loggedUserId);
            //Template.body.helpers.myStories = getStoriesBy(loggedUserId);
            console.log('getstories done');
        }
    */
}
