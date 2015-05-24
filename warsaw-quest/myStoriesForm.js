if (Meteor.isClient) {
    Meteor.subscribe("story");

    var loggedUserId = Meteor.userId();

    var getStoriesBy = function (userId) {
        return Storys.find({
            authorId: userId,
        }).fetch();
    };


    Template.myStoriesForm.helpers({
        getMyStories: function () {
            return Storys.find({
                authorId: Meteor.userId()
            }).fetch();
        }
    });


    if (loggedUserId) {
        window.setTimeout(func, 2000);
    }

    function func() {
        Blaze._globalHelpers.globalTemplate.myStories = getStoriesBy(loggedUserId);
        //Template.body.helpers.myStories = getStoriesBy(loggedUserId);
        console.log('getstories done');
    }

}
