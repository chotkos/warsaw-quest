if (Meteor.isClient) {

    var loggedUserId = Meteor.userId;
    if (loggedUserId) {
        Template.body.helpers.myStories = Storys.find({
            AuthorId: loggedUser.loggedUserId
        }).fetch();
    }
}
