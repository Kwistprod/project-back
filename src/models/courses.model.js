module.exports = (sequelize, Sequelize) => {
    const Courses = sequelize.define('courses', {
        title:{
            type: Sequelize.TEXT
        },
        description: {
            type: Sequelize.TEXT
        },
        classes:{
            type: Sequelize.INTEGER,
        },
        scope:{
            type:Sequelize.TEXT
        }
    }, {
        tableName: 'courses'
    });
    return Courses;
};