import {
    Mongo
} from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import {
    SimpleSchema
}
from 'meteor/aldeed:simple-schema';
import { regex_email } from '/imports/utils/regex';
import Genders from '/imports/utils/genders';

Accounts.config({
    sendVerificationEmail: true
});

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "Tchitchat - Activez votre email";
    },
    text(user, url) {
        url = url.replace('/#/verify-email', '/verify');
        console.log(url);
        return `Salut ${user.username}! \nConfime ton addresse mail en cliquant sur ce lien : ${url}`;
    }
};

const UserSchema = new SimpleSchema({
    username: {
        type: String,
        max: 255,
    },
    'emails.$': {
        type: Object,
    },
    'emails.$.address': {
        type: String,
        regEx: regex_email,
    },
    'emails.$.verified': {
        type: Boolean,
    },
    status: {
        type: Object,
        blackbox: true,
        optional: true
    },
   services: {
        type: Object,
        blackbox: true,
        optional: true
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        optional: true
    },
    city: {
        type: String,
        max: 255,
        optional: true
    },
    birthdate: {
        type: Date,
        optional: true,
    }
});

Meteor.users.attachSchema(UserSchema);
