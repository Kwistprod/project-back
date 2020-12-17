const dbConfig = require("../config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize('postgres://oqwyaxatvawess:69249aee76fb63bc5d5b7631ab8d68eed8926ae09256756d2cb388d3c5ef0589@ec2-54-247-103-43.eu-west-1.compute.amazonaws.com:5432/derpf6i4qppiac', {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
      ssl: true
  }
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