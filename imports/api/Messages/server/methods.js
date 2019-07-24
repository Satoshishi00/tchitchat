import {
    Meteor
} from 'meteor/meteor';
import Messages from '..';
import Rooms from "/imports/api/Rooms";

Meteor.methods({
    
    "messages.create"({
        roomId,
        content
    }) {
        const room = Rooms.findOne(roomId);
        console.log(room);

        Messages.insert({
            roomId,
            content,
            createdAt: new Date(),
            userId: this.userId,
            userName: Meteor.users.findOne(this.userId).username,
        });
    }

    
});
