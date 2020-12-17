const dbConfig = require("../config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.courses = require('./courses.model')(sequelize, Sequelize);
db.lessons = require('./lessons.model')(sequelize, Sequelize);
db.userlessons = require('./userlessons.model')(sequelize, Sequelize);


db.user.belongsToMany(db.courses, {through: 'UserCourses', as: 'Courses'});
db.courses.belongsToMany(db.user, {through: 'UserCourses', as: 'Users'});

db.user.hasMany(db.userlessons);
db.userlessons.belongsTo(db.user);

db.courses.hasMany(db.lessons);
db.lessons.belongsTo(db.courses);

module.exports = db;