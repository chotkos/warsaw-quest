var StoryFactory = {
    makeAStory: function (name, description, quests, startDate, authorId) {
        return {
            name: name,
            description: description,
            quests: quests,
            startDate: startDate,
            authorId: authorId,
            winner: null,
            create: function () {
                Storys.insert(this);
            },
            update: function () {
                Storys.update(this);
            },

        };
    }

};
