if (Meteor.isClient) {
    Template.ranking.helpers({
        bestUsers: function () {
            var arr = Meteor.users.find({
                profile: {
                    $exists: true
                }
            }, {
                sort: {
                    profile: -1
                }
            }).fetch().reverse();
            if (arr.length >= 5)
                arr = arr.slice(Math.max(arr.length - 5, 1));
            arr = arr.reverse();
            return arr;
        }
    });

}
