var questFactory = {
    makeAQuest: function (stepNumber, description, password, storyId) {
        return {
            stepNumber: stepNumber,
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
