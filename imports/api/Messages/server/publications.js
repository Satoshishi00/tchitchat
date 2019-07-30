import {
    Meteor
} from 'meteor/meteor';
import Messages from '..';

Meteor.publish('messages.lasts', (id) => {
    return Messages.find({
        roomId: id,
    }, {
        sort: {
            createdAt: 1
        },
        limit: 50,
        // skip: 50,
    });
});


Meteor.publish('messages_privates.lasts', (usersIds) => {
    return Messages.find({
        usersIds: usersIds,
    }, {
        sort: {
            createdAt: 1
        },
        limit: 200,
    });
});
