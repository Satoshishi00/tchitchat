import {
    Meteor
} from 'meteor/meteor';
import Messages from '..';

Meteor.publish('messages.lasts', () => {
    return Messages.find({}, {
        sort: {
            createdAt: -1
        },
        limit: 50,
        // skip: 50,
    });
});
