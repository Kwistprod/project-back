const db = require("../models");
const Lessons = db.lessons;
const Op = db.Sequelize.Op;

exports.findAll = async(req, res) => {
    await Lessons.findAll({
      order: db.sequelize.col('id'),
      include:[{
        
      }],
      where:{
          course_id: req.body.courseId
      }
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      });
};