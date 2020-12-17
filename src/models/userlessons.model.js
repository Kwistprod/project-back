module.exports = (sequelize, Sequelize) => {
    const UserLessons = sequelize.define('userlessons', {
        course_id:{
            type: Sequelize.INTEGER
        },
        current_lesson:{
            type: Sequelize.INTEGER,
        },
        current_dz:{
            type: Sequelize.INTEGER
        },
        isDone:{
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        tableName: 'userlessons'
    });
    return UserLessons;
};