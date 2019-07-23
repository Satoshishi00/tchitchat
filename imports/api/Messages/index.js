import { Mongo } from 'meteor/mongo';
import {
    SimpleSchema
} from 'meteor/aldeed:simple-schema';

const Messages = new Mongo.Collection('messages');

const MessageSchema = new SimpleSchema({
    roomId: {
        type: String,
    },
    content: {
        type: String,
        max: 255,
    },
    createdAt: {
        type: Date,
    },
    userId: {
        type: String
    }
});

Messages.attachSchema(MessageSchema);

export default Messages;
