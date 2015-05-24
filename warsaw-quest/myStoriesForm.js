if (Meteor.isClient) {

    var loggedUserId = Meteor.userId();
    Meteor.subscribe("directory");
    Template.myStoriesForm.helpers({
        getMyStories: function () {
            var arr = Storys.find({
                authorId: Meteor.userId()
            }).fetch();
            arr = arr.slice(Math.max(arr.length - 5, 1)).reverse();

            for (var i = 0; i < arr.length; i++) {
                if (arr[i].winner) {
                    arr[i].winnerName = Meteor.users.find({
                        _id: arr[i].winner
                    }).fetch()[0].username;
                }
            }
            arr = Storys.find({
                authorId: Meteor.userId()
            }).fetch();
            if (arr.length > 0) {
                if (arr.length > 5) {
                    arr = arr.slice(Math.max(arr.length - 5, 1));
                }
                arr = arr.reverse();
                Session.set('getMyStories', arr);
                Session.set('showMyGames', true);
            }
            return arr;
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
