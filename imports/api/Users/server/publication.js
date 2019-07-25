import {
    Meteor
} from 'meteor/meteor';

Meteor.publish('userStatus', function () {
    return Meteor.users.find({
        "status.online": true
    })
});