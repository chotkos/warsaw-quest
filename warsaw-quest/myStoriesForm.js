if (Meteor.isClient) {

    var loggedUser = Meteor.user();
    Template.body.helpers.myStories = Storys.find({
        AuthorId: loggedUser.id
    }).fetch();

}
