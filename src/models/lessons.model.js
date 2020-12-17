module.exports = (sequelize, Sequelize) => {
    const Lessons = sequelize.define('lessons', {
        course_id:{
            type: Sequelize.INTEGER
        },
        url: {
            type: Sequelize.TEXT
        },
        lesson_id:{
            type: Sequelize.INTEGER,
        },
        total:{
            type: Sequelize.INTEGER
        }

    }, {
        tableName: 'lessons'
    });
    return Lessons;
};