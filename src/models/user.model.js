module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        login: {
            type: Sequelize.TEXT,
            unique: true,
            allowNull: false

        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        name:{
            type: Sequelize.TEXT,
            defaultValue: ''
        },
        surname:{
            type: Sequelize.TEXT,
            defaultValue: '',
        },
        phone:{
            type: Sequelize.TEXT,
            defaultValue: ''
        }
    }, {
        tableName: 'user'
    });
    return User;
};