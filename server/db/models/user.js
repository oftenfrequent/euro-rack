import crypto from 'crypto'
import * as _ from 'lodash'
import Sequelize from 'sequelize'

import db from '../_db'

export default db.define('user', {
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

}, {
    instanceMethods: {
        sanitize: function () {
            return _.omit(this.toJSON(), ['password', 'salt']);
        },
        correctPassword: function (candidatePassword) {
            return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
        },
        fullName: function () {
            return `${this.firstName} ${this.lastName}`
        }
    },
    classMethods: {
        generateSalt: function () {
            return crypto.randomBytes(16).toString('base64');
        },
        encryptPassword: function (plainText, salt) {
            var hash = crypto.createHash('sha1');
            hash.update(plainText);
            hash.update(salt);
            return hash.digest('hex');
        }
    },
    hooks: {
        beforeCreate: setSaltAndPassword,
        beforeUpdate: setSaltAndPassword
    }
});

function setSaltAndPassword(user) {
    if (user.changed('password')) {
        user.salt = user.Model.generateSalt();
        user.password = user.Model.encryptPassword(user.password, user.salt);
    }
}
