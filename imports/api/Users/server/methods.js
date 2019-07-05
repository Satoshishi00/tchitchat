import {
    Meteor
} from 'meteor/meteor';
import Users from '..';

Meteor.methods({

    "users.update"({
        id,
        email,
        username,
        password,
        genre,
        birthday,
        city,
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
                email,
                username,
                password,
                genre,
                birthday,
                city,
                createdAt: new Date(),
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
