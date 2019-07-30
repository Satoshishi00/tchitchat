import { Meteor } from 'meteor/meteor';

Meteor.publish(null, function () {
    console.log(this.userId);
    return Meteor.users.find(this.userId, {
        fields: {
            gender: 1,
            city: 1,
            birthdate: 1,
        },
        limit: 1,
    });
})

Meteor.publish('userStatus', function () {
    return Meteor.users.find({
        "status.online": true
    }, {
        fields: {
            username: 1,
            status: 1,
        }
    })
});