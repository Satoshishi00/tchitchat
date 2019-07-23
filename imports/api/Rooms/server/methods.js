import {
    Meteor
} from 'meteor/meteor';
import Rooms from '..';

Meteor.methods({

    "rooms.create"({
        title
    }) {
        Rooms.insert({
            title,
            createdAt: new Date(),
            userId: this.userId,
        })
    },
    
    "rooms.update"({
        id,
        title
    }) {

        const room = Rooms.findOne(id);

        if (room.userId !== this.userId) {
            throw new Meteor.Error('403', 'Vous devez être le propriétaire de la Room');
        }

        Rooms.update(id, {
            $set: {
                title,
            }
        });
    },

    "rooms.remove"({
        id
    }) {

        const room = Rooms.findOne(id);

        if (room.userId !== this.userId) {
            throw new Meteor.Error('403', 'Vous devez être le propriétaire de la Room');
        }

        Rooms.remove(id);
    },
});
