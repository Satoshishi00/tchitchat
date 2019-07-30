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


    "users.verify.email"({
        token
    }) {
        if (!this.userId) {
            throw new Meteor.Error('403', 'You must be connected');
        }


        console.log(Meteor.user({services}))
        // Accounts.setUsername(this.userId, username);

        // const oldUser = Meteor.user();
        // const oldEmail = oldUser.emails[0].address;
        // Accounts.addEmail(this.userId, email);

        // const user = Meteor.user();
        // if (user.emails.lenght > 1) {
        //     Accounts.removeEmail(this.userId, oldEmail)
        // }

        // Meteor.users.update(this.userId, {
        //     $set: {
        //         gender,
        //         birthdate,
        //         city,
        //         updatedAt: new Date(),
        //     }
        // });
    },

    // "users.remove"({
    //     id
    // }) {
    //     if (!this.userId) {
    //         throw new Meteor.Error('403', 'You must be connected');
    //     }

    //     const article = Users.findOne(id);

    //     if (article.userId !== this.userId) {
    //         throw new Meteor.Error('403', 'You must be the owner of article');
    //     }

    //     Users.remove(id);
    // },
});
