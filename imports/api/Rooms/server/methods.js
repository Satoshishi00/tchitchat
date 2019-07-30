import {
    Meteor
} from 'meteor/meteor';
import Rooms from '..';

Meteor.methods({

    "rooms.create"({
        title
    }) {
        // const room = Rooms.findOne(title);
        const roomExist = Rooms.findOne({
            title: title
        });

        
        if ((typeof roomExist != "undefined") && title == roomExist.title) {
            throw new Meteor.Error('403', "Le nom de Room \"" + roomExist.title + "\" existe déjà. Veuillez en choisir un autre : ");
        }   

        Rooms.insert({
            userId: this.userId,
            title,
            createdAt: new Date(),
        })
    },
    
    "rooms.update"({
        id,
        title
    }) {

        const room = Rooms.findOne(id);
        const roomExist = Rooms.findOne({title:title});

        if ((typeof room != "undefined") && room.userId !== this.userId) {
            throw new Meteor.Error('403', 'Vous devez être le propriétaire de la Room');
        }
        if ((typeof roomExist != "undefined") && title == roomExist.title) {
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

        if ((typeof room != "undefined") && room.userId !== this.userId) {
            throw new Meteor.Error('403', 'Vous devez être le propriétaire de la Room');
        }
        Rooms.remove(id);
    },

    "rooms.name.by.id"({
        id
    }){
        if (!this.userId) {
            throw new Meteor.Error('403', 'Vous devez être connecté');
        }
        console.log(id);
        const room = Rooms.findOne(id);
        console.log("room name : " + room.title);

        if (!room) {
            throw new Meteor.Error('403', 'Cette room n\'existe pas');
        }
        return room.title;
    }
});
