import {
    Meteor
} from 'meteor/meteor';
import Users from '..';

Meteor.methods({

    "users.update"({
        id,
        name
    }) {
        if (!this.userId) {
            throw new Meteor.Error('403', 'You must be connected');
        }

        const user = Users.findOne(id);

        if (user.userId !== this.userId) {
            throw new Meteor.Error('403', 'You must be the owner of article');
        }

        Users.update(id, {
            $set: {
                name,
            }
        });
    },

    "users.remove"({
        id
    }) {
        if (!this.userId) {
            throw new Meteor.Error('403', 'You must be connected');
        }

        const article = Users.findOne(id);

        if (article.userId !== this.userId) {
            throw new Meteor.Error('403', 'You must be the owner of article');
        }

        Users.remove(id);
    },
});
