import {
    Meteor
} from 'meteor/meteor';
import Users from '..';
import {
    Accounts
} from 'meteor/accounts-base';
import validEmail from '/imports/utils/validEmail'

Meteor.methods({

    "users.infos.update"({
        email,
        username,
        gender,
        city,
        birthdate,
    }) {
        if (!this.userId) {
            throw new Meteor.Error('403', 'You must be connected');
        }

        Accounts.setUsername(this.userId, username);
        
        const oldUser = Meteor.user();
        const oldEmail = oldUser.emails[0].address;
        Accounts.addEmail(this.userId, email);

        const user = Meteor.user();
        if (user.emails.lenght > 1) {
            Accounts.removeEmail(this.userId, oldEmail)
        }
        
        Meteor.users.update(this.userId, {
            $set: {
                gender,
                birthdate,
                city,
                updatedAt: new Date(),
            }
        });
    },

    //En cours de construction
    "users.verify.email"({
        token
    }) {
        if (!this.userId) {
            throw new Meteor.Error('403', 'You must be connected');
        }


        console.log(Meteor.user({services}))
      
    },

    // "users.remove"({
    //     id
    // }) {
    //     if (!this.userId) {
    //         throw new Meteor.Error('403', 'You must be connected');
    //     }
    //     Users.remove(id);
    // },
});
