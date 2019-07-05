import {
    Meteor
} from 'meteor/meteor';
import Messages from '..';

Meteor.methods({
    "messages.create"({
        title,
        content
    }) {
        if (!this.userId) {
            throw new Meteor.Error('403', 'You must be connected');
        }

        Messages.insert({
            title,
            content,
            createdAt: new Date(),
            userId: this.userId,
        });
    },

    "messages.update"({
        id,
        title,
        content
    }) {
        if (!this.userId) {
            throw new Meteor.Error('403', 'You must be connected');
        }

        const article = Messages.findOne(id);

        if (article.userId !== this.userId) {
            throw new Meteor.Error('403', 'You must be the owner of article');
        }

        Messages.update(id, {
            $set: {
                title,
                content
            }
        });
    },

    "messages.remove"({
        id
    }) {
        if (!this.userId) {
            throw new Meteor.Error('403', 'You must be connected');
        }

        const article = Messages.findOne(id);

        if (article.userId !== this.userId) {
            throw new Meteor.Error('403', 'You must be the owner of article');
        }

        Messages.remove(id);
    },
});
