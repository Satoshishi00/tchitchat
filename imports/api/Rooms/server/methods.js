import {
    Meteor
} from 'meteor/meteor';
import Rooms from '..';

Meteor.methods({

    "rooms.create"({
        title
    }) {
        const room = Rooms.findOne(title);
        
        if (typeof room != 'undefined') {
            throw new Meteor.Error('403', 'Une room avec ce nom existe déjà : ' + room);
        }

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
        const roomExist = Rooms.findOne({title:title});

        if (room.userId !== this.userId) {
            throw new Meteor.Error('403', 'Vous devez être le propriétaire de la Room');
        } else if (title == roomExist.title) {
            throw new Meteor.Error('403', "Le nom de Room \"" + roomExist.title + "\" existe déjà. Veuillez en choisir un autre");
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
